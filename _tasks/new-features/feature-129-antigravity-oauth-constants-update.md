# Feature 129 — Antigravity OAuth Constants Update

## Objetivo

Atualizar todas as constantes de OAuth e API do provider Antigravity (Google Cloud / Gemini via Google Cloud Code) com os valores mais recentes extraídos do CLIProxyAPI. Inclui Client ID, Client Secret, scopes, endpoints, user agents e metadata.

## Motivação

O provider Antigravity usa OAuth com Google Cloud e requer constantes específicas (Client ID, scopes, endpoints) para funcionar corretamente. Essas constantes mudam periodicamente conforme o Google atualiza suas APIs. Valores desatualizados causam auth failures silenciosos. O CLIProxyAPI mantém esses valores atualizados.

## O que Ganhamos

- **Auth funcional**: OAuth flow com Google funciona com valores corretos
- **Compatibilidade**: Scopes corretos para o endpoint `v1internal`
- **User Agent**: Strings que garantem aceitação pelo Google
- **Metadata**: Client metadata necessário para handshake

## Situação Atual (Antes)

```
Constantes OAuth possivelmente desatualizadas:
  → ClientID: pode estar com versão antiga
  → Scopes: podem faltar scopes necessários (cclog, experimentsandconfigs)
  → APIVersion: pode ser v1 ao invés de v1internal
  → UserAgent: string antiga que pode ser rejeitada
  → Resultado: Auth failures ou funcionalidade limitada
```

## Situação Proposta (Depois)

```
Constantes OAuth atualizadas (CLIProxyAPI 2026-02):
  → ClientID: 1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com
  → ClientSecret: definido via variável de ambiente segura
  → CallbackPort: 51121
  → Scopes: 5 scopes incluindo cclog e experimentsandconfigs
  → APIEndpoint: https://cloudcode-pa.googleapis.com
  → APIVersion: v1internal
  → UserAgent: google-api-nodejs-client/9.15.1
  → APIClient: google-cloud-sdk vscode_cloudshelleditor/0.1
```

## Especificação Técnica

### Constantes Atualizadas

```javascript
// src/shared/constants/antigravityAuth.js

export const ANTIGRAVITY_AUTH = {
  // OAuth App credentials (Gemini Cloud Code)
  clientId: "1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com",
  clientSecret: process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET || "",
  callbackPort: 51121,

  // Required OAuth scopes
  scopes: [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/cclog",
    "https://www.googleapis.com/auth/experimentsandconfigs",
  ],

  // API endpoint configuration
  apiEndpoint: "https://cloudcode-pa.googleapis.com",
  apiVersion: "v1internal",

  // Request identity headers
  userAgent: "google-api-nodejs-client/9.15.1",
  apiClient: "google-cloud-sdk vscode_cloudshelleditor/0.1",
  clientMetadata: JSON.stringify({
    ideType: "IDE_UNSPECIFIED",
    platform: "PLATFORM_UNSPECIFIED",
    pluginType: "GEMINI",
  }),
};
```

## Como fazer (passo a passo)

1. Centralizar as constantes do provider Antigravity em um único módulo de configuração.
2. Mover segredos para variáveis de ambiente (`ANTIGRAVITY_OAUTH_CLIENT_SECRET`) e remover qualquer valor hardcoded.
3. Atualizar fluxo OAuth para ler `clientId`, scopes e endpoint somente desse módulo central.
4. Padronizar headers de request (`user-agent`, `x-goog-api-client`, metadata) no executor.
5. Validar compatibilidade com modelos Antigravity cadastrados no registry.
6. Executar smoke test de OAuth e teste de chamada de chat com token renovado.

### Modelos Antigravity Atualizados

```javascript
// src/shared/constants/antigravityModels.js

export const ANTIGRAVITY_MODELS = [
  // ── Gemini ──
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    thinking: { min: 0, max: 24576, zeroAllowed: true, dynamicAllowed: true },
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    thinking: { min: 0, max: 24576, zeroAllowed: true, dynamicAllowed: true },
  },
  {
    id: "gemini-3-pro-high",
    name: "Gemini 3 Pro High",
    thinking: { min: 128, max: 32768, levels: ["low", "high"] },
  },
  {
    id: "gemini-3-pro-image",
    name: "Gemini 3 Pro Image",
    thinking: { min: 128, max: 32768, levels: ["low", "high"] },
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    thinking: { min: 128, max: 32768, levels: ["minimal", "low", "medium", "high"] },
  },

  // ── Claude (via Antigravity) ──
  {
    id: "claude-sonnet-4-5-thinking",
    name: "Claude Sonnet 4.5 Thinking",
    maxCompletionTokens: 64000,
    thinking: { min: 1024, max: 128000, zeroAllowed: true, dynamicAllowed: true },
  },
  {
    id: "claude-opus-4-5-thinking",
    name: "Claude Opus 4.5 Thinking",
    maxCompletionTokens: 64000,
    thinking: { min: 1024, max: 128000, zeroAllowed: true, dynamicAllowed: true },
  },
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 Thinking",
    maxCompletionTokens: 64000,
    thinking: { min: 1024, max: 128000, zeroAllowed: true, dynamicAllowed: true },
  },
  {
    id: "claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    maxCompletionTokens: 64000,
    thinking: null,
  },

  // ── Outros ──
  { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium", thinking: null },
  { id: "tab_flash_lite_preview", name: "Tab Flash Lite Preview", thinking: null },
];
```

### Onde Atualizar

Verificar e atualizar nos seguintes locais do OmniRoute:

```bash
# Buscar referências às constantes atuais:
grep -rn "clientId" src/ --include="*.js" | grep -i "antigravity\|gemini.*cloud"
grep -rn "googleapis.com" src/ --include="*.js"
grep -rn "v1internal\|cloudcode" src/ --include="*.js"
grep -rn "google-api-nodejs" src/ --include="*.js"
```

## Arquivos a Criar/Modificar

| Arquivo                                     | Ação                                            |
| ------------------------------------------- | ----------------------------------------------- |
| `src/shared/constants/antigravityAuth.js`   | **NOVO** ou **MODIFICAR** — Constantes OAuth    |
| `src/shared/constants/antigravityModels.js` | **NOVO** ou **MODIFICAR** — Modelos atualizados |
| `src/sse/auth/antigravityOAuth.js`          | **MODIFICAR** — Usar novas constantes           |
| `src/sse/executors/antigravityExecutor.js`  | **MODIFICAR** — Headers atualizados             |

## Critérios de Aceite

- [ ] Client ID e Client Secret atualizados
- [ ] Todos os 5 scopes presentes (especialmente `cclog` e `experimentsandconfigs`)
- [ ] API endpoint correto: `cloudcode-pa.googleapis.com`
- [ ] API version correto: `v1internal`
- [ ] User-Agent header: `google-api-nodejs-client/9.15.1`
- [ ] API Client header: `google-cloud-sdk vscode_cloudshelleditor/0.1`
- [ ] Client metadata JSON enviado nos requests
- [ ] OAuth flow completa com sucesso usando novos valores
- [ ] 11 modelos Antigravity registrados com thinking support

## ⚠️ Consideração de Segurança

> [!WARNING]
> Client ID e Client Secret são valores públicos do aplicativo Gemini Cloud Code (não são credenciais de usuário). Eles são usados para identificar o "app" no OAuth flow. No entanto, manter esses valores em constantes no código-fonte é deliberado — o CLIProxyAPI também faz isso em open-source.

## Referência

- [CLIProxyAPI: internal/auth/antigravity/constants.go](https://github.com/router-for-me/CLIProxyAPI) — Todas as constantes OAuth
- [CLIProxyAPI: internal/registry/model_definitions_static_data.go](https://github.com/router-for-me/CLIProxyAPI) — GetAntigravityModelConfig()
