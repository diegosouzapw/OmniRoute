# Feature OQueElaFaz 06 — Controle de TPM/RPM e Limite de Concorrência por Chave

**Origem:** hardening operacional observado no LiteLLM  
**Prioridade:** P0  
**Impacto esperado:** maior estabilidade sob carga e menos bloqueio por provider

---

## O que ela faz

Implementa enforcement explícito de:

- `RPM` (requests por minuto)
- `TPM` (tokens por minuto)
- `max_in_flight` por credencial/deployment

com rejeição antecipada ou fallback antes de exceder limites.

---

## Motivação

Sem limite claro por credencial, bursts podem estourar cotas, aumentar retries e piorar latência.

---

## O que ganhamos

1. Menos 429/lock por excesso
2. Mais previsibilidade de throughput
3. Melhor qualidade de fallback sob pressão

---

## Antes e Depois

## Antes

- rate handling reativo (após erro/headers)
- concorrência sem limite rígido por chave

## Depois

- preflight de capacidade por janela e in-flight
- fallback proativo para rota saudável

---

## Como fazer (passo a passo)

1. Definir estrutura de contador por `(provider, account, model)`.
2. Registrar tokens estimados no preflight e reconciliar com uso real.
3. Introduzir semáforo de concorrência por chave.
4. Expor estado dos contadores para o seletor de contas.
5. Integrar com `fallbackPolicy` para troca proativa.

---

## Arquivos-alvo sugeridos

- `open-sse/services/rateLimitManager.js`
- `open-sse/services/accountSelector.js`
- `open-sse/services/accountFallback.js`
- `src/domain/fallbackPolicy.js`
- `src/lib/db/domainState.js`

---

## Critérios de aceite

- Bloqueio antecipado funciona para RPM/TPM/in-flight.
- Fallback proativo evita parte relevante dos 429.
- Métricas por chave disponíveis para operação.

---

## Riscos e mitigação

| Risco                                       | Mitigação                                        |
| ------------------------------------------- | ------------------------------------------------ |
| Contagem de tokens estimada diverge do real | reconciliação por resposta + margem de segurança |
| Contenção excessiva reduz throughput        | ajuste dinâmico e perfil por provider            |

---

## Métricas de sucesso

- taxa de 429
- throughput sustentado por minuto
- fila/in-flight médio por credencial
