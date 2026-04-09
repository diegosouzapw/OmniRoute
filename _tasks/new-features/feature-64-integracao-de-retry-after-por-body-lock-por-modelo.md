# 1. Título da Feature

Feature 31 — Integração de `retry-after` por Body + Lock por Modelo

## 2. Objetivo

Fechar a integração de resiliência já existente para que:

- `retry-after` extraído do corpo de erro seja realmente aplicado ao limiter;
- lock por modelo seja efetivamente acionado no fluxo de fallback.

## 3. Motivação

O `9router` já possui `updateFromResponseBody()` e `lockModel()`, mas o caminho principal não chama essa integração completa em todos os pontos necessários.

## 4. Problema Atual (Antes)

- `updateFromResponseBody` existe, mas não é acionado no fluxo principal.
- `markAccountUnavailable` suporta `model`, mas `chat.js` chama sem esse argumento.
- Parte da inteligência de cooldown por modelo fica inativa na prática.

### Antes vs Depois

| Dimensão                           | Antes    | Depois   |
| ---------------------------------- | -------- | -------- |
| Uso de `retry-after` no body       | Parcial  | Completo |
| Lock por modelo                    | Parcial  | Efetivo  |
| Reação a 429 heterogêneo           | Limitada | Melhor   |
| Estabilidade sob limites dinâmicos | Média    | Alta     |

## 5. Estado Futuro (Depois)

No fluxo de erro upstream:

1. ler headers;
2. ler body de erro (quando aplicável);
3. atualizar rate limiter via body;
4. marcar indisponibilidade passando `provider` e `model`.

## 6. O que Ganhamos

- Melhor aproveitamento de hints de retry específicos de provider.
- Redução de tentativas inúteis no mesmo modelo/credencial.
- Menos cascata de erro em bursts de rate limit.

## 7. Escopo

- Ajustar `open-sse/handlers/chatCore.js`.
- Ajustar chamada de `markAccountUnavailable` em `src/sse/handlers/chat.js`.
- Garantir compatibilidade com fallback atual.

## 8. Fora de Escopo

- Reescrever o `rateLimitManager` por completo.
- Introduzir novo datastore de lock persistente nesta fase.

## 9. Arquitetura Proposta

```text
Upstream error
  -> parse headers
  -> parse body hints (retryDelay, retry after Xs)
  -> update limiter
  -> lock model(provider, connectionId, model)
  -> fallback account selection
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/handlers/chatCore.js`
- `open-sse/services/rateLimitManager.js`
- `src/sse/handlers/chat.js`
- `src/sse/services/auth.js`
- `open-sse/services/accountFallback.js`

Pseudo-código:

```js
// chatCore.js
const rawError = await providerResponse
  .clone()
  .text()
  .catch(() => "");
updateFromHeaders(provider, connectionId, providerResponse.headers, statusCode, model);
updateFromResponseBody(provider, connectionId, rawError, statusCode, model);

// chat.js
await markAccountUnavailable(connectionId, status, errorText, provider, model);
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs públicas: sem mudança de contrato.
- Tipos/interfaces: sem impacto externo obrigatório.
- Compatibilidade: non-breaking.

## 12. Passo a Passo de Implementação Futura

1. Chamar `updateFromResponseBody` no caminho de erro em `chatCore`.
2. Passar `model` na chamada de `markAccountUnavailable` em `chat.js`.
3. Logar explicitamente lock por modelo aplicado.
4. Criar flag para fallback do comportamento em caso de regressão.

## 13. Plano de Testes

Cenários positivos:

1. Dado erro com `retryDelay` no body, quando request falha, então limiter é atualizado com intervalo correto.
2. Dado 429 por modelo, quando falha, então lock desse modelo é criado.
3. Dado lock ativo, quando nova request chega para mesmo modelo/conta, então seleção evita essa combinação.

Cenários de erro:

4. Dado body inválido JSON, quando processar erro, então fluxo segue sem quebrar.
5. Dado ausência de `model` na request, quando falha, então fallback global permanece funcional.

Regressão:

6. Dado providers sem hints de body, quando requests falham, então mecanismo atual por header continua normal.

## 14. Critérios de Aceite

- [ ] Given erro com retry hint no corpo, When request falha, Then limiter ajusta janela de retry corretamente.
- [ ] Given falha por modelo específico, When fallback ocorre, Then lock por modelo é registrado com TTL.
- [ ] Given payload de erro sem formato esperado, When processado, Then sistema não quebra e mantém fallback atual.
- [ ] Given cenários já cobertos por headers, When feature ativa, Then não há regressão funcional.

## 15. Riscos e Mitigações

- Risco: lock excessivo por parse incorreto de body.
- Mitigação: validação estrita e limites de TTL.

## 16. Plano de Rollout

1. Ativar com logging detalhado.
2. Comparar taxa de erro/retry antes e depois.
3. Promover para padrão após estabilidade.

## 17. Métricas de Sucesso

- Queda de erros repetidos no mesmo modelo.
- Aumento de requests recuperadas por backoff correto.
- Redução de loops de fallback inúteis.
