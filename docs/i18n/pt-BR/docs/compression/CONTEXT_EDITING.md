# Delegated Context Editing (Anthropic) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

A **Edição de Contexto** delegada é um recurso de gerenciamento de contexto exclusivo do Claude. Diferentemente dos mecanismos locais de
compactação do OmniRoute (Caveman, RTK, LLMLingua, pipelines empilhados) — que reescrevem o corpo da solicitação
_antes_ que ele saia do proxy —, a Edição de Contexto solicita ao **provedor** que remova blocos obsoletos
de uso/resultado de ferramentas de sua própria janela de contexto em execução. O OmniRoute apenas anexa um
parâmetro ao corpo (`context_management.edits[]`); o Claude realiza a remoção efetiva usando seu próprio tokenizador.

Por natureza, esse é um recurso delegado: outros provedores rejeitam o parâmetro, portanto o OmniRoute o restringe
rigorosamente ao Claude e a retransmissores compatíveis com o Claude Code.

Fonte oficial: `open-sse/config/contextEditing.ts` (IDs de estratégia, injeção no corpo, extração de
telemetria), `open-sse/executors/base.ts` (condição de injeção + fallback para 400) e
`open-sse/services/compression/types.ts` (formato da configuração + padrão).

## O que `clear_tool_uses` faz

O OmniRoute injeta uma única edição no corpo de saída do Anthropic Messages:

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
- `trigger.value: 100000` — quando os tokens de entrada da solicitação ultrapassam esse limite, o Claude começa a
  remover pares antigos de uso/resultado de ferramentas (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, o padrão da Anthropic).
- `keep.value: 3` — os N pares mais recentes de uso/resultado de ferramentas são mantidos intactos
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

A versão beta é anunciada por meio do cabeçalho `anthropic-beta: context-management-2025-06-27`, que
o OmniRoute já envia nas solicitações ao Claude.

A injeção é realizada por `applyContextEditingToBody()` e é **idempotente**: se uma edição `clear_tool_uses`
já existir no corpo (adicionada por uma chamada anterior ou fornecida pelo cliente), o corpo será
mantido como está. Se uma edição `clear_thinking_20251015` também estiver presente, o OmniRoute ordenará de forma estável a
edição `clear_thinking` para o início, pois a Anthropic exige que `clear_thinking` venha antes de
`clear_tool_uses` no array `edits[]`.

## A opção de ativação por combinação

A Edição de Contexto fica **desativada por padrão** e exige ativação explícita. A opção é um único booleano presente na
configuração de compactação:

- Chave da configuração: `contextEditing.enabled` (camelCase — **não** `context_editing` / `context-editing`).
- Tipo: `ContextEditingConfig { enabled: boolean }` em
  `open-sse/services/compression/types.ts`.
- Padrão: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Esquema Zod: `contextEditingConfigSchema` em `src/shared/validation/compressionConfigSchemas.ts`.
- Armazenamento: persistido com o restante das configurações de compactação (normalizado em
  `src/lib/db/compression.ts`).

No painel, a opção fica no hub de compactação
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) e grava
`{ contextEditing: { enabled: … } }` por meio de `saveSettings()`. Como faz parte do objeto de
configurações de compactação, ela é combinada com o perfil de compactação de cada combinação, em vez de ser uma
configuração totalmente independente — a configuração contém apenas o indicador de ativação/desativação; todos os limites (`trigger`,
`keep`) são as constantes documentadas acima.

## Restrição exclusiva ao Claude

A injeção acontece apenas para retransmissores genuínos do Claude ou compatíveis com o Claude Code. A verificação em
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
- `isClaudeCodeCompatible(this.provider)` — retransmissores cujo id de provedor começa com o prefixo
  `anthropic-compatible-cc-` (eles anunciam compatibilidade com o Claude Code e, portanto, são os retransmissores
  com maior probabilidade de aceitar o beta). Consulte `open-sse/services/provider.ts`.

Deliberadamente **excluídos**:

- `claude-web` — um retransmissor via navegador com um formato de solicitação `create_conversation_params` que nunca recebe
  `context_management`.
- Retransmissores genéricos `anthropic-compatible-*` (sem o prefixo `-cc-`) — endpoints de terceiros com
  suporte incerto ao beta.

Provedores que não são Claude nunca recebem o parâmetro `context_management`, mesmo quando a opção está ativada.

## O fallback de 400 / cobertura de retransmissores

Um retransmissor compatível com o Claude pode anunciar o beta, mas ainda assim rejeitar o parâmetro `context_management`
com um HTTP 400. Para realizar uma degradação controlada em vez de causar falha na solicitação, o executor remove o
parâmetro e tenta novamente a mesma URL **uma vez**:

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

1. É acionado apenas em um `400` enquanto a edição de contexto está habilitada e o corpo realmente contém
   `context_management`.
2. O corpo da resposta 400 é lido por meio de um `clone()`, para que a resposta original permaneça intacta no caminho
   em que não há correspondência.
3. O texto do erro deve corresponder a `/context[_-]management|context editing/i` — um 400 não relacionado (por exemplo,
   `max_tokens must be >= 1`) **não** aciona o fallback; o erro original é propagado.
4. Quando há correspondência, ele define `contextEditingDisabled = true` (o que impede uma nova injeção caso um novo
   `transformedBody` seja criado posteriormente para uma URL de nova tentativa/fallback), exclui `context_management`,
   assina novamente o corpo para o Claude / retransmissores compatíveis com o Claude Code (`signRequestBody`) e tenta
   novamente a mesma URL uma vez.

O Claude genuíno inclui o beta em `ANTHROPIC_BETA_BASE` e não entra nesse caminho de fallback.

## Telemetria de `applied_edits`

Após uma resposta do Claude, o OmniRoute registra quanto contexto o provedor realmente removeu. Isso
**não** é transmitido por streaming — os dados são extraídos do corpo da resposta sem streaming, por melhor esforço, e nunca
afetam a resposta (falhas de telemetria são ignoradas).

- Extração: `extractContextEditingTelemetry(responseBody)` em `open-sse/config/contextEditing.ts`.
  Ela procura `applied_edits` em três locais (de forma defensiva em relação ao formato da resposta):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Campos lidos por edição em cada entrada: `cleared_input_tokens` e `cleared_tool_uses`
  (snake_case, nativo da Anthropic), com fallbacks camelCase `clearedInputTokens` / `clearedToolUses`.
- Retorna `null` quando nenhum array `applied_edits` é encontrado ou quando nada foi realmente removido.

O formato do recibo é `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
O registro ocorre em `open-sse/handlers/chatCore.ts` (restrito a `provider === "claude"`) por meio de
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), que grava uma linha de análise de
compressão identificada com:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = a contagem de tokens de entrada removidos
- `request_id` com o sufixo `::context-editing`

Assim, a remoção delegada aparece nas análises de compressão junto aos mecanismos locais, sob o rótulo de mecanismo
`context-editing`, e pode ser distinguida das economias de RTK/Caveman/LLMLingua.

## Relação com os mecanismos de compressão locais

| Aspecto                | Mecanismos locais (Caveman / RTK / LLMLingua / empilhados) | Edição de Contexto Delegada                                           |
| ---------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| Onde é executado       | No OmniRoute, antes de a solicitação sair do proxy         | No provedor (Claude), no lado do servidor                             |
| O que é editado        | Texto de prompt / contexto / resultado de ferramenta       | Blocos antigos de uso / resultado de ferramenta                       |
| Escopo de provedores   | Todos os provedores                                        | Apenas `claude` + `anthropic-compatible-cc-*`                         |
| Alternância            | Configurações do modo de compressão                        | `contextEditing.enabled`                                              |
| Modo de falha          | Falha aberta (texto original)                              | Fallback em caso de 400: remove o parâmetro e tenta novamente uma vez |
| Telemetria de economia | `engine: <engine id>`                                      | `engine: "context-editing"`                                           |

Os dois são complementares: os mecanismos locais comprimem os bytes enviados pelo OmniRoute; a Edição de Contexto permite que
o Claude remova partes do contexto acumulado entre turnos. Eles podem ser habilitados simultaneamente.

## Veja também

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registro de mecanismos e mecanismos de compressão
  locais
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compressão de comandos/saída de ferramentas
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compressão de descrições MCP e
  redução da cardinalidade de ferramentas
- Fonte: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
