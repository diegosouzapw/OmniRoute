# Feature 123 — TLS Nativo (HTTPS Direto)

## Objetivo

Implementar suporte a HTTPS diretamente no proxy sem necessidade de reverse proxy externo (Nginx, Caddy). O servidor aceita certificados TLS via configuração e opera em HTTPS nativamente.

## Motivação

Atualmente o OmniRoute requer um reverse proxy externo (Nginx, Cloudflare Tunnel) para servir HTTPS. Em cenários de deployment simples (single binary, docker-compose), ter TLS nativo elimina a necessidade de stack adicional. O CLIProxyAPI suporta TLS via `tls.cert` e `tls.key` na config.

## O que Ganhamos

- **Simplicidade**: Deploy single-process com HTTPS
- **Segurança**: Comunicação encrypted end-to-end sem reverse proxy
- **Desenvolvimento**: HTTPS local para testing de OAuth callbacks
- **Docker**: Imagem mais simples, sem nginx sidecar

## Situação Atual (Antes)

```
Client → HTTPS → Nginx/Caddy → HTTP → OmniRoute:3456
  → Config adicional de Nginx necessária
  → Certificados gerenciados externamente (certbot)
  → Extra hop de latência
```

## Situação Proposta (Depois)

```
Client → HTTPS → OmniRoute:3456 (TLS nativo)
  → Certificado carregado diretamente
  → Zero config de reverse proxy para TLS
  → Latência mínima
```

## Especificação Técnica

### Configuração

```env
# TLS Configuration (optional)
TLS_ENABLED=false
TLS_CERT_PATH=/path/to/cert.pem
TLS_KEY_PATH=/path/to/key.pem
```

### Implementação

```javascript
// open-sse/sse-server.js — modificar para suportar HTTPS

import https from "node:https";
import fs from "node:fs";

function createServer(app) {
  if (process.env.TLS_ENABLED === "true") {
    const cert = fs.readFileSync(process.env.TLS_CERT_PATH);
    const key = fs.readFileSync(process.env.TLS_KEY_PATH);
    return https.createServer({ cert, key }, app);
  }
  return http.createServer(app);
}

const server = createServer(app);
server.listen(PORT, () => {
  const protocol = process.env.TLS_ENABLED === "true" ? "https" : "http";
  console.log(`Server running on ${protocol}://0.0.0.0:${PORT}`);
});
```

### Auto-Reload de Certificados

```javascript
// Reload de certificado sem restart (para Let's Encrypt renewal)
if (process.env.TLS_ENABLED === "true") {
  const certWatcher = fs.watch(process.env.TLS_CERT_PATH, () => {
    const newCert = fs.readFileSync(process.env.TLS_CERT_PATH);
    const newKey = fs.readFileSync(process.env.TLS_KEY_PATH);
    server.setSecureContext({ cert: newCert, key: newKey });
    console.log("TLS certificate reloaded");
  });
}
```

## Arquivos a Criar/Modificar

| Arquivo                  | Ação                                  |
| ------------------------ | ------------------------------------- |
| `open-sse/sse-server.js` | **MODIFICAR** — HTTPS server creation |
| `.env.example`           | **MODIFICAR** — TLS_ENABLED, paths    |
| `docs/deployment.md`     | **MODIFICAR** — Documentar TLS setup  |

## Critérios de Aceite

- [ ] Servidor aceita conexões HTTPS quando TLS_ENABLED=true
- [ ] Certificado e key carregados de arquivos PEM
- [ ] Auto-reload de certificado sem restart
- [ ] Fallback para HTTP quando TLS_ENABLED=false (default)
- [ ] WebSocket funciona sobre WSS quando TLS ativo

## Referência

- [CLIProxyAPI: config.example.yaml linhas 5-7](https://github.com/router-for-me/CLIProxyAPI) — `tls.cert` / `tls.key`
