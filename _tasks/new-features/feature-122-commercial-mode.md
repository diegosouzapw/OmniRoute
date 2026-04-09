# Feature 122 — Commercial Mode (Performance Optimization)

## Objetivo

Implementar flag `COMMERCIAL_MODE` que desabilita middlewares de alto overhead (logging detalhado de requests, body capture, debug profiling) para reduzir consumo de memória e CPU por request em cenários de alta concorrência.

## Motivação

Em setups com muitos usuários simultâneos (10+ credenciais, alto throughput), middlewares de logging que capturam body de requests e responses consomem memória significativa. O CLIProxyAPI implementa `commercial-mode: true` que desabilita automaticamente esses middlewares, reduzindo overhead drasticamente.

## O que Ganhamos

- **Performance**: -30-50% menos memória por request ativo
- **Throughput**: Mais requests simultâneos no mesmo hardware
- **Simplicidade**: Um flag controla todas as otimizações de produção
- **Custo**: Possível rodar em VPS menor para mesma carga

## Situação Atual (Antes)

```
Cada request:
  → Middleware logging: copia body inteiro em memória (~512KB-1MB per request)
  → Debug info: captura headers, timing, metadata
  → Request/Response logging: serialização JSON de tudo
  → Consumo: ~2-5MB por request ativo
  → 20 requests simultâneos = 40-100MB só de overhead
```

## Situação Proposta (Depois)

```
COMMERCIAL_MODE=true:
  → Middleware logging: minimal (path + status apenas)
  → Debug info: desabilitado
  → Body capture: desabilitado
  → Consumo: ~50KB por request ativo
  → 20 requests simultâneos = ~1MB de overhead
```

## Especificação Técnica

### Configuração

```env
# Performance optimization mode
COMMERCIAL_MODE=false  # Default: false (dev-friendly logging)
```

### O que é Afetado

| Componente            | Normal            | Commercial          |
| --------------------- | ----------------- | ------------------- |
| Request body logging  | ✅ Full body      | ❌ Disabled         |
| Response body logging | ✅ Full body      | ❌ Disabled         |
| Header logging        | ✅ All headers    | ⚠️ Key headers only |
| Timing per-middleware | ✅ All middleware | ❌ Disabled         |
| Debug endpoints       | ✅ Available      | ❌ Disabled         |
| Request ID tracking   | ✅ Available      | ✅ Available        |
| Error logging         | ✅ Available      | ✅ Available        |

### Implementação

```javascript
// src/middleware/commercialMode.js

const COMMERCIAL_MODE = process.env.COMMERCIAL_MODE === "true";

export function createLoggingMiddleware() {
  if (COMMERCIAL_MODE) {
    // Minimal logging: path + status only
    return (req, res, next) => {
      const start = Date.now();
      res.on("finish", () => {
        if (res.statusCode >= 400) {
          console.error(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`);
        }
      });
      next();
    };
  }

  // Full logging: body capture, headers, timing
  return (req, res, next) => {
    // ... existing detailed logging middleware
    next();
  };
}
```

```javascript
// src/middleware/index.js

import { COMMERCIAL_MODE } from "./commercialMode";

// Condicional: pular middlewares pesados em commercial mode
if (!COMMERCIAL_MODE) {
  app.use(requestBodyCapture); // Copia body para logging
  app.use(responseBodyCapture); // Intercepta response body
  app.use(debugTimingMiddleware); // Timing por middleware
}

// Sempre ativo (necessários para funcionamento)
app.use(errorHandler);
app.use(requestIdMiddleware);
app.use(authMiddleware);
```

## Arquivos a Criar/Modificar

| Arquivo                            | Ação                                 |
| ---------------------------------- | ------------------------------------ |
| `src/middleware/commercialMode.js` | **NOVO** — Flag e minimal middleware |
| `src/middleware/index.js`          | **MODIFICAR** — Condicional por mode |
| `open-sse/sse-server.js`           | **MODIFICAR** — Skip debug endpoints |
| `.env.example`                     | **MODIFICAR** — COMMERCIAL_MODE      |

## Critérios de Aceite

- [ ] `COMMERCIAL_MODE=true` desabilita body capture de requests/responses
- [ ] Logging minimal: apenas path + status + timing para erros
- [ ] Debug endpoints retornam 404 em commercial mode
- [ ] Error logging e request ID tracking sempre ativos
- [ ] Redução mensurável de memória por request (~50%+)

## Referência

- [CLIProxyAPI: config.example.yaml linha 67](https://github.com/router-for-me/CLIProxyAPI) — `commercial-mode: true`
