# TASK T5 — Integração em `chat.ts`: Injeção de `_omniSessionId` e `_omniConnectionId`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1-T4 estão concluídas
3. Ler `src/sse/handlers/chat.ts` COMPLETO (versão atual, após as modificações dos itens 1-3)
4. Prestar atenção especial em:
   - Como `sessionId` é gerado (linha ~175: `generateStableSessionId` ou `extractExternalSessionId`)
   - Como `handleComboChat` é chamado (linhas ~275-298)
   - A assinatura do `handleComboChat` em `combo.ts`

## Objetivo

O `handleContextRelayCombo` (T4) precisa de:
1. **`sessionId`** — para buscar/salvar handoffs (já disponível no `chat.ts`)
2. **`connectionId`** — para buscar a quota atual da conta que está respondendo (disponível após `getProviderCredentials`)

Esta task resolve como transportar essas informações até dentro do combo loop.

## Estratégia Escolhida: Parâmetro Extra no `handleComboChat`

Em vez de poluir o `body` com campos `_omni*`, a abordagem mais limpa é passar uma **options bag** opcional para o `handleComboChat`:

### Modificação em `combo.ts` (parte da T4 mas descrita aqui)

Adicionar parâmetro opcional na assinatura do `handleComboChat`:

```typescript
export async function handleComboChat({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
  // NOVO: opções específicas do context-relay
  relayOptions,
}: {
  // ... tipos existentes ...
  relayOptions?: {
    sessionId: string | null;
    getConnectionId?: (modelStr: string) => Promise<string | null>;
  };
})
```

O `relayOptions` é `undefined` para todos os combos existentes — zero impacto retroativo.

### Modificação em `chat.ts`

No bloco de chamada do `handleComboChat` (linhas ~275-298), adicionar:

```typescript
const response = await (handleComboChat as any)({
  body,
  combo,
  handleSingleModel: (b: any, m: string) =>
    handleSingleModelChat(/* ... */),
  isModelAvailable: checkModelAvailable,
  log,
  settings,
  allCombos,
  // NOVO: passa dados do relay apenas quando strategy é context-relay
  ...(combo.strategy === "context-relay" && {
    relayOptions: {
      sessionId,
      // getConnectionId: chamada lazy para buscar o connectionId da conta
      // que foi usada em um request bem-sucedido
      getConnectionId: async (modelStr: string) => {
        const modelInfo = await getModelInfo(modelStr);
        const provider = modelInfo.provider;
        if (!provider) return null;
        const creds = await getProviderCredentials(
          provider,
          null,
          apiKeyInfo?.allowedConnections ?? null,
          modelInfo.model || modelStr
        );
        return creds?.connectionId || null;
      },
    },
  }),
});
```

## Como `handleContextRelayCombo` usa o `relayOptions`

No handler (T4), substituir as referências a `_omniSessionId` e `_omniConnectionId`:

```typescript
const { sessionId, getConnectionId } = relayOptions || {};

// Hook 2: Após request bem-sucedido
if (sessionId && getConnectionId && provider === "codex") {
  const connectionId = await getConnectionId(modelStr);
  if (connectionId) {
    const quotaInfo = await fetchCodexQuota(connectionId).catch(() => null);
    if (quotaInfo && quotaInfo.percentUsed >= HANDOFF_WARNING_THRESHOLD) {
      maybeGenerateHandoff({
        sessionId,
        comboName: combo.name,
        connectionId,
        percentUsed: quotaInfo.percentUsed,
        messages: ...,
        model: modelStr,
        expiresAt: ...,
        handleSingleModel,
      });
    }
  }
}
```

## Atenção: Generalização para outros providers

A geração de handoff é disparada apenas para `provider === "codex"` na fase inicial. Para generalizar para outros providers no futuro:

1. O `combo.config.handoff_provider_check` poderia ser um array de providers habilitados
2. Ou usar um callback `getQuotaForModel: (modelStr) => Promise<QuotaInfo | null>` no `relayOptions`
3. Para esta task, manter restrito ao Codex (via `fetchCodexQuota`) e documentar o ponto de extensão

## Verificação

```bash
# TypeScript
npm run typecheck:core

# Rodar o servidor dev e verificar nos logs:
# - "COMBO-CR" deve aparecer nos logs ao usar um combo context-relay
# - "Injecting handoff context" deve aparecer quando há troca de conta com handoff ativo
npm run dev

# Testes unitários
node --import tsx/esm --test tests/unit/plan3-p0.test.mjs
```

## Status

- [ ] Parâmetro `relayOptions` adicionado na assinatura do `handleComboChat` (ou solução alternativa acordada)
- [ ] `chat.ts` passa `relayOptions` quando `combo.strategy === "context-relay"`
- [ ] `handleContextRelayCombo` usa `relayOptions.sessionId` para buscar/salvar handoffs
- [ ] `handleContextRelayCombo` usa `relayOptions.getConnectionId` para buscar ConnectionId
- [ ] TypeScript compila sem erros
- [ ] Ponto de extensão documentado para outros providers
