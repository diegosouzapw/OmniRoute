# Feature OQueElaFaz 01 — Catálogo Canônico de Modelos e Capacidades

**Origem:** Gap encontrado na comparação com LiteLLM (`model_prices_and_context_window.json`)  
**Prioridade:** P0 (compatibilidade e estabilidade de roteamento)  
**Impacto esperado:** Redução de erro por limite incorreto, atualização de modelos sem retrabalho e melhor compatibilidade entre providers

---

## O que ela faz

Cria uma fonte única de verdade para metadados de modelo no OmniRoute, com campos como:

- `model_id` canônico
- `provider`
- `max_input_tokens`
- `max_output_tokens`
- `max_tokens`
- `supports_function_calling`
- `supports_vision`
- `supports_reasoning`
- custo por token (quando disponível)

Essa base elimina heurísticas soltas e permite que validação, fallback e roteamento leiam os mesmos limites.

---

## Motivação

Hoje os limites de contexto e capacidades ficam espalhados entre registries e validações parciais. Isso cria três problemas:

1. risco de enviar payload acima do limite real do modelo
2. dificuldade para atualizar rapidamente quando um provider muda parâmetros
3. inconsistência entre chat, responses e endpoints auxiliares

---

## O que ganhamos

1. Compatibilidade previsível com modelos novos
2. Menos `400 Bad Request` por parâmetro inválido
3. Base pronta para pricing, roteamento por custo e SLO de latência
4. Onboarding de provider/modelo mais rápido

---

## Antes e Depois

## Antes

- limites inferidos por heurística (`provider -> contexto médio`)
- capacidades deduzidas no fluxo de execução
- atualização manual em múltiplos arquivos

## Depois

- limites e capabilities consultados de um registro central
- validação de request feita antes de chamar provider
- atualização controlada por uma estrutura única versionada

---

## Como fazer (passo a passo)

1. Criar estrutura `src/shared/modelCatalog/model_registry.json` com schema explícito.
2. Criar loader `src/shared/modelCatalog/index.js` com validação de schema e cache em memória.
3. Adaptar `open-sse/services/contextManager.js` para usar dados do catálogo.
4. Adaptar validadores de parâmetros para usar `supports_*` e limites por modelo.
5. Adicionar fallback para heurística somente quando modelo não existir no catálogo.
6. Registrar versão do catálogo em endpoint de health/admin.

---

## Arquivos-alvo sugeridos

- `src/shared/modelCatalog/model_registry.json`
- `src/shared/modelCatalog/index.js`
- `open-sse/services/contextManager.js`
- `open-sse/handlers/chatCore.js`
- `open-sse/handlers/responsesHandler.js`
- `src/app/api/health/route.js`

---

## Critérios de aceite

- Todo request de chat/responses valida limites no catálogo.
- Sem regressão para modelos existentes do `providerRegistry`.
- Endpoint de health expõe versão e data do catálogo carregado.
- Testes cobrindo pelo menos: limite válido, limite excedido, modelo ausente.

---

## Riscos e mitigação

| Risco                                      | Mitigação                                   |
| ------------------------------------------ | ------------------------------------------- |
| Divergência entre catálogo e provider real | Job de sync + flag de fallback por provider |
| Aumento de latência por lookup             | Cache em memória com warmup no startup      |
| Quebra em modelos customizados             | Permitir `custom_models` com schema mínimo  |

---

## Métricas de sucesso

- Queda de erros 400 por limite inválido
- Tempo médio para adicionar novo modelo
- Taxa de acerto de capacidades (tools/vision/reasoning)
