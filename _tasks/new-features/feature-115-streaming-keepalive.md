# Feature 08 — Streaming Keep-Alive e Bootstrap Retries

## Resumo

Implementar dois mecanismos de resiliência para conexões streaming:

1. **SSE Keep-Alive**: Emissão periódica de blank lines/comments durante streaming para prevenir idle timeouts de proxies e load balancers
2. **Bootstrap Retries**: Retry automático caso o primeiro byte de uma resposta streaming não chegue dentro do timeout, sem que o cliente perceba

## Motivação

Em ambientes com proxies reversos (Cloudflare, Nginx, HAProxy) e NATs, conexões idle são frequentemente terminadas após 30-60 segundos. Modelos com thinking longo (Claude Opus, GPT-5.2) podem levar 30+ segundos para começar a responder, causando timeout antes do primeiro token. O keep-alive previne isso; o bootstrap retry recupera automaticamente.

## O que ganhamos

- **Resiliência**: Conexões não morrem durante thinking longo
- **Transparência**: Cliente não percebe retries
- **Compatibilidade**: Funciona atrás de qualquer proxy/CDN com idle timeout
- **Non-stream support**: Keep-alive para requisições non-streaming que demoram

## Situação Atual (Antes)

```
Cliente ← SSE → Proxy ← → Provider
         t=0: Request enviada
         t=30s: Provider ainda "pensando"
         t=30s: Cloudflare mata conexão (idle timeout)
         → Erro 524 para o cliente
```

## Situação Proposta (Depois)

```
Cliente ← SSE → Proxy ← → Provider
         t=0: Request enviada
         t=15s: Proxy envia SSE comment ":keepalive\n\n"
         t=30s: Proxy envia SSE comment ":keepalive\n\n"
         t=35s: Provider começa a responder
         → Conexão mantida, resposta entregue com sucesso
```

```
Bootstrap retry:
         t=0: Request enviada ao Provider A
         t=20s: Timeout sem primeiro byte (bootstrap-timeout)
         t=20s: Retry automático para Provider B (se round-robin)
         t=22s: Provider B responde
         → Cliente nem percebeu o retry
```

## Especificação Técnica

### SSE Keep-Alive

```javascript
// src/lib/streaming/keepAlive.js

export class SSEKeepAlive {
  constructor(res, intervalSeconds = 15) {
    this.res = res;
    this.intervalMs = intervalSeconds * 1000;
    this.timer = null;
    this.active = false;
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.timer = setInterval(() => {
      if (!this.res.writableEnded) {
        // SSE comment — clientes SSE ignoram linhas começando com ":"
        this.res.write(":keepalive\n\n");
      } else {
        this.stop();
      }
    }, this.intervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.active = false;
  }
}
```

### Non-Stream Keep-Alive

```javascript
// Para requisições non-streaming que demoram (e.g., thinking models)
export class NonStreamKeepAlive {
  constructor(res, intervalSeconds = 15) {
    this.res = res;
    this.intervalMs = intervalSeconds * 1000;
    this.timer = null;
  }

  start() {
    this.timer = setInterval(() => {
      if (!this.res.headersSent && !this.res.writableEnded) {
        // Enviar header parcial para manter conexão ativa
        // Nota: isso é um hack, funciona com alguns proxies
        this.res.writeHead(100); // 100 Continue
      }
    }, this.intervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
```

### Bootstrap Retries

```javascript
// src/lib/streaming/bootstrapRetry.js

export async function fetchWithBootstrapRetry(fetchFn, options = {}) {
  const maxRetries = options.bootstrapRetries || 1;
  const bootstrapTimeout = options.bootstrapTimeoutMs || 20000; // 20s default

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), bootstrapTimeout);

    try {
      const response = await fetchFn({ signal: controller.signal });
      clearTimeout(timeoutId);

      // Verificar se temos o primeiro byte dentro do timeout
      const reader = response.body.getReader();
      const firstChunkPromise = reader.read();

      const firstChunk = await Promise.race([
        firstChunkPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Bootstrap timeout")), bootstrapTimeout)
        ),
      ]);

      if (firstChunk.done) {
        throw new Error("Stream ended without data");
      }

      // Sucesso! Retornar stream com primeiro chunk já consumido
      return {
        response,
        firstChunk: firstChunk.value,
        reader,
        attempts: attempt + 1,
      };
    } catch (err) {
      clearTimeout(timeoutId);

      if (attempt < maxRetries) {
        console.log(`Bootstrap retry ${attempt + 1}/${maxRetries} for streaming request`);
        continue;
      }
      throw err;
    }
  }
}
```

### Configuração

```env
# SSE Keep-Alive interval (seconds, 0 = disabled)
SSE_KEEPALIVE_INTERVAL=15

# Non-stream keep-alive interval (seconds, 0 = disabled)
NONSTREAM_KEEPALIVE_INTERVAL=15

# Bootstrap retry settings
STREAMING_BOOTSTRAP_RETRIES=1
STREAMING_BOOTSTRAP_TIMEOUT_MS=20000
```

### Integração no Fluxo SSE

```javascript
// src/sse/handlers/chat.js

const keepAlive = new SSEKeepAlive(res, config.sseKeepAlive || 15);
keepAlive.start(); // Começar keep-alive ANTES de enviar ao upstream

try {
  const result = await fetchWithBootstrapRetry(
    (opts) => proxyFetch(upstreamUrl, { ...requestOptions, ...opts }),
    { bootstrapRetries: 1, bootstrapTimeoutMs: 20000 }
  );

  // Enviar primeiro chunk e continuar streaming
  res.write(result.firstChunk);
  // ... pipe restante do stream
} finally {
  keepAlive.stop();
}
```

## Arquivos a Criar/Modificar

| Arquivo                               | Ação                                        |
| ------------------------------------- | ------------------------------------------- |
| `src/lib/streaming/keepAlive.js`      | **NOVO** — SSE + Non-stream keep-alive      |
| `src/lib/streaming/bootstrapRetry.js` | **NOVO** — Bootstrap retry logic            |
| `src/sse/handlers/chat.js`            | **MODIFICAR** — Integrar keep-alive e retry |
| `.env.example`                        | **MODIFICAR** — Adicionar variáveis         |

## Critérios de Aceite

- [ ] SSE comments `:keepalive` emitidas a cada N segundos durante streaming
- [ ] Keep-alive para quando o upstream começa a responder
- [ ] Non-stream keep-alive mantém conexão viva para modelos lentos
- [ ] Bootstrap retry tenta novamente se primeiro byte não chega no timeout
- [ ] Cliente não percebe o retry (transparent)
- [ ] Log mostra quando retry aconteceu e quantas tentativas
- [ ] Configurável via ENV variables

## Referência

- [ProxyPilot: config.example.yaml linhas 71-74](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (streaming / nonstream-keepalive)
