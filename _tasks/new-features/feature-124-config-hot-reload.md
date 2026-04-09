# Feature 124 — Config Hot-Reload com Diff Detection

## Objetivo

Implementar hot-reload de configuração que detecta changes via diff YAML, aplica mudanças incrementalmente sem restart do servidor, e preserva comentários YAML ao salvar alterações via Management API.

## Motivação

Atualmente qualquer mudança de configuração no OmniRoute requer restart do processo. Em produção com múltiplas credenciais e requests ativos, isso causa downtime. O CLIProxyAPI implementa hot-reload que:

1. Detecta mudanças via snapshot YAML serializado
2. Aplica incrementalmente (só o que mudou)
3. Preserva comentários no YAML ao salvar via API

## O que Ganhamos

- **Zero-downtime config**: Mudar credenciais, routing, etc sem restart
- **Preservação**: Comentários YAML mantidos após edição via dashboard
- **Incremental**: Apenas componentes afetados são recarregados
- **Segurança**: Config salva apenas quando diff é detectado

## Situação Atual (Antes)

```
Admin muda configuração → Restart necessário → 2-5s downtime
  → Requests em andamento podem ser perdidos
  → OAuth tokens em memória são invalidados
  → Connections SSE ativas são cortadas
```

## Situação Proposta (Depois)

```
Admin muda configuração → Hot-reload detecta diff → Aplica incrementalmente
  → Requests em andamento continuam normalmente
  → Novas requisições usam nova config
  → Zero downtime, zero perda de conexões
```

## Especificação Técnica

### Watcher de Arquivo

```javascript
// src/lib/config/configWatcher.js
import fs from "node:fs";
import { EventEmitter } from "node:events";

export class ConfigWatcher extends EventEmitter {
  constructor(configPath, intervalMs = 5000) {
    super();
    this.configPath = configPath;
    this.lastSnapshot = null;
    this.interval = null;
    this.intervalMs = intervalMs;
  }

  start() {
    this.lastSnapshot = this.takeSnapshot();
    this.interval = setInterval(() => this.check(), this.intervalMs);
    // Also watch for file changes
    this.fsWatcher = fs.watch(this.configPath, () => this.check());
  }

  check() {
    const current = this.takeSnapshot();
    if (current !== this.lastSnapshot) {
      this.lastSnapshot = current;
      this.emit("changed", this.configPath);
    }
  }

  takeSnapshot() {
    try {
      return fs.readFileSync(this.configPath, "utf8");
    } catch {
      return null;
    }
  }

  stop() {
    clearInterval(this.interval);
    this.fsWatcher?.close();
  }
}
```

### Aplicação Incremental

```javascript
// src/lib/config/configReloader.js

export function applyConfigDiff(oldConfig, newConfig) {
  const changes = [];

  // Detectar mudanças em credenciais
  if (JSON.stringify(oldConfig.credentials) !== JSON.stringify(newConfig.credentials)) {
    changes.push({ section: "credentials", action: "reload" });
    reloadCredentials(newConfig.credentials);
  }

  // Detectar mudanças em routing
  if (oldConfig.routing?.strategy !== newConfig.routing?.strategy) {
    changes.push({ section: "routing", action: "update" });
    updateRoutingStrategy(newConfig.routing);
  }

  // Detectar mudanças em payload rules
  if (JSON.stringify(oldConfig.payloadRules) !== JSON.stringify(newConfig.payloadRules)) {
    changes.push({ section: "payloadRules", action: "reload" });
    reloadPayloadRules(newConfig.payloadRules);
  }

  return changes;
}
```

### Preservação de Comentários YAML

```javascript
// src/lib/config/yamlPreserver.js

/**
 * Atualiza valores em YAML preservando comentários.
 * Usa regex line-by-line para substituir valores sem perder comments.
 */
export function updateYamlPreservingComments(yamlContent, updates) {
  let result = yamlContent;
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^(\\s*${key}\\s*:\\s*)(.+)$`, "m");
    result = result.replace(regex, `$1${JSON.stringify(value)}`);
  }
  return result;
}
```

## Arquivos a Criar/Modificar

| Arquivo                            | Ação                             |
| ---------------------------------- | -------------------------------- |
| `src/lib/config/configWatcher.js`  | **NOVO** — File watcher com diff |
| `src/lib/config/configReloader.js` | **NOVO** — Aplicação incremental |
| `src/lib/config/yamlPreserver.js`  | **NOVO** — YAML com comentários  |
| `open-sse/sse-server.js`           | **MODIFICAR** — Iniciar watcher  |

## Critérios de Aceite

- [ ] Mudanças em config são detectadas automaticamente (file watch + polling fallback)
- [ ] Credenciais são recarregadas sem restart
- [ ] Routing strategy pode ser mudada on-the-fly
- [ ] Comentários YAML são preservados após salvar via API
- [ ] Log indica quais seções foram recarregadas
- [ ] Requests em andamento não são afetados

## Referência

- [CLIProxyAPI: internal/config/config.go](https://github.com/router-for-me/CLIProxyAPI) — Hot-reload com sanitization
- [CLIProxyAPI: internal/api/server.go](https://github.com/router-for-me/CLIProxyAPI) — Config reload handler
