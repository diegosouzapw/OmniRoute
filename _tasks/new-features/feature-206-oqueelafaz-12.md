# Feature OQueElaFaz 12 — Paridade de Endpoints OpenAI Avançados

**Origem:** superfície de API ampla do LiteLLM  
**Prioridade:** P1  
**Impacto esperado:** maior compatibilidade com SDKs e clientes existentes

---

## O que ela faz

Expande compatibilidade além de chat básico, priorizando endpoints com maior demanda:

1. `/v1/files`
2. `/v1/batches`
3. `/v1/assistants`
4. `/v1/vector_stores` e operações relacionadas

---

## Motivação

Clientes enterprise e fluxos de produção usam esses endpoints para RAG, processamento assíncrono e ferramentas.

---

## O que ganhamos

1. Amplia adoção do OmniRoute por clientes OpenAI-first
2. Reduz necessidade de bypass direto ao provider
3. Melhora retenção de integrações complexas

---

## Antes e Depois

## Antes

- foco principal em chat/responses e alguns multimodais
- parte dos clientes precisa integração paralela

## Depois

- OmniRoute cobre fluxo de ponta a ponta
- compatibilidade maior com SDKs oficiais e wrappers

---

## Como fazer (passo a passo)

1. Definir faseamento por endpoint (files -> batches -> assistants -> vector stores).
2. Criar handlers dedicados em `open-sse/handlers/`.
3. Reusar matriz de capabilities por provider para rotear apenas onde houver suporte.
4. Padronizar contratos de erro e paginação.
5. Adicionar testes de contrato para payloads OpenAI-like.

---

## Arquivos-alvo sugeridos

- `src/app/api/v1/files/route.js`
- `src/app/api/v1/batches/route.js`
- `src/app/api/v1/assistants/route.js`
- `src/app/api/v1/vector_stores/*`
- `open-sse/handlers/*`
- `tests/integration/*`

---

## Critérios de aceite

- SDK OpenAI consegue executar fluxos básicos sem adaptação.
- Erros e status codes seguem contrato esperado.
- Rotas novas passam em testes de contrato e regressão.

---

## Riscos e mitigação

| Risco                             | Mitigação                                   |
| --------------------------------- | ------------------------------------------- |
| alto esforço de paridade completa | entregar por fases com escopo mínimo viável |
| variação entre providers          | camada de tradução específica por endpoint  |

---

## Métricas de sucesso

- número de endpoints avançados suportados
- taxa de sucesso em testes de contrato OpenAI
