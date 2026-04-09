# Feature OQueElaFaz 04 — Roteamento por Menor Latência (Lowest Latency)

**Origem:** estratégia presente no LiteLLM  
**Prioridade:** P1  
**Impacto esperado:** melhora de TTFT e latência total percebida

---

## O que ela faz

Adiciona estratégia de roteamento baseada em latência observada por deployment/credencial.

Seleção proposta:

- preferir nós com menor P50/P95 de TTFT
- respeitar saúde, cooldown e limite de taxa
- degradar para estratégia atual (P2C) quando não houver histórico suficiente

---

## Motivação

Hoje a seleção privilegia disponibilidade e fallback, mas não usa latência histórica como critério primário. Isso pode aumentar tempo de resposta em stream.

---

## O que ganhamos

1. Resposta inicial mais rápida em SSE
2. Melhor experiência para clientes interativos
3. Menor variabilidade entre requests

---

## Antes e Depois

## Antes

- seleção por regras estáticas/saúde e fallback
- latência não influencia a escolha principal

## Depois

- score de roteamento inclui TTFT e latência recente
- seleção se adapta dinamicamente por janela temporal

---

## Como fazer (passo a passo)

1. Coletar TTFT e duração por request no logger de proxy.
2. Persistir agregados por `(provider, account, model)` em janela móvel.
3. Implementar `strategy: lowest-latency` no `comboResolver`.
4. Definir fallback para P2C quando `n < mínimo de amostras`.
5. Expor métricas de latência por estratégia no dashboard.

---

## Arquivos-alvo sugeridos

- `src/lib/proxyLogger.js`
- `src/lib/usageAnalytics.js`
- `src/domain/comboResolver.js`
- `src/domain/modelAvailability.js`
- `src/app/api/analytics/*`

---

## Critérios de aceite

- Estratégia nova selecionável por configuração.
- P95 TTFT melhora em cenário de múltiplas contas heterogêneas.
- Sem regressão de taxa de sucesso.

---

## Riscos e mitigação

| Risco                              | Mitigação                              |
| ---------------------------------- | -------------------------------------- |
| Oscilação frequente de rota        | hysteresis e cooldown mínimo de troca  |
| Dados enviesados por pouco tráfego | fallback para P2C com threshold mínimo |

---

## Métricas de sucesso

- TTFT P50/P95 por provider
- Taxa de troca de rota por minuto
- Taxa de sucesso pós-roteamento
