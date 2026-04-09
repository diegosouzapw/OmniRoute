# Feature 04 — Payload Manipulation Rules

## Resumo

Implementar um sistema de regras configuráveis que manipulam o payload das requisições antes de enviá-las ao upstream. São 4 tipos de regras: **default** (set se ausente), **override** (sempre sobrescreve), **filter** (remove campos) e **default-raw** (JSON bruto). As regras são aplicadas por modelo com suporte a wildcards e por protocolo.

## Motivação

Diferentes providers e modelos esperam parâmetros diferentes. Hoje, se um cliente envia um payload com `thinking_budget` para um modelo que não suporta, o upstream retorna erro. Se um modelo precisa de um parâmetro específico que o cliente não envia (e.g., `reasoning.effort: "high"` para GPT), o proxy não injeta. Essas incompatibilidades geram erros e degradam a experiência.

## O que ganhamos

- **Compatibilidade automática**: Payloads são ajustados para cada provider sem intervenção do cliente
- **Configuração sem código**: Admins podem adicionar regras via config sem deploy
- **Segurança**: Campos sensíveis podem ser removidos antes de enviar ao upstream
- **Performance**: Budgets default podem ser injetados para otimizar custo
- **Flexibilidade**: Wildcards permitem regras para famílias de modelos

## Situação Atual (Antes)

```
Cliente envia payload com campo incompatível com o modelo
→ Upstream retorna erro 400
→ Cliente precisa saber a API spec de cada provider
→ Tratamento manual case-a-case no código
```

## Situação Proposta (Depois)

```
Cliente envia payload qualquer
→ Proxy aplica regras de default/override/filter
→ Payload é normalizado para o provider alvo
→ Upstream recebe payload válido → sucesso
```

## Especificação Técnica

### Tipos de Regras

```javascript
// src/lib/payload/payloadRules.js

/**
 * 4 tipos de regras:
 *
 * 1. DEFAULT: Set o campo apenas se ele não existir no payload
 *    Uso: garantir que modelos tenham thinking budget mínimo
 *
 * 2. OVERRIDE: Sempre sobrescreve o campo, mesmo se já existir
 *    Uso: forçar reasoning effort em modelos específicos
 *
 * 3. FILTER: Remove campos do payload
 *    Uso: remover campos incompatíveis com certos providers
 *
 * 4. DEFAULT_RAW: Como default, mas o valor é JSON bruto
 *    Uso: injetar objetos complexos como response_format
 */
```

### Configuração

```json
// config/payloadRules.json ou via ENV

{
  "default": [
    {
      "models": [{ "name": "gemini-2.5-pro", "protocol": "gemini" }],
      "params": {
        "generationConfig.thinkingConfig.thinkingBudget": 32768
      }
    }
  ],
  "override": [
    {
      "models": [{ "name": "gpt-*", "protocol": "codex" }],
      "params": {
        "reasoning.effort": "high"
      }
    }
  ],
  "filter": [
    {
      "models": [{ "name": "gemini-2.5-flash-lite" }],
      "params": ["generationConfig.thinkingConfig", "generationConfig.responseJsonSchema"]
    }
  ]
}
```

### Engine de Aplicação de Regras

```javascript
// src/lib/payload/applyPayloadRules.js

import { get, set, unset } from "lodash-es"; // ou implementação própria de dot-notation

export function applyPayloadRules(payload, model, protocol, rules) {
  const applied = [];

  // 1. Default rules: set apenas se ausente
  for (const rule of rules.default || []) {
    if (!matchesModel(model, protocol, rule.models)) continue;
    for (const [path, value] of Object.entries(rule.params)) {
      if (get(payload, path) === undefined) {
        set(payload, path, value);
        applied.push({ type: "default", path, value });
      }
    }
  }

  // 2. Override rules: sempre sobrescreve
  for (const rule of rules.override || []) {
    if (!matchesModel(model, protocol, rule.models)) continue;
    for (const [path, value] of Object.entries(rule.params)) {
      set(payload, path, value);
      applied.push({ type: "override", path, value });
    }
  }

  // 3. Filter rules: remove campos
  for (const rule of rules.filter || []) {
    if (!matchesModel(model, protocol, rule.models)) continue;
    for (const path of rule.params) {
      if (get(payload, path) !== undefined) {
        unset(payload, path);
        applied.push({ type: "filter", path });
      }
    }
  }

  return { payload, applied };
}
```

### Wildcard Matching para Modelos

```javascript
function matchesModel(model, protocol, modelSpecs) {
  return modelSpecs.some((spec) => {
    // Checar protocolo se especificado
    if (spec.protocol && spec.protocol !== protocol) return false;
    // Wildcard matching
    return wildcardMatch(spec.name, model);
  });
}

function wildcardMatch(pattern, str) {
  if (pattern === "*") return true;
  if (pattern.startsWith("*") && pattern.endsWith("*")) {
    return str.includes(pattern.slice(1, -1));
  }
  if (pattern.startsWith("*")) {
    return str.endsWith(pattern.slice(1));
  }
  if (pattern.endsWith("*")) {
    return str.startsWith(pattern.slice(0, -1));
  }
  return pattern === str;
}
```

### Integração no Fluxo

```javascript
// No handler SSE, antes de enviar ao executor:
import { applyPayloadRules } from "../lib/payload/applyPayloadRules.js";

const { payload: adjustedPayload, applied } = applyPayloadRules(
  payload,
  model,
  providerFormat,
  payloadRules
);

if (applied.length > 0) {
  logger.debug(`Payload rules applied for ${model}:`, applied);
}
```

## Arquivos a Criar/Modificar

| Arquivo                                | Ação                                        |
| -------------------------------------- | ------------------------------------------- |
| `src/lib/payload/payloadRules.js`      | **NOVO** — Tipos e loader de regras         |
| `src/lib/payload/applyPayloadRules.js` | **NOVO** — Engine de aplicação              |
| `config/payloadRules.json`             | **NOVO** — Regras default do projeto        |
| `src/sse/handlers/chat.js`             | **MODIFICAR** — Integrar antes do executor  |
| `.env.example`                         | **MODIFICAR** — Path para arquivo de regras |

## Critérios de Aceite

- [ ] Regras `default` setam campos apenas quando ausentes
- [ ] Regras `override` sempre sobrescrevem
- [ ] Regras `filter` removem campos do payload
- [ ] Wildcards `gpt-*`, `*-thinking`, `*flash*` funcionam
- [ ] Protocolo pode ser filtrado (gemini, openai, claude, codex)
- [ ] Log de todas as regras aplicadas em modo debug
- [ ] Regras carregadas de arquivo JSON sem necessidade de deploy

## Referência

- [ProxyPilot: config.example.yaml linhas 281-313](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (payload section)
