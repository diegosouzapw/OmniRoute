# Feature OQueElaFaz 08 — Cooldown Escalonado e Circuit Breaker Unificado

**Origem:** padrões de cooldown por falha observados no LiteLLM  
**Prioridade:** P0  
**Impacto esperado:** diminuir efeito cascata quando provider degrada

---

## O que ela faz

Unifica cooldown e circuit breaker por credencial/deployment com janelas escalonadas por tipo de falha:

- timeout: cooldown curto
- 5xx repetido: cooldown médio
- auth/ban: cooldown longo e bloqueio manual até correção

---

## Motivação

Sem escalonamento robusto, um nó degradado continua sendo tentado repetidamente, aumentando latência e erro global.

---

## O que ganhamos

1. Menos tentativas em nós ruins
2. Recuperação mais rápida do cluster
3. Menos erro em cascata

---

## Antes e Depois

## Antes

- cooldown parcial por fluxos específicos
- circuit breaker e fallback com regras dispersas

## Depois

- estado único de saúde por deployment
- cooldown escalonado com transição `closed -> open -> half-open`

---

## Como fazer (passo a passo)

1. Definir state machine de breaker em módulo único.
2. Consolidar fonte de falhas de executor e handlers.
3. Aplicar cooldown por classe de falha.
4. Habilitar half-open com tráfego de prova limitado.
5. Expor estado de saúde no dashboard/admin.

---

## Arquivos-alvo sugeridos

- `src/shared/utils/circuitBreaker.js`
- `open-sse/services/accountFallback.js`
- `src/domain/modelAvailability.js`
- `src/lib/db/domainState.js`
- `src/app/api/health/*`

---

## Critérios de aceite

- Breaker entra em `open` após limiar de falhas.
- Half-open libera amostra controlada.
- Rota degradada deixa de ser selecionada automaticamente.

---

## Riscos e mitigação

| Risco                               | Mitigação                             |
| ----------------------------------- | ------------------------------------- |
| Cooldown excessivo reduz capacidade | thresholds configuráveis por provider |
| Oscilação entre estados             | janela mínima por estado + hysteresis |

---

## Métricas de sucesso

- taxa de erro durante incidente
- tempo de recuperação após degradação
- volume de tentativas em deployment em cooldown
