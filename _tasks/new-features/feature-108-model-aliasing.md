# Feature 05 — Model Aliasing por Canal OAuth

## Resumo

Implementar um sistema de aliasing de modelos que permite renomear model IDs por canal (provider OAuth). Um mesmo modelo upstream pode ter aliases diferentes para clientes diferentes, com opção de `fork` (manter original + adicionar alias como modelo extra).

## Motivação

Clientes como Claude Code, Codex CLI e Gemini CLI esperam model IDs específicos. Quando o proxy oferece modelos de providers alternativos (e.g., Claude via Antigravity), o model ID pode não corresponder ao que o cliente espera. Aliasing resolve isso transparentemente.

Exemplos práticos:

- Gemini CLI pede `gemini-2.5-pro` → alias `g2.5p` para digitação rápida
- Codex CLI pede `gpt-5` → pode ser mapeado para `gpt-5.2` (upgrade transparente)
- Antigravity expõe `gemini-3-pro-high` → alias `gemini-3-pro-preview` para compatibilidade

## O que ganhamos

- **Compatibilidade transparente**: Clientes funcionam sem ajuste de model IDs
- **Upgrade silencioso**: Redirecionar modelos antigos para versões mais novas
- **Nomes curtos**: Aliases concisos para uso em CLI (`cs4.5` → `claude-sonnet-4-5-20250929`)
- **Fork mode**: Manter modelo original E adicionar alias, sem perder compatibilidade

## Situação Atual (Antes)

```
Cliente pede: model "g2.5p"
→ Proxy não reconhece
→ Erro 404: model not found
→ Cliente precisa saber o ID exato de cada modelo
```

## Situação Proposta (Depois)

```
Cliente pede: model "g2.5p"
→ Proxy resolve alias: g2.5p → gemini-2.5-pro
→ Requisição enviada para gemini-2.5-pro
→ Resposta retornada com model_id original "g2.5p"
```

## Especificação Técnica

### Configuração de Aliases

```json
// config/modelAliases.json

{
  "gemini-cli": [
    { "name": "gemini-2.5-pro", "alias": "g2.5p", "fork": true },
    { "name": "gemini-2.5-flash", "alias": "g2.5f", "fork": true }
  ],
  "claude": [
    { "name": "claude-sonnet-4-5-20250929", "alias": "cs4.5" },
    { "name": "claude-opus-4-5-20251101", "alias": "co4.5" }
  ],
  "codex": [{ "name": "gpt-5.3-codex", "alias": "g5.3c" }],
  "antigravity": [{ "name": "gemini-3-pro-high", "alias": "gemini-3-pro-preview", "fork": true }]
}
```

### Resolução de Alias

```javascript
// src/lib/models/modelAlias.js

export class ModelAliasResolver {
  constructor(aliasConfig) {
    // Build lookup maps per channel
    this.aliasToName = new Map(); // channel:alias → upstream_name
    this.nameToAlias = new Map(); // channel:name → alias
    this.forkedAliases = new Set(); // aliases that keep original

    for (const [channel, aliases] of Object.entries(aliasConfig)) {
      for (const entry of aliases) {
        const key = `${channel}:${entry.alias}`;
        this.aliasToName.set(key, entry.name);
        this.nameToAlias.set(`${channel}:${entry.name}`, entry.alias);
        if (entry.fork) this.forkedAliases.add(key);
      }
    }
  }

  // Resolve alias to upstream model name
  resolve(channel, modelId) {
    const key = `${channel}:${modelId}`;
    return this.aliasToName.get(key) || modelId;
  }

  // Get alias for a model (for response rewriting)
  getAlias(channel, modelName) {
    return this.nameToAlias.get(`${channel}:${modelName}`) || modelName;
  }

  // Get model list including forked aliases
  getModelsForChannel(channel, baseModels) {
    const result = [...baseModels];
    const channelAliases = Object.entries(this.aliasToName.entries()).filter(([key]) =>
      key.startsWith(`${channel}:`)
    );

    for (const [key, upstreamName] of channelAliases) {
      const alias = key.split(":")[1];
      if (this.forkedAliases.has(key)) {
        // Fork: add alias as extra model without removing original
        result.push({ id: alias, name: `${upstreamName} (alias)`, aliasOf: upstreamName });
      }
    }
    return result;
  }
}
```

### Integração

```javascript
// No handler de modelos (/v1/models)
const models = aliasResolver.getModelsForChannel(channel, providerModels);

// No handler de chat - resolver alias antes de rotear
const resolvedModel = aliasResolver.resolve(channel, requestedModel);
// Enviar ao upstream com resolvedModel
// No response, rewrite model_id de volta para o alias
```

## Arquivos a Criar/Modificar

| Arquivo                        | Ação                                        |
| ------------------------------ | ------------------------------------------- |
| `src/lib/models/modelAlias.js` | **NOVO** — Resolver de aliases              |
| `config/modelAliases.json`     | **NOVO** — Configuração de aliases          |
| `src/sse/services/model.js`    | **MODIFICAR** — Incluir aliases na listagem |
| `src/sse/handlers/chat.js`     | **MODIFICAR** — Resolver aliases            |

## Critérios de Aceite

- [ ] Aliases são resolvidos transparentemente antes de rotear
- [ ] Fork mode adiciona alias como modelo extra sem remover original
- [ ] Resposta reescreve model_id para o alias original se aplicável
- [ ] `/v1/models` lista modelos com aliases quando fork=true
- [ ] Aliases são carregados de JSON sem necessidade de deploy
- [ ] Log mostra quando alias foi resolvido

## Referência

- [ProxyPilot: config.example.yaml linhas 222-255](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (oauth-model-alias section)
