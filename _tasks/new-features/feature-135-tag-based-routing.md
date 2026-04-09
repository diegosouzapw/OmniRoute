# Feature 135 — Tag-Based Routing

## Resumo

Permitir que requisições incluam tags nos metadados para influenciar o roteamento. Tags como `"fast"`, `"cheap"`, `"reliable"`, `"eu-region"` direcionam a requisição para deployments que correspondam a esses critérios, complementando as estratégias existentes do combo resolver.

## Motivação

O LiteLLM em `router_strategy/tag_based_routing.py` permite que clientes adicionem tags no campo `metadata` da requisição para controlar qual deployment atende. Isso é útil quando o mesmo modelo está disponível em múltiplos provedores/regiões e o cliente quer controlar qual usar para cada requisição específica, sem alterar a configuração global.

## O que ganhamos

- **Controle por requisição**: Cada request pode escolher critérios diferentes
- **Multi-tenancy**: Diferentes clientes/equipes usam tags para rotas dedicadas
- **Compliance**: Tags como `"eu-only"` garantem que dados ficam em região específica
- **Otimização contextual**: Tarefas simples → `"cheap"`, tarefas críticas → `"reliable"`

## Situação Atual (Antes)

```
Combo "gpt-4o" → strategy: "priority"
  → Sempre usa o primeiro provider disponível (ex: openai)
  → Cliente quer usar fireworks (mais barato) para batch processing
  → Precisa criar outro combo ou mudar configuração global
  → Sem flexibilidade per-request
```

## Situação Proposta (Depois)

```
Combo "gpt-4o" → providers: [openai, fireworks, together]
  → Tags configuradas por provider:
      openai: ["reliable", "us-region"]
      fireworks: ["fast", "cheap"]
      together: ["cheap", "batch"]

Request 1: { model: "gpt-4o", metadata: { tags: ["reliable"] } }
  → Roteia para: openai ✓

Request 2: { model: "gpt-4o", metadata: { tags: ["cheap"] } }
  → Roteia para: fireworks ou together ✓

Request 3: { model: "gpt-4o" }  // sem tags
  → Usa estratégia padrão do combo (priority) ✓
```

## Especificação Técnica

### Configuração de Tags por Provider Connection

```javascript
// Em provider connections (SQLite), adicionar campo tags
// provider_connections table: adicionar coluna 'tags' TEXT (JSON array)

{
  id: "conn-openai-01",
  provider: "openai",
  tags: ["reliable", "us-region", "enterprise"],
  // ... demais campos
}
```

### Lógica de Resolução por Tag

```javascript
// src/domain/tagRouter.js

/**
 * Filtrar deployments por tags da requisição.
 *
 * @param {Array} deployments - Lista de deployments disponíveis
 * @param {string[]} requestTags - Tags da requisição
 * @param {'all'|'any'} matchMode - 'all' = deployment deve ter todas as tags, 'any' = pelo menos uma
 * @returns {Array} Deployments que correspondem
 */
export function filterByTags(deployments, requestTags, matchMode = "any") {
  if (!requestTags || requestTags.length === 0) return deployments;

  const filtered = deployments.filter((d) => {
    const deploymentTags = d.tags || [];
    if (matchMode === "all") {
      return requestTags.every((t) => deploymentTags.includes(t));
    }
    return requestTags.some((t) => deploymentTags.includes(t));
  });

  // Se nenhum deployment matcha, retornar todos (fallback gracioso)
  return filtered.length > 0 ? filtered : deployments;
}
```

### Integração com comboResolver.js

```javascript
// Em comboResolver.js — resolveComboModel()

import { filterByTags } from "./tagRouter.js";

export function resolveComboModel(combo, context = {}) {
  let models = combo.models || [];

  // NOVO: Filtrar por tags se presentes no contexto
  if (context.tags && context.tags.length > 0) {
    models = filterByTags(models, context.tags, context.tagMatchMode || "any");
  }

  // ... continuar com estratégia normal (priority, round-robin, etc.)
}
```

### Formato da Requisição

```json
{
  "model": "gpt-4o",
  "messages": [{ "role": "user", "content": "Hello" }],
  "metadata": {
    "tags": ["fast", "cheap"],
    "tag_match_mode": "any"
  }
}
```

## Como fazer (passo a passo)

1. Estender schema de provider connection para aceitar lista de tags.
2. Implementar utilitário de filtro por tags com modos `any` e `all`.
3. Extrair tags de `metadata` da requisição no handler e repassar ao resolver.
4. Integrar filtro antes da estratégia principal (priority, round-robin, p2c).
5. Manter fallback gracioso para estratégia padrão quando não houver match.
6. Adicionar testes unitários do filtro e testes de integração no fluxo de roteamento.

## Arquivos a Criar/Modificar

| Arquivo                          | Ação                                     |
| -------------------------------- | ---------------------------------------- |
| `src/domain/tagRouter.js`        | **NOVO** — Lógica de filtro por tags     |
| `src/domain/comboResolver.js`    | **MODIFICAR** — Integrar filtro por tags |
| `src/sse/handlers/chat.js`       | **MODIFICAR** — Extrair tags do metadata |
| `src/lib/db/providers.js`        | **MODIFICAR** — Adicionar campo tags     |
| `src/app/api/providers/route.js` | **MODIFICAR** — CRUD de tags             |

## Critérios de Aceite

- [ ] Requisição com `metadata.tags` filtra deployments correspondentes
- [ ] Sem tags → comportamento atual mantido (nenhuma quebra)
- [ ] Modo `any` (default) → basta uma tag corresponder
- [ ] Modo `all` → todas as tags devem corresponder
- [ ] Se nenhum deployment corresponde → fallback para todos (gracioso)
- [ ] Tags são configuráveis via API e dashboard por provider connection
- [ ] Tags não afetam performance (filtro O(n) simples)

## Referência

- [LiteLLM: router_strategy/tag_based_routing.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/tag_based_routing.py) — filtro por tags no router
