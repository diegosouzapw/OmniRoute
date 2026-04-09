# Feature 09 — Per-Key Proxy Override

## Resumo

Implementar suporte a proxy HTTP/SOCKS5 por credencial individual. Cada API key ou OAuth token pode ter seu próprio proxy, ao invés de depender apenas do proxy global. Isso permite distribuir tráfego por diferentes IPs e regiões.

## Motivação

Limitações de rate-limiting e geo-blocking são baseadas em IP. Se todas as credenciais usam a mesma saída, uma pode contaminar as outras. Per-key proxy resolve isso:

- Credencial A → proxy em US East (baixa latência para Anthropic)
- Credencial B → proxy em EU West (compliance GDPR)
- Credencial C → direto (sem proxy, latência mínima)

## O que ganhamos

- **Rate-limit isolation**: Cada credencial tem seu IP de saída
- **Geo-targeting**: Rotear para região específica conforme necessidade
- **Fallback**: Se proxy A cair, B continua funcionando
- **Compliance**: Forçar tráfego por regiões específicas para GDPR

## Situação Atual (Antes)

```
Credencial A ─┐
Credencial B ─┤→ Proxy Global → Provider
Credencial C ─┘
// Todas compartilham mesmo IP de saída
// Rate-limit em uma afeta todas
```

## Situação Proposta (Depois)

```
Credencial A → Proxy US-East → Provider (IP 1.2.3.4)
Credencial B → Proxy EU-West → Provider (IP 5.6.7.8)
Credencial C → Direto ────────→ Provider (IP do servidor)
// Cada credencial isolada
```

## Especificação Técnica

### Configuração

```env
# Proxy global (fallback)
PROXY_URL=socks5://proxy-global:1080

# Per-key proxy override (via credentials config)
# Definido no credentials JSON, não em ENV
```

```json
// config/credentials.json (ou na configuração de credenciais existente)
{
  "credentials": [
    {
      "provider": "claude",
      "apiKey": "sk-ant-...",
      "proxyUrl": "socks5://us-east-proxy:1080"
    },
    {
      "provider": "gemini",
      "apiKey": "AIzaSy...",
      "proxyUrl": "http://eu-west-proxy:8080"
    },
    {
      "provider": "codex",
      "oauthToken": "...",
      "proxyUrl": null // null = direto, sem proxy
    }
  ]
}
```

### Resolução de Proxy

```javascript
// src/lib/proxy/proxyResolver.js

import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

export function resolveProxyAgent(credential, globalProxyUrl) {
  // 1. Per-key override tem prioridade
  const proxyUrl =
    credential.proxyUrl !== undefined
      ? credential.proxyUrl // null = direto, string = proxy específico
      : globalProxyUrl; // fallback para global

  if (!proxyUrl) return null; // Sem proxy = conexão direta

  // 2. Criar agent baseado no protocolo
  if (proxyUrl.startsWith("socks")) {
    return new SocksProxyAgent(proxyUrl);
  }
  return new HttpsProxyAgent(proxyUrl);
}
```

### Integração com proxyFetch

```javascript
// src/sse/utils/proxyFetch.js — modificar para aceitar agent per-key

export async function proxyFetch(url, options, credential) {
  const agent = resolveProxyAgent(credential, config.globalProxyUrl);

  return fetch(url, {
    ...options,
    agent,
    // ... demais opções
  });
}
```

### Logging

```javascript
// No proxyLogger — indicar qual proxy foi usado
logger.info(
  `Request to ${provider} via ${
    credential.proxyUrl
      ? `per-key proxy ${credential.proxyUrl}`
      : globalProxy
        ? `global proxy ${globalProxy}`
        : "direct connection"
  }`
);
```

## Arquivos a Criar/Modificar

| Arquivo                          | Ação                                          |
| -------------------------------- | --------------------------------------------- |
| `src/lib/proxy/proxyResolver.js` | **NOVO** — Resolução de proxy per-key         |
| `src/sse/utils/proxyFetch.js`    | **MODIFICAR** — Aceitar agent per-key         |
| `src/sse/utils/proxyLogger.js`   | **MODIFICAR** — Logar proxy usado             |
| Dashboard credentials UI         | **MODIFICAR** — Campo de proxy por credencial |

## Critérios de Aceite

- [ ] Credencial com proxyUrl usa o proxy específico
- [ ] Credencial com proxyUrl=null usa conexão direta
- [ ] Credencial sem proxyUrl usa proxy global (fallback)
- [ ] Suporte a SOCKS5 e HTTP proxies
- [ ] Log indica qual proxy foi usado para cada request
- [ ] Dashboard permite configurar proxy per-key
- [ ] Health check valida que o proxy está acessível

## Referência

- [ProxyPilot: config.example.yaml linhas 105-112](https://github.com/Finesssee/ProxyPilot/blob/main/config.example.yaml) (per-key proxy-url)
