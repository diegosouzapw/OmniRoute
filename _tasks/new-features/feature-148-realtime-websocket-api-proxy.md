# Feature 148 — Realtime WebSocket API Proxy

## Resumo

Implementar proxy WebSocket para a Realtime API da OpenAI e provedores compatíveis, permitindo sessões de áudio/voz em tempo real via streaming bidirecional. O proxy gerencia autenticação, routing e billing transparentemente.

## Motivação

O LiteLLM em `litellm/realtime_api/` suporta proxy WebSocket para a Realtime API da OpenAI (GPT-4o Realtime). Essa API permite conversas de voz em tempo real com latência ultra-baixa (~200ms). O OmniRoute não suporta WebSocket — apenas HTTP SSE. Com a expansão das APIs de voz e áudio, o suporte a WebSocket será cada vez mais relevante.

## O que ganhamos

- **Voz em tempo real**: Conversas com IA usando áudio streaming bidirecional
- **Novos use cases**: Assistentes de voz, tradução simultânea, call centers AI
- **Paridade de features**: Acompanhar a evolução das APIs multimodais
- **Proxy transparente**: Mesma autenticação OmniRoute para WebSocket

## Situação Atual (Antes)

```
Cliente quer usar OpenAI Realtime API:
  → Precisa conectar diretamente ao wss://api.openai.com/v1/realtime
  → Exposição da API key do OpenAI
  → Sem routing ou fallback via OmniRoute
  → Sem tracking de custo
```

## Situação Proposta (Depois)

```
Cliente conecta via WebSocket:
  ws://omniroute-host/v1/realtime?model=gpt-4o-realtime

  → OmniRoute autentica (JWT header)
  → Resolve provider via combo (ex: openai API key)
  → Abre WebSocket upstream para OpenAI
  → Proxia mensagens bidirecionalmente
  → Rastreia duração e custo da sessão
  → Suporta fallback se provider cair
```

## Especificação Técnica

### WebSocket Proxy Server

```javascript
// src/lib/realtime/wsProxy.js

import { WebSocketServer, WebSocket } from "ws";

export class RealtimeProxy {
  constructor(server, options = {}) {
    this.wss = new WebSocketServer({
      server,
      path: "/v1/realtime",
    });

    this.wss.on("connection", (clientWs, req) => this._handleConnection(clientWs, req));
  }

  async _handleConnection(clientWs, req) {
    try {
      // 1. Autenticar
      const auth = await this._authenticate(req);
      if (!auth.valid) {
        clientWs.close(4001, "Unauthorized");
        return;
      }

      // 2. Resolver provider e modelo
      const model =
        new URL(req.url, "http://localhost").searchParams.get("model") || "gpt-4o-realtime";
      const route = await this._resolveRoute(model, auth);

      // 3. Conectar ao upstream
      const upstreamUrl = this._getUpstreamWsUrl(route);
      const upstreamWs = new WebSocket(upstreamUrl, {
        headers: {
          Authorization: `Bearer ${route.apiKey}`,
          "OpenAI-Beta": "realtime=v1",
        },
      });

      // 4. Session tracking
      const session = {
        id: `rt_${Date.now()}`,
        startTime: Date.now(),
        model,
        provider: route.provider,
        apiKeyId: auth.keyId,
        messagesIn: 0,
        messagesOut: 0,
      };

      // 5. Proxy bidirecional
      upstreamWs.on("open", () => {
        // Client → Upstream
        clientWs.on("message", (data) => {
          if (upstreamWs.readyState === WebSocket.OPEN) {
            upstreamWs.send(data);
            session.messagesIn++;
          }
        });

        // Upstream → Client
        upstreamWs.on("message", (data) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(data);
            session.messagesOut++;
          }
        });
      });

      // 6. Cleanup
      const cleanup = () => {
        const duration = Date.now() - session.startTime;
        this._recordSession(session, duration);

        if (clientWs.readyState === WebSocket.OPEN) clientWs.close();
        if (upstreamWs.readyState === WebSocket.OPEN) upstreamWs.close();
      };

      clientWs.on("close", cleanup);
      upstreamWs.on("close", cleanup);
      clientWs.on("error", cleanup);
      upstreamWs.on("error", cleanup);
    } catch (err) {
      clientWs.close(4000, err.message);
    }
  }

  _getUpstreamWsUrl(route) {
    const urls = {
      openai: "wss://api.openai.com/v1/realtime",
      azure: `wss://${route.resource}.openai.azure.com/openai/realtime`,
    };
    const params = route.model ? `?model=${route.model}` : "";
    return `${urls[route.provider] || urls.openai}${params}`;
  }

  async _authenticate(req) {
    const token =
      req.headers["authorization"]?.replace("Bearer ", "") ||
      new URL(req.url, "http://localhost").searchParams.get("token");
    // Validar JWT ou API key
    // ... reusar lógica de auth existente
    return { valid: true, keyId: "key_123" };
  }

  async _resolveRoute(model, auth) {
    // Reusar combo resolver para encontrar provider disponível
    return { provider: "openai", apiKey: "...", model };
  }

  _recordSession(session, durationMs) {
    // Registrar uso: duração, mensagens, custo estimado
    const costPerMinute = 0.06; // $0.06/min para gpt-4o-realtime
    const cost = (durationMs / 60000) * costPerMinute;

    console.log(
      `[Realtime] Session ${session.id}: ${durationMs}ms, ${session.messagesIn}↑ ${session.messagesOut}↓, cost: $${cost.toFixed(4)}`
    );
    // Registrar no spendWriter
  }
}
```

### Integração no Server

```javascript
// Em src/server-init.js ou server customizado
import { RealtimeProxy } from "./lib/realtime/wsProxy.js";

// Após criar o HTTP server
const realtimeProxy = new RealtimeProxy(httpServer);
```

## Arquivos a Criar/Modificar

| Arquivo                       | Ação                                       |
| ----------------------------- | ------------------------------------------ |
| `src/lib/realtime/wsProxy.js` | **NOVO** — WebSocket proxy bidirecional    |
| `src/server-init.js`          | **MODIFICAR** — Inicializar RealtimeProxy  |
| `package.json`                | **MODIFICAR** — Adicionar dependência `ws` |

## Critérios de Aceite

- [ ] WebSocket endpoint `/v1/realtime` funcional
- [ ] Autenticação via JWT no header ou query param
- [ ] Proxy bidirecional client ↔ upstream transparente
- [ ] Sessão rastreada com duração, mensagens, custo
- [ ] Cleanup automático quando cliente ou upstream desconecta
- [ ] Erros de upstream propagados ao cliente com código adequado
- [ ] Compatível com OpenAI Realtime API SDK

## Referência

- [LiteLLM: realtime_api/](https://github.com/BerriAI/litellm/tree/main/litellm/realtime_api) — WebSocket proxy
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime) — documentação oficial
