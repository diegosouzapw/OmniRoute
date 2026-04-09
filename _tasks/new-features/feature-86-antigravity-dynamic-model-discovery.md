# Feature 82 — Discovery Dinâmico de Modelos Antigravity via Payload Completo

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/parsers/antigravity.parser.ts`  
**Prioridade:** 🟡 Média  
**Impacto:** Cobertura automática de novos modelos Antigravity sem atualização manual

---

## Motivação

A API `fetchAvailableModels` do Antigravity retorna um payload rico que contém não apenas o objeto `models`, mas também listas extras de model IDs em campos como:

- `agentModelSorts[].groups[].modelIds` — Modelos usados em modo agente
- `commandModelIds` — Modelos para comandos
- `tabModelIds` — Modelos para tab completion
- `imageGenerationModelIds` — Modelos de geração de imagem
- `mqueryModelIds` — Modelos de query
- `webSearchModelIds` — Modelos de busca web
- `defaultAgentModelId` — Modelo agente padrão

Esses campos podem conter model IDs que **não existem** no objeto `models`, ou seja, modelos novos que o Google adicionou mas que ainda não têm quota info completa. O zero-limit implementa um parser que extrai esses IDs extras e os adiciona à lista.

---

## O que Ganhamos

1. **Descoberta automática de modelos**: Novos modelos aparecem automaticamente sem precisar atualizar aliases manualmente
2. **Cobertura completa**: Todos os modelos disponíveis no Antigravity ficam visíveis
3. **Mapeamento de capacidades**: Saber quais modelos suportam imagem, busca web, etc.
4. **Menor manutenção**: Reduz a necessidade de atualizar `src/shared/constants/providers.js` a cada release do Google

---

## ANTES (Situação Atual)

```javascript
// Apenas parseamos o objeto `models` da resposta
// Modelos listados em agentModelSorts, commandModelIds, etc. são ignorados
// Se o Google adiciona um novo modelo, só descobrimos quando alguém reclama
```

---

## DEPOIS (Implementação Proposta)

### Adicionar discovery de model IDs extras ao quota fetcher do Antigravity

```javascript
// src/lib/usage/parsers/antigravityDiscovery.js (NOVO)

/**
 * Fallback de nomes para model IDs sem displayName
 */
const MODEL_DISPLAY_NAMES = {
  "rev19-uic3-1p": "Gemini 2.5 Computer Use",
  "gemini-3-pro-image": "Gemini 3 Pro Image",
  "gemini-2.5-flash-lite": "Gemini 2.5 Flash Lite",
  "gemini-2.5-flash": "Gemini 2.5 Flash",
  "gemini-3-flash": "Gemini 3 Flash",
  "gemini-3-pro-high": "Gemini 3 Pro (High)",
  "gemini-3-pro-low": "Gemini 3 Pro (Low)",
};

/**
 * IDs internos que devem ser ignorados
 */
const EXCLUDED_PREFIXES = ["chat_"];
const EXCLUDED_IDS = new Set(["tab_flash_lite_preview", "tab_jump_flash_lite_preview"]);

/**
 * Extrai todos os model IDs do payload completo da API fetchAvailableModels
 * Retorna Set<string> com IDs únicos (excluindo internos)
 */
export function extractExtraModelIds(payload) {
  const extraIds = new Set();

  const addIds = (ids) => {
    if (!Array.isArray(ids)) return;
    ids.forEach((id) => {
      if (typeof id === "string") extraIds.add(id);
    });
  };

  // Agent model sorts (nested groups)
  if (Array.isArray(payload.agentModelSorts)) {
    payload.agentModelSorts.forEach((sort) => {
      if (sort?.groups && Array.isArray(sort.groups)) {
        sort.groups.forEach((group) => addIds(group.modelIds));
      }
    });
  }

  // Flat model ID lists
  addIds(payload.commandModelIds);
  addIds(payload.tabModelIds);
  addIds(payload.imageGenerationModelIds);
  addIds(payload.mqueryModelIds);
  addIds(payload.webSearchModelIds);

  // Default agent model
  if (payload.defaultAgentModelId) {
    extraIds.add(payload.defaultAgentModelId);
  }

  // Filtrar IDs internos
  return new Set(
    [...extraIds].filter(
      (id) => !EXCLUDED_IDS.has(id) && !EXCLUDED_PREFIXES.some((prefix) => id.startsWith(prefix))
    )
  );
}

/**
 * Resolve o display name de um model ID
 */
export function resolveModelDisplayName(modelId) {
  return MODEL_DISPLAY_NAMES[modelId] || modelId;
}

/**
 * Categoriza um model ID por sua presença nos campos do payload
 * Útil para saber se o modelo suporta imagem, busca, etc.
 */
export function categorizeModelCapabilities(modelId, payload) {
  const capabilities = [];
  if (payload.imageGenerationModelIds?.includes(modelId)) capabilities.push("image");
  if (payload.webSearchModelIds?.includes(modelId)) capabilities.push("web-search");
  if (payload.commandModelIds?.includes(modelId)) capabilities.push("command");
  if (payload.tabModelIds?.includes(modelId)) capabilities.push("tab");
  if (payload.mqueryModelIds?.includes(modelId)) capabilities.push("mquery");
  if (payload.defaultAgentModelId === modelId) capabilities.push("default-agent");
  return capabilities;
}
```

### Integrar no fluxo de parsing de quota

```javascript
// No parser de quota do Antigravity, após processar payload.models:
const existingKeys = new Set(Object.keys(payload.models || {}));
const extraIds = extractExtraModelIds(payload);

for (const id of extraIds) {
  if (existingKeys.has(id)) continue;
  models.push({
    name: resolveModelDisplayName(id),
    percentage: 100, // Sem info de quota = assumir disponível
    capabilities: categorizeModelCapabilities(id, payload),
  });
}
```

---

## Agrupamentos de Modelos (Referência zero-limit)

O zero-limit define agrupamentos visuais para o dashboard. Útil como referência para nosso UI:

| Grupo                 | Identifiers                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| Claude/GPT            | `claude-sonnet-4-5-thinking`, `claude-opus-4-5-thinking`, `claude-sonnet-4-5` |
| Gemini 3 Pro          | `gemini-3-pro-high`, `gemini-3-pro-low`                                       |
| Gemini 2.5 Flash      | `gemini-2.5-flash`, `gemini-2.5-flash-thinking`                               |
| Gemini 2.5 Flash Lite | `gemini-2.5-flash-lite`                                                       |
| Gemini 2.5 CU         | `rev19-uic3-1p`                                                               |
| Gemini 3 Flash        | `gemini-3-flash`                                                              |
| Gemini 3 Pro Image    | `gemini-3-pro-image`                                                          |

---

## Arquivos Afetados

| Arquivo                                         | Ação                                        |
| ----------------------------------------------- | ------------------------------------------- |
| `src/lib/usage/parsers/antigravityDiscovery.js` | **NOVO** — Discovery dinâmico de modelos    |
| `src/lib/usage/fetcher.js`                      | Integrar discovery após parsing de `models` |
| `src/shared/constants/providers.js`             | Adicionar fallback display names            |

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/parsers/antigravity.parser.ts` (104 linhas)
- Extra IDs extraction: linhas 56-100
- Display name fallback: linhas 18-24
- Exclusion patterns: linha 15
