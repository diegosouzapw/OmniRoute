# Feature 01 — Response Cache (LRU + TTL)

## Resumo

Implementar um cache de respostas completas na camada de proxy, utilizando algoritmo LRU (Least Recently Used) com TTL (Time-To-Live) configurável. Respostas idênticas a requisições repetidas são servidas diretamente do cache sem acionar o provider upstream.

## Motivação

Durante o desenvolvimento, é extremamente comum que coding agents e IDEs façam requisições repetidas com o mesmo payload (e.g., re-análise do mesmo arquivo, autocomplete do mesmo contexto). Cada uma dessas requisições consome tokens pagos e adiciona latência de rede. No ProxyPilot, este cache reduziu em até 60% as chamadas upstream em cenários de desenvolvimento intensivo.

## O que ganhamos

- **Redução de custo**: Requisições repetidas são servidas gratuitamente do cache
- **Latência reduzida**: Respostas cacheadas são retornadas em <1ms vs 200ms-5s do upstream
- **Resiliência**: Se o provider estiver temporariamente down, respostas recentes podem ser servidas
- **Observabilidade**: Stats de hit/miss ratio para entender padrões de uso

## Situação Atual (Antes)

```
Cliente → OmniRoute Proxy → Provider API (sempre)
                                ↓
                           Resposta (200ms-5s)
                                ↓
Cliente ← OmniRoute Proxy ← Provider API
```

- Toda requisição vai direto ao upstream, mesmo que idêntica à anterior
- Sem tracking de requisições duplicadas
- Custo total = custo por requisição × total de requisições (sem economia)

## Situação Proposta (Depois)

```
Cliente → OmniRoute Proxy → Cache Check
                               ├─ HIT  → Resposta imediata (<1ms)
                               └─ MISS → Provider API → Armazenar no Cache → Resposta
```

- Requisições idênticas servidas do cache
- Dashboard mostra hit/miss ratio e economia estimada
- Configuração granular por modelo e TTL

## Especificação Técnica

### Estrutura do Cache

```javascript
// src/lib/cache/responseCache.js

class ResponseCache {
  constructor(config) {
    this.maxSize = config.maxSize || 1000; // max entries
    this.maxBytes = config.maxBytes || 0; // 0 = sem limite
    this.ttlMs = (config.ttlSeconds || 300) * 1000; // 5 min default
    this.excludeModels = config.excludeModels || []; // wildcards
    this.entries = new Map(); // key → CachedResponse
    this.order = []; // LRU tracking
    this.stats = { hits: 0, misses: 0, evictions: 0, totalSaved: 0 };
    this.enabled = config.enabled || false;
  }
}
```

### Geração da Chave de Cache

A chave deve ser um hash SHA-256 baseado em:

- `model` — nome do modelo
- `messages` — array de mensagens (serializado)
- `temperature` — se especificado
- `max_tokens` — se especificado
- `tools` — se especificados

```javascript
generateKey(model, payload) {
  const keyParts = {
    model,
    messages: payload.messages,
    temperature: payload.temperature,
    max_tokens: payload.max_tokens,
    tools: payload.tools,
  };
  const hash = crypto.createHash('sha256')
    .update(JSON.stringify(keyParts))
    .digest('hex');
  return hash;
}
```

### Estrutura de Resposta Cacheada

```javascript
const CachedResponse = {
  response: Buffer, // corpo da resposta
  contentType: String, // 'application/json' ou 'text/event-stream'
  statusCode: Number, // HTTP status
  model: String, // modelo usado
  createdAt: Date, // timestamp de criação
  hitCount: Number, // quantas vezes foi servido do cache
  sizeBytes: Number, // tamanho em bytes
};
```

### Configuração via ENV / Config

```env
# .env
RESPONSE_CACHE_ENABLED=true
RESPONSE_CACHE_MAX_SIZE=1000
RESPONSE_CACHE_MAX_BYTES=0
RESPONSE_CACHE_TTL_SECONDS=300
RESPONSE_CACHE_EXCLUDE_MODELS=*-thinking,o1-*
```

### Management APIs

| Endpoint             | Método | Descrição                                   |
| -------------------- | ------ | ------------------------------------------- |
| `/api/cache/stats`   | GET    | Retorna hits, misses, tamanho, ratio        |
| `/api/cache/clear`   | POST   | Limpa todo o cache                          |
| `/api/cache/enabled` | PUT    | Toggle enable/disable `{ "enabled": true }` |
| `/api/cache/config`  | GET    | Retorna configuração atual                  |

### Exclusão de Modelos por Wildcard

Modelos de thinking e reasoning devem ser excluídos do cache pois suas respostas variam mesmo com inputs idênticos:

```javascript
const DEFAULT_EXCLUDED = [
  "*-thinking", // claude-*-thinking, kimi-k2-thinking
  "o1-*", // o1, o1-mini
  "deepseek-r*", // deepseek-r1, deepseek-reasoner
];
```

### Integração no Fluxo de Proxy

Adicionar como middleware ANTES do executor:

```javascript
// src/middleware/cacheMiddleware.js

export function cacheMiddleware(cache) {
  return async (req, res, next) => {
    if (!cache.enabled) return next();
    if (req.body?.stream) return next(); // skip streaming

    const cached = cache.get(req.body.model, req.body);
    if (cached) {
      res.set("Content-Type", cached.contentType);
      res.set("X-Cache", "HIT");
      res.status(cached.statusCode).send(cached.response);
      return;
    }

    // Interceptar resposta para cachear
    const originalSend = res.send;
    res.send = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(req.body.model, req.body, body, res.get("Content-Type"), res.statusCode);
      }
      res.set("X-Cache", "MISS");
      originalSend.call(this, body);
    };

    next();
  };
}
```

### Eviction Periódica

```javascript
// Executar a cada 60 segundos
setInterval(() => {
  cache.evictExpired();
}, 60_000);
```

## Arquivos a Criar/Modificar

| Arquivo                                       | Ação                                         |
| --------------------------------------------- | -------------------------------------------- |
| `src/lib/cache/responseCache.js`              | **NOVO** — Classe do cache                   |
| `src/lib/cache/index.js`                      | **NOVO** — Export do módulo                  |
| `src/middleware/cacheMiddleware.js`           | **NOVO** — Middleware Express                |
| `src/server-init.js`                          | **MODIFICAR** — Inicializar cache            |
| `src/app/(dashboard)/dashboard/cache/page.js` | **NOVO** — UI de cache stats                 |
| `.env.example`                                | **MODIFICAR** — Adicionar variáveis de cache |

## Critérios de Aceite

- [ ] Cache retorna resposta em <1ms para requisições duplicadas
- [ ] Header `X-Cache: HIT/MISS` presente em todas as respostas non-streaming
- [ ] Modelos excluídos por wildcard nunca são cacheados
- [ ] Stats endpoint retorna hits, misses, size e ratio
- [ ] Cache pode ser habilitado/desabilitado em runtime via API
- [ ] Eviction automática remove entries expiradas a cada 60s
- [ ] Dashboard mostra estatísticas visuais do cache

## Referência

- [ProxyPilot: internal/cache/response_cache.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/cache/response_cache.go) (572 linhas, Go)
