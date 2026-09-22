# Delegated Context Editing (Anthropic) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

A **Edição de Contexto** delegada é uma funcionalidade de gestão de contexto exclusiva do Claude. Ao contrário dos motores de
compressão locais do OmniRoute (Caveman, RTK, LLMLingua, pipelines encadeados) — que reescrevem o corpo do pedido
_antes_ de este sair do proxy —, a Edição de Contexto pede ao **fornecedor** que remova blocos obsoletos
de utilização/resultado de ferramentas da sua própria janela de contexto em execução. O OmniRoute apenas adiciona um
parâmetro ao corpo (`context_management.edits[]`); o Claude efetua a remoção propriamente dita com base no seu próprio tokenizador.

Fonte canónica: `open-sse/config/contextEditing.ts` (IDs das estratégias, injeção no corpo, extração
de telemetria), `open-sse/executors/base.ts` (condição de injeção + recurso em caso de erro 400) e
`open-sse/services/compression/types.ts` (estrutura da configuração + predefinição).

## O que `clear_tool_uses` faz

O OmniRoute injeta uma única edição no corpo de saída das Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — o ID datado da estratégia da Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — assim que os tokens de entrada do pedido excedem este limiar, o Claude começa
  a remover pares antigos de utilização/resultado de ferramentas (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, a predefinição da Anthropic).
- `keep.value: 3` — os N pares mais recentes de utilização/resultado de ferramentas permanecem intactos
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

A versão beta é anunciada através do cabeçalho `anthropic-beta: context-management-2025-06-27`, que
o OmniRoute já emite nos pedidos ao Claude.

A injeção é efetuada por `applyContextEditingToBody()` e é **idempotente**: se já existir no corpo uma edição
`clear_tool_uses` (adicionada por uma chamada anterior ou fornecida pelo cliente), o corpo permanece
inalterado. Se também estiver presente uma edição `clear_thinking_20251015`, o OmniRoute aplica uma ordenação estável para colocar a
edição `clear_thinking` no início, porque a Anthropic exige que `clear_thinking` anteceda
`clear_tool_uses` no array `edits[]`.

## O seletor de ativação por combinação

A Edição de Contexto está **desativada por predefinição** e requer ativação explícita. O seletor é um único booleano incluído na
configuração de compressão:

- Chave da definição: `contextEditing.enabled` (camelCase — **não** `context_editing` / `context-editing`).
- Tipo: `ContextEditingConfig { enabled: boolean }` em
  `open-sse/services/compression/types.ts`.
- Predefinição: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Esquema Zod: `contextEditingConfigSchema` em `src/shared/validation/compressionConfigSchemas.ts`.
- Armazenamento: persistido com as restantes definições de compressão (normalizadas em
  `src/lib/db/compression.ts`).

No painel, o seletor encontra-se no centro de compressão
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) e escreve
`{ contextEditing: { enabled: … } }` através de `saveSettings()`. Uma vez que faz parte do
objeto de definições de compressão, combina-se com o perfil de compressão por combinação, em vez de constituir uma
área totalmente independente — a configuração contém apenas o sinalizador de ativação/desativação; todos os limiares (`trigger`,
`keep`) correspondem às constantes documentadas acima.

## Controlo exclusivo para Claude

A injeção só ocorre para relays genuínos do Claude ou compatíveis com o Claude Code. A condição em
`open-sse/executors/base.ts` é:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — chave/OAuth real da Anthropic.
- `isClaudeCodeCompatible(this.provider)` — relays cujo ID de fornecedor começa pelo prefixo
  `anthropic-compatible-cc-` (anunciam compatibilidade com o Claude Code, pelo que são os relays com
  maior probabilidade de aceitar a funcionalidade beta). Consulte `open-sse/services/provider.ts`.

Deliberadamente **excluídos**:

- `claude-web` — um relay de browser com um formato de pedido `create_conversation_params` que nunca
  recebe `context_management`.
- Relays `anthropic-compatible-*` genéricos (sem o prefixo `-cc-`) — endpoints de terceiros com
  suporte incerto para a funcionalidade beta.

Os fornecedores que não sejam Claude nunca recebem o parâmetro `context_management`, mesmo quando a
opção está ativada.

## Fallback em caso de 400 / cobertura de relays

Um relay compatível com Claude pode anunciar a funcionalidade beta, mas ainda assim rejeitar o
parâmetro `context_management` com um HTTP 400. Para degradar de forma controlada em vez de fazer o
pedido falhar, o executor remove o parâmetro e repete o pedido para o mesmo URL **uma vez**:

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

1. É acionado apenas perante um `400`, enquanto a edição de contexto está ativada e o corpo contém
   efetivamente `context_management`.
2. O corpo da resposta 400 é lido através de um `clone()`, para que a resposta original permaneça
   intacta caso não haja correspondência.
3. O texto do erro tem de corresponder a `/context[_-]management|context editing/i` — um erro 400 não
   relacionado (por exemplo, `max_tokens must be >= 1`) **não** aciona o fallback; o erro original é
   propagado.
4. Perante uma correspondência, define `contextEditingDisabled = true` (o que impede uma nova injeção
   caso seja criado posteriormente um `transformedBody` novo para uma nova tentativa/URL de
   fallback), elimina `context_management`, volta a assinar o corpo para Claude/relays compatíveis
   com o Claude Code (`signRequestBody`) e repete o pedido para o mesmo URL uma vez.

O Claude genuíno inclui a funcionalidade beta em `ANTHROPIC_BETA_BASE` e não entra neste caminho de
fallback.

## Telemetria de `applied_edits`

Após uma resposta do Claude, o OmniRoute regista a quantidade de contexto que o fornecedor
efetivamente eliminou. Estes dados **não** são transmitidos em streaming — são extraídos do corpo da
resposta sem streaming, em regime de melhor esforço, e nunca afetam a resposta (as falhas de
telemetria são ignoradas).

- Extração: `extractContextEditingTelemetry(responseBody)` em `open-sse/config/contextEditing.ts`.
  A função procura `applied_edits` em três localizações (de forma defensiva, devido ao formato da
  resposta):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Campos lidos em cada entrada: `cleared_input_tokens` e `cleared_tool_uses`
  (snake_case nativo da Anthropic), com `clearedInputTokens` / `clearedToolUses` em camelCase como
  alternativas.
- Devolve `null` quando não é encontrado nenhum array `applied_edits` ou quando nada foi efetivamente
  eliminado.

A estrutura do registo é `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
O registo ocorre em `open-sse/handlers/chatCore.ts` (limitado a `provider === "claude"`) através de
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), que escreve uma linha de
análise de compressão com as etiquetas:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = número de tokens de entrada eliminados
- `request_id` com o sufixo `::context-editing`

Assim, a eliminação delegada aparece na análise de compressão juntamente com os motores locais, sob
a etiqueta de motor `context-editing`, e pode ser distinguida das poupanças de
RTK/Caveman/LLMLingua.

## Relação com os motores de compressão locais

| Aspeto                 | Motores locais (Caveman / RTK / LLMLingua / stacked) | Edição de Contexto Delegada                                          |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| Onde é executado       | No OmniRoute, antes de o pedido sair do proxy        | No fornecedor (Claude), do lado do servidor                          |
| O que edita            | Texto do prompt / contexto / resultado da ferramenta | Blocos antigos de utilização/resultado de ferramentas                |
| Âmbito do fornecedor   | Todos os fornecedores                                | Apenas `claude` + `anthropic-compatible-cc-*`                        |
| Ativação/desativação   | Definições do modo de compressão                     | `contextEditing.enabled`                                             |
| Modo de falha          | Falha aberta (texto original)                        | Alternativa para 400: remover o parâmetro e tentar novamente uma vez |
| Telemetria de poupança | `engine: <engine id>`                                | `engine: "context-editing"`                                          |

Os dois são complementares: os motores locais comprimem os bytes que o OmniRoute envia; a Edição de Contexto permite ao
Claude reduzir o contexto em curso ao longo das interações. Podem ser ativados em conjunto.

## Ver também

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registo de motores e motores de compressão
  locais
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compressão de comandos/resultados de ferramentas
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compressão de descrições MCP e
  redução da cardinalidade de ferramentas
- Código-fonte: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
