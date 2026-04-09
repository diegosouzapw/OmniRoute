# Feature 06 — Model Exclusion com Wildcards

## Resumo

Implementar exclusão de modelos com suporte a wildcards, tanto por canal OAuth (global) quanto por credencial individual. Modelos excluídos são removidos da listagem e rejeitados se requisitados diretamente.

## Motivação

Nem todos os modelos devem estar disponíveis para todos os usuários ou todas as credenciais. Exemplos:

- Credencial com quota limitada não deve expor modelos caros (Opus, GPT-5.2)
- Modelos preview instáveis devem ser excluídos de produção
- Modelos com quota excedida em uma credencial devem ser removidos dela
- Admin pode querer limitar acesso sem alterar código

## O que ganhamos

- **Controle granular**: Excluir por modelo exato, prefixo, sufixo ou substring
- **Per-credential**: Cada API key pode ter sua própria lista de exclusão
- **Per-channel**: Cada canal OAuth pode excluir modelos globalmente
- **Segurança**: Previne acesso a modelos não autorizados
- **Economia**: Evita gastos em modelos premium desnecessários

## Situação Atual (Antes)

```
Credencial A: quota ilimitada → expõe TODOS os modelos
Credencial B: quota limitada  → expõe TODOS os modelos (mesmo que o user não possa usar)
→ User tenta usar claude-opus via Credencial B
→ Erro de quota → experiência ruim
```

## Situação Proposta (Depois)

```
Credencial A: quota ilimitada → expõe todos os modelos
Credencial B: excluded: ["claude-opus-*", "*-preview"]
→ claude-opus-4-6 → excluído ✗
→ gemini-3-pro-preview → excluído ✗
→ claude-sonnet-4-5 → disponível ✓
→ gemini-2.5-flash → disponível ✓
```

## Especificação Técnica

### Wildcards Suportados

| Pattern           | Match     | Exemplo                                      |
| ----------------- | --------- | -------------------------------------------- |
| `gemini-2.5-*`    | Prefixo   | gemini-2.5-pro, gemini-2.5-flash             |
| `*-preview`       | Sufixo    | gemini-3-pro-preview, gemini-3-flash-preview |
| `*flash*`         | Substring | gemini-2.5-flash, gemini-2.5-flash-lite      |
| `claude-opus-4-6` | Exato     | claude-opus-4-6 apenas                       |

### Implementação do Wildcard Matcher

```javascript
// src/lib/models/wildcardMatcher.js

/**
 * Matches a model ID against a wildcard pattern.
 * Supports: prefix*, *suffix, *substring*, exact
 */
export function wildcardMatch(pattern, model) {
  if (!pattern || !model) return false;

  // Caso exato (sem wildcard)
  if (!pattern.includes("*")) return pattern === model;

  // *substring* — contém substring
  if (pattern.startsWith("*") && pattern.endsWith("*")) {
    const sub = pattern.slice(1, -1);
    return sub.length > 0 && model.includes(sub);
  }

  // *suffix — termina com
  if (pattern.startsWith("*")) {
    return model.endsWith(pattern.slice(1));
  }

  // prefix* — começa com
  if (pattern.endsWith("*")) {
    return model.startsWith(pattern.slice(0, -1));
  }

  return pattern === model;
}

/**
 * Checks if a model is excluded by any pattern in the list.
 */
export function isModelExcluded(modelId, excludePatterns) {
  if (!excludePatterns || excludePatterns.length === 0) return false;
  return excludePatterns.some((pattern) => wildcardMatch(pattern, modelId));
}
```

### Configuração por Canal e por Credencial

```json
// config/excludedModels.json

{
  "perChannel": {
    "gemini-cli": ["*-preview", "gemini-3-pro-image-preview"],
    "antigravity": ["gpt-oss-*"],
    "codex": ["gpt-5-codex-mini"]
  },
  "perCredential": {
    "credential-key-hash-1": ["claude-opus-*", "*preview*"],
    "credential-key-hash-2": ["*"]
  }
}
```

### Integração no Roteamento

```javascript
// src/sse/services/model.js — na listagem de modelos

import { isModelExcluded } from "../lib/models/wildcardMatcher.js";

function getAvailableModels(channel, credentialId) {
  const allModels = getProviderModels(channel);
  const channelExclusions = config.perChannel?.[channel] || [];
  const credentialExclusions = config.perCredential?.[credentialId] || [];
  const allExclusions = [...channelExclusions, ...credentialExclusions];

  return allModels.filter((m) => !isModelExcluded(m.id, allExclusions));
}
```

```javascript
// src/sse/handlers/chat.js — validar na requisição

if (isModelExcluded(requestedModel, allExclusions)) {
  return res.status(404).json({
    error: {
      message: `Model "${requestedModel}" is not available for this credential`,
      type: "model_not_found",
      code: "model_excluded",
    },
  });
}
```

## Arquivos a Criar/Modificar

| Arquivo                              | Ação                                  |
| ------------------------------------ | ------------------------------------- |
| `src/lib/models/wildcardMatcher.js`  | **NOVO** — Wildcard matching          |
| `config/excludedModels.json`         | **NOVO** — Configuração de exclusões  |
| `src/sse/services/model.js`          | **MODIFICAR** — Filtrar na listagem   |
| `src/sse/handlers/chat.js`           | **MODIFICAR** — Validar na requisição |
| `tests/unit/wildcardMatcher.test.js` | **NOVO** — Testes unitários           |

## Critérios de Aceite

- [ ] Wildcard `prefix*` exclui modelos que começam com o prefixo
- [ ] Wildcard `*suffix` exclui modelos que terminam com o sufixo
- [ ] Wildcard `*substring*` exclui modelos que contêm a substring
- [ ] Match exato (sem wildcard) exclui apenas o modelo específico
- [ ] Exclusões por canal são aplicadas a todos os users daquele canal
- [ ] Exclusões por credencial são aplicadas apenas àquela credencial
- [ ] `/v1/models` não lista modelos excluídos
- [ ] Requisição para modelo excluído retorna 404 com mensagem clara
- [ ] Testes unitários cobrem todos os padrões de wildcard

## Referência

- [ProxyPilot: config.example.yaml linhas 257-279](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (oauth-excluded-models)
- [ProxyPilot: config.example.yaml linhas 108-111](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (per-key excluded-models)
