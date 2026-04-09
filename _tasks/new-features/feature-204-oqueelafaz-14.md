# Feature OQueElaFaz 14 — Guardrail Registry (Pré e Pós Requisição)

**Origem:** arquitetura de hooks e guardrails de gateways maduros  
**Prioridade:** P2  
**Impacto esperado:** segurança e governança centralizadas sem espalhar regras

---

## O que ela faz

Cria um registro plugável de guardrails para validar e modificar fluxo em pontos controlados:

- `pre_request`
- `pre_upstream`
- `post_upstream`
- `pre_response`

Exemplos de guardrail:

- bloqueio de prompt com padrão proibido
- remoção de PII
- validação de schema de resposta

---

## Motivação

Regras de segurança e compliance espalhadas por handlers aumentam risco de inconsistência.

---

## O que ganhamos

1. Governança centralizada
2. Reuso de políticas entre endpoints
3. Menor risco de bypass por rota nova

---

## Antes e Depois

## Antes

- validações distribuídas e específicas por handler
- difícil auditar cobertura de proteção

## Depois

- pipeline de hooks comum
- catálogo de guardrails versionado e habilitável por tenant/projeto

---

## Como fazer (passo a passo)

1. Definir interface de guardrail (`run(context) -> decision`).
2. Criar registry com prioridade e escopo (global/provider/model).
3. Integrar pipeline no fluxo principal de handlers.
4. Registrar eventos de guardrail acionado para auditoria.
5. Criar guardrails iniciais de alto impacto (PII, tamanho, denylist).

---

## Arquivos-alvo sugeridos

- `src/lib/guardrails/registry.js`
- `src/lib/guardrails/policies/*`
- `open-sse/handlers/chatCore.js`
- `open-sse/handlers/responsesHandler.js`
- `src/lib/proxyLogger.js`

---

## Critérios de aceite

- Guardrails executam em ordem determinística.
- Ação de bloqueio retorna erro padronizado.
- Auditoria registra guardrail e motivo.

---

## Riscos e mitigação

| Risco               | Mitigação                                        |
| ------------------- | ------------------------------------------------ |
| impacto de latência | limites de tempo por guardrail + cache de policy |
| falso positivo      | modo dry-run e rollout gradual                   |

---

## Métricas de sucesso

- quantidade de bloqueios úteis
- taxa de falso positivo
- latência adicional média dos guardrails
