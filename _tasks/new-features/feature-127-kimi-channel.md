# Feature 127 — Kimi Channel (Moonshot AI Provider)

## Objetivo

Implementar suporte ao Kimi (Moonshot AI) como provider dedicado com canal de autenticação próprio, incluindo modelos K2, K2 Thinking e K2.5 com configurações de thinking budget específicas.

## Motivação

O Kimi (Moonshot AI) é um provider de IA chinês que ganhou relevância com o modelo K2 — o primeiro "MoE nativo open-weight" com 1T de parâmetros. O CLIProxyAPI adicionou recentemente um canal Kimi dedicado com 3 modelos e thinking support. O OmniRoute atualmente só suporta Kimi via Qoder (proxy indireto), mas o canal direto oferece melhor latência e control.

## O que Ganhamos

- **Latência**: Acesso direto ao Kimi API em vez de via Qoder
- **Controle**: Thinking budget configurável por modelo
- **Modelos dedicados**: K2, K2 Thinking, K2.5 com metadata completa
- **Expansão**: Novo provider que aumenta diversidade de opções

## Situação Atual (Antes)

```
Kimi K2/K2.5 disponível APENAS via Qoder (intermediário)
  → Latência extra (+100-200ms round-trip via Qoder)
  → Sem thinking budget control direto
  → Sujeito a limites do Qoder
```

## Situação Proposta (Depois)

```
Kimi K2/K2.5 disponível via canal DIRETO
  Provider: "kimi"
  Auth: API key ou cookie auth
  Modelos:
    ├── kimi-k2:          131K ctx, 32K output, sem thinking
    ├── kimi-k2-thinking: 131K ctx, 32K output, thinking 1024-32000
    └── kimi-k2.5:        131K ctx, 32K output, thinking 1024-32000
```

## Especificação Técnica

### Modelos

```javascript
// src/shared/constants/kimiModels.js

export const KIMI_MODELS = [
  {
    id: "kimi-k2",
    name: "Kimi K2",
    contextLength: 131072,
    maxCompletionTokens: 32768,
    thinking: null, // Sem thinking
    description: "Kimi K2 - Moonshot AI flagship coding model",
  },
  {
    id: "kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    contextLength: 131072,
    maxCompletionTokens: 32768,
    thinking: {
      min: 1024,
      max: 32000,
      zeroAllowed: true,
      dynamicAllowed: true,
    },
    description: "Kimi K2 with extended thinking capabilities",
  },
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5",
    contextLength: 131072,
    maxCompletionTokens: 32768,
    thinking: {
      min: 1024,
      max: 32000,
      zeroAllowed: true,
      dynamicAllowed: true,
    },
    description: "Kimi K2.5 - Latest generation with thinking support",
  },
];
```

### Configuração de Credenciais

```json
// Credenciais Kimi no dashboard/config
{
  "provider": "kimi",
  "name": "Kimi Direct Account",
  "apiKey": "sk-kimi-...",
  "baseUrl": "https://api.moonshot.cn/v1",
  "priority": 5
}
```

### Executor Kimi

```javascript
// src/sse/executors/kimiExecutor.js

export class KimiExecutor {
  constructor(credential) {
    this.baseUrl = credential.baseUrl || "https://api.moonshot.cn/v1";
    this.apiKey = credential.apiKey;
  }

  async execute(payload, options) {
    // Kimi usa API compatível com OpenAI
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: payload.model,
        messages: payload.messages,
        stream: payload.stream,
        // Thinking budget para modelos que suportam
        ...(payload.thinking?.budget_tokens && {
          thinking: { budget_tokens: payload.thinking.budget_tokens },
        }),
      }),
    });

    return response;
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                                   | Ação                                                |
| ----------------------------------------- | --------------------------------------------------- |
| `src/shared/constants/kimiModels.js`      | **NOVO** — Definições de modelos Kimi               |
| `src/sse/executors/kimiExecutor.js`       | **NOVO** — Executor para Kimi API                   |
| `open-sse/config/providerRegistry.js`     | **MODIFICAR** — Registrar provider Kimi             |
| `src/shared/constants/thinkingSupport.js` | **MODIFICAR** — Adicionar thinking budgets Kimi     |
| Dashboard UI                              | **MODIFICAR** — Adicionar Kimi como provider option |

## Critérios de Aceite

- [ ] Provider "kimi" registrado no providerRegistry
- [ ] 3 modelos listados em `/v1/models` quando credencial Kimi está ativa
- [ ] Chat completions funcionam com kimi-k2 (sem thinking)
- [ ] Thinking budget validado para kimi-k2-thinking e kimi-k2.5
- [ ] Dashboard permite adicionar credenciais Kimi
- [ ] Fallback para Qoder se canal direto falhar (opcional)

## Referência

- [CLIProxyAPI: internal/registry/model_definitions_static_data.go](https://github.com/router-for-me/CLIProxyAPI) — GetKimiModels()
