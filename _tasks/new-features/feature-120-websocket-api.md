# Feature 120 — WebSocket API Endpoint

## Objetivo

Implementar endpoint WebSocket (`/v1/ws`) para comunicação bidirecional entre clients e o proxy, com autenticação condicional. Permite streaming real-time de tokens, notificações de status, e comandos de controle sem overhead de HTTP por request.

## Motivação

O protocolo SSE (Server-Sent Events) é unidirecional — o servidor envia, o client recebe. Para cenários como:

- Cancelar uma geração em andamento
- Receber notificações de mudança de status (quota, model availability)
- Enviar múltiplas requisições na mesma conexão (multiplexing)
- Dashboard live updates sem polling

WebSocket é necessário. O CLIProxyAPI implementa `/v1/ws` com auth condicional (toggle via config) e o OmniRoute não possui WS algum no lado proxy.

## O que Ganhamos

- **Cancelamento real-time**: Client pode abortar geração sem fechar conexão
- **Multiplexing**: Múltiplas conversas na mesma conexão
- **Live notifications**: Dashboard recebe updates de modelo/quota sem polling
- **Latência**: Sem overhead de HTTP handshake por request
- **Compatibilidade**: Ferramentas CLI modernas preferem WebSocket

## Situação Atual (Antes)

```
Client → POST /v1/chat/completions → SSE stream unidirecional
  → Para cancelar: fechar conexão HTTP inteira
  → Para segunda requisição: novo HTTP handshake
  → Dashboard: polling GET /api/status a cada 5s
```

## Situação Proposta (Depois)

```
Client → WS CONNECT /v1/ws → Bidirectional
  → Enviar: { type: "chat", model: "...", messages: [...] }
  → Receber: { type: "token", content: "Hello" }
  → Enviar: { type: "cancel", requestId: "abc" }
  → Receber: { type: "cancelled", requestId: "abc" }
  → Enviar: { type: "chat", model: "...", messages: [...] }  ← Mesma conexão
```

## Especificação Técnica

### Configuração

```env
# WebSocket API
WS_ENABLED=true
WS_AUTH_REQUIRED=true    # Se false, qualquer conexão é aceita
WS_PATH=/v1/ws
WS_HEARTBEAT_INTERVAL=30   # Ping/pong interval
```

### Protocolo de Mensagens

```typescript
// Mensagens Client → Server
type ClientMessage =
  | { type: "chat"; requestId: string; model: string; messages: Message[]; stream?: boolean }
  | { type: "cancel"; requestId: string }
  | { type: "subscribe"; channel: "models" | "status" | "usage" }
  | { type: "ping" };

// Mensagens Server → Client
type ServerMessage =
  | { type: "token"; requestId: string; content: string; role: string }
  | { type: "done"; requestId: string; usage: Usage }
  | { type: "error"; requestId: string; error: { message: string; code: string } }
  | { type: "cancelled"; requestId: string }
  | { type: "notification"; channel: string; data: any }
  | { type: "pong" };
```

### Implementação Base

```javascript
// src/api/routes/websocket.js
import { WebSocketServer } from "ws";

export function setupWebSocket(server, config) {
  const wss = new WebSocketServer({
    server,
    path: config.wsPath || "/v1/ws",
  });

  wss.on("connection", async (ws, req) => {
    // Auth condicional
    if (config.wsAuthRequired) {
      const token = extractToken(req);
      if (!(await validateToken(token))) {
        ws.close(4001, "Unauthorized");
        return;
      }
    }

    const client = new WSClient(ws);

    ws.on("message", (data) => {
      const msg = JSON.parse(data);
      switch (msg.type) {
        case "chat":
          client.handleChat(msg);
          break;
        case "cancel":
          client.handleCancel(msg);
          break;
        case "subscribe":
          client.handleSubscribe(msg);
          break;
        case "ping":
          ws.send(JSON.stringify({ type: "pong" }));
          break;
      }
    });

    ws.on("close", () => client.cleanup());
  });

  // Heartbeat
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, config.heartbeatInterval);
}
```

## Arquivos a Criar/Modificar

| Arquivo                       | Ação                                    |
| ----------------------------- | --------------------------------------- |
| `src/api/routes/websocket.js` | **NOVO** — WebSocket server             |
| `src/api/routes/wsClient.js`  | **NOVO** — Gerenciamento de client WS   |
| `open-sse/sse-server.js`      | **MODIFICAR** — Upgrade handler para WS |
| `.env.example`                | **MODIFICAR** — Variáveis WS            |

## Critérios de Aceite

- [ ] Conexão WS estabelecida em `/v1/ws`
- [ ] Auth condicional funciona (toggle via env)
- [ ] Chat messages são processadas como streaming
- [ ] Cancel aborta a geração em andamento
- [ ] Subscribe recebe notificações de modelo/status
- [ ] Heartbeat mantém conexão viva
- [ ] Múltiplas requisições paralelas na mesma conexão

## Referência

- [CLIProxyAPI: internal/api/server.go](https://github.com/router-for-me/CLIProxyAPI) — WebSocket route setup
