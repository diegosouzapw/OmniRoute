# Feature OQueElaFaz 05 — Roteamento Cost-Aware e Usage-Aware

**Origem:** estratégias maduras de roteamento vistas no LiteLLM  
**Prioridade:** P1  
**Impacto esperado:** melhor equilíbrio entre custo, performance e capacidade

---

## O que ela faz

Inclui duas estratégias adicionais:

1. `cost-aware`: prioriza menor custo efetivo por token para o objetivo definido.
2. `usage-aware`: distribui tráfego com base em uso/limites atuais para evitar saturação.

---

## Motivação

Sem score de custo e consumo, o roteamento pode concentrar em contas caras ou já próximas do limite.

---

## O que ganhamos

1. Redução de custo médio por request
2. Menos picos de rate limit por concentração
3. Melhor utilização do pool de credenciais

---

## Antes e Depois

## Antes

- roteamento sem custo como variável explícita
- distribuição de carga limitada a heurísticas simples

## Depois

- score composto: custo + saúde + disponibilidade + latência
- distribuição mais uniforme sob carga

---

## Como fazer (passo a passo)

1. Integrar custo por modelo no catálogo canônico.
2. Calcular custo estimado antes da chamada (input estimado + output esperado).
3. Medir uso em janela curta por credencial (`rpm`, `tpm`, in-flight).
4. Implementar score com pesos configuráveis.
5. Permitir política por combo: `prefer-cheapest`, `balanced`, `prefer-fastest`.

---

## Arquivos-alvo sugeridos

- `src/domain/comboResolver.js`
- `src/domain/fallbackPolicy.js`
- `src/lib/usageAnalytics.js`
- `src/lib/db/settings.js`
- `src/app/api/settings/*`

---

## Critérios de aceite

- Estratégias novas ativáveis por config.
- Custo médio por 1k requests reduz em teste controlado.
- Sem queda de SLO de latência além do limite definido.

---

## Riscos e mitigação

| Risco                                  | Mitigação                                      |
| -------------------------------------- | ---------------------------------------------- |
| Custo estimado impreciso               | recalibração contínua com custo real observado |
| Estratégia agressiva em custo piora UX | preset `balanced` como padrão                  |

---

## Métricas de sucesso

- custo médio por request
- distribuição de uso entre credenciais
- taxa de throttling por provider
