# Feature 121 — Non-Stream Keep-Alive

## Objetivo

Implementar mecanismo de keep-alive para requisições **não-streaming** que demoram para responder (modelos com thinking longo). Emitir sinais periódicos de que a conexão está ativa para evitar que proxies reversos (Cloudflare, Nginx, HAProxy) matem a conexão por idle timeout.

## Motivação

Enquanto o feature-115 cobre keep-alive para SSE streaming, requisições non-streaming (ex: `stream: false`) também sofrem com idle timeouts. Modelos como Claude Opus 4.6 ou GPT-5.2 com `xhigh` reasoning podem levar 60+ segundos "pensando" antes de responder. Cloudflare mata conexões idle após 100s por default. O CLIProxyAPI implementa `nonstream-keepalive-interval` para emitir blank lines periodicamente.

## O que Ganhamos

- **Resiliência**: Requisições non-stream não morrem durante thinking longo
- **Compatibilidade**: Funciona atrás de CDNs e load balancers com idle timeout
- **Transparência**: Blank lines são ignoradas pelo parser JSON do client

## Situação Atual (Antes)

```
POST /v1/chat/completions { stream: false }
  t=0:  Request enviada
  t=45s: Modelo "pensando" (Claude Opus, xhigh)
  t=100s: Cloudflare mata conexão (idle timeout)
  → HTTP 524 (Connection Timed Out)
```

## Situação Proposta (Depois)

```
POST /v1/chat/completions { stream: false }
  t=0:  Request enviada
  t=15s: Proxy envia "\n" (blank line)
  t=30s: Proxy envia "\n" (blank line)
  t=45s: Proxy envia "\n" (blank line)
  t=50s: Modelo responde com JSON completo
  → Client ignora blank lines, parse JSON → sucesso ✓
```

## Especificação Técnica

### Configuração

```env
# Non-stream keep-alive interval (seconds, 0 = disabled)
NONSTREAM_KEEPALIVE_INTERVAL=15
```

### Implementação

```javascript
// src/lib/streaming/nonStreamKeepAlive.js

export class NonStreamKeepAlive {
  constructor(res, intervalSeconds = 15) {
    this.res = res;
    this.intervalMs = intervalSeconds * 1000;
    this.timer = null;
    this.headersSent = false;
  }

  start() {
    if (this.intervalMs <= 0) return;

    this.timer = setInterval(() => {
      if (!this.res.writableEnded) {
        // Enviar blank line para manter conexão ativa
        // A maioria dos parsers JSON ignora whitespace antes do body
        this.res.write("\n");
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
  }
}
```

### Integração

```javascript
// src/sse/handlers/chat.js — para requisições non-streaming

if (!stream) {
  const keepAlive = new NonStreamKeepAlive(res, config.nonstreamKeepAliveInterval || 15);
  keepAlive.start();
  try {
    const result = await fetchFromUpstream(url, options);
    keepAlive.stop();
    res.json(result);
  } catch (err) {
    keepAlive.stop();
    throw err;
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                                   | Ação                                         |
| ----------------------------------------- | -------------------------------------------- |
| `src/lib/streaming/nonStreamKeepAlive.js` | **NOVO** — Keep-alive non-stream             |
| `src/sse/handlers/chat.js`                | **MODIFICAR** — Integrar para non-stream     |
| `.env.example`                            | **MODIFICAR** — NONSTREAM_KEEPALIVE_INTERVAL |

## Critérios de Aceite

- [ ] Blank lines emitidas a cada N segundos durante requisições non-stream
- [ ] Keep-alive para quando o upstream responde
- [ ] Blank lines são ignoradas pelo client (JSON parse OK)
- [ ] Configurável via ENV (0 = disabled)
- [ ] Não interfere com SSE streaming keep-alive (feature separada)

## Referência

- [CLIProxyAPI: config.example.yaml linhas 73-74](https://github.com/router-for-me/CLIProxyAPI) — `nonstream-keepalive-interval`
