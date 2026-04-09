# Feature 09 - Paridade de semantica de erro/rate-limit para clients de management

## O que ela faz

Padroniza semantica de erro, `Retry-After` e codigos de status na camada de management para manter comportamento esperado por clientes que tomam decisoes automaticas com base nesses sinais.

## Motivacao

O `9router` ja possui resiliencia forte internamente (`rateLimitManager`, `accountFallback`, `circuit breaker`), mas a exposicao dessa semantica via contrato de management ainda nao esta formalizada.

## Antes x Depois

| Dimensao                      | Antes         | Depois         |
| ----------------------------- | ------------- | -------------- |
| `Retry-After` em management   | Inconsistente | Padronizado    |
| Erro consumivel por cliente   | Parcial       | Deterministico |
| Decisao automatica no cliente | Fraca         | Forte          |

## Como implementar

1. Criar normalizador em `src/lib/management/errorAdapter.js`.
2. Aplicar em todas as rotas `/v0/management/*`.
3. Mapear status para categorias de erro (`auth`, `rate_limit`, `server`).
4. Expor `Retry-After` quando aplicavel.

## Criterios de aceite

- 401/403/429/5xx seguem formato de erro padrao.
- 429 sempre inclui sinal temporal util para retry.
- Cliente externo consegue classificar erro sem parsing fragil.

## Riscos

- Sobresimplificar erros ricos do core.

## Mitigacoes

- Incluir campo `details` para diagnostico tecnico.
- Preservar `request_id` em todas as falhas.

## O que ganhamos

- Menos loops de retry ineficientes.
- Melhor comportamento de fallback do cliente.

## Esforco estimado

- Medio (2 dias uteis).
