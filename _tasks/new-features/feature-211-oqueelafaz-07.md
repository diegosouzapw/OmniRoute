# Feature OQueElaFaz 07 — Retry Policy por Classe de Erro

**Origem:** política de retries avançada vista no LiteLLM  
**Prioridade:** P0  
**Impacto esperado:** menos falhas finais e menor retry inútil

---

## O que ela faz

Padroniza política de retry baseada em classe de erro, por exemplo:

- retry: timeout, conexão resetada, 5xx transitório
- não retry: 401/403 credencial inválida, 400 schema inválido
- retry condicionado: 429 conforme `retry-after`

---

## Motivação

Retry sem classificação correta aumenta custo, latência e risco de ban.

---

## O que ganhamos

1. Menor número de tentativas desperdiçadas
2. Melhor taxa de sucesso em falhas transitórias
3. Comportamento previsível para suporte e observabilidade

---

## Antes e Depois

## Antes

- retry mais genérico e dependente do fluxo local
- sem matriz clara por tipo de erro

## Depois

- matriz de retry versionada por erro/provedor
- orçamento de retry por request (retry budget)

---

## Como fazer (passo a passo)

1. Definir enum de erro interno (`AUTH`, `RATE_LIMIT`, `TIMEOUT`, `UPSTREAM_5XX`, `BAD_REQUEST`).
2. Classificar respostas/exceções no executor base.
3. Criar policy table com `max_attempts`, `backoff`, `retryable`.
4. Respeitar `Retry-After` quando disponível.
5. Registrar cabeçalhos de depuração de tentativa para cliente.

---

## Arquivos-alvo sugeridos

- `open-sse/executors/base.js`
- `open-sse/services/provider.js`
- `open-sse/services/accountFallback.js`
- `src/shared/utils/circuitBreaker.js`

---

## Critérios de aceite

- Matriz de retry cobre principais classes de erro.
- `429` usa `Retry-After` quando presente.
- Redução de retries em erros não recuperáveis.

---

## Riscos e mitigação

| Risco                             | Mitigação                                     |
| --------------------------------- | --------------------------------------------- |
| Classificação incorreta de erro   | suíte de testes por provider e payload real   |
| Backoff agressivo gera fila longa | limite de budget e timeout global por request |

---

## Métricas de sucesso

- sucesso após retry
- média de tentativas por request
- retries evitados em erro não recuperável
