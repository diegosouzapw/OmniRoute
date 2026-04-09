# Feature 145 — Enterprise Cloud Providers (Bedrock/Azure/Vertex)

## Resumo

Adicionar suporte a provedores enterprise de cloud (AWS Bedrock, Azure OpenAI, Google Vertex AI) ao OmniRoute, permitindo que organizações usem seus próprios deployments de modelos em infraestrutura cloud privada, com autenticação nativa de cada cloud provider.

## Motivação

O LiteLLM tem cobertura completa de provedores enterprise:

- **AWS Bedrock**: 245 modelos, autenticação via IAM/STS
- **Azure OpenAI**: 181 modelos, autenticação via EntraID/API Key
- **Google Vertex AI**: 57+ modelos, autenticação via Service Account

Esses provedores são obrigatórios para clientes enterprise que precisam de: compliance regional (dados na própria conta AWS/Azure), VPC peering, preços negociados, e SLAs contratuais. O OmniRoute não suporta nenhum deles.

## O que ganhamos

- **Mercado enterprise**: Acesso ao segmento de clientes que requerem cloud privada
- **Compliance**: Dados processados na infraestrutura do cliente
- **Preço**: Modelos em Bedrock/Azure podem ser 30-50% mais baratos com reserved pricing
- **Redundância**: Mais opções de fallback para modelos populares (Claude via Bedrock, GPT via Azure)

## Situação Atual (Antes)

```
Cliente enterprise:
  → "Precisamos que o proxy use nosso Azure OpenAI deployment"
  → OmniRoute: "Desculpe, não suportamos Azure"
  → Cliente usa LiteLLM ou outro proxy
```

## Situação Proposta (Depois)

```
Provider Connection:
  provider: "bedrock"
  auth: {
    type: "iam",
    aws_access_key: "AKIA...",
    aws_secret_key: "...",
    aws_region: "us-east-1"
  }

Request: { model: "bedrock/anthropic.claude-3-sonnet" }
  → OmniRoute resolve para Bedrock endpoint regional
  → Assina request com SigV4
  → Traduz formato para Bedrock Converse API
  → Retorna no formato OpenAI padrão
```

## Especificação Técnica

### AWS Bedrock Adapter

```javascript
// src/lib/providers/bedrock/adapter.js

import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@smithy/protocol-http";

export class BedrockAdapter {
  constructor(config) {
    this.region = config.aws_region || "us-east-1";
    this.signer = new SignatureV4({
      credentials: {
        accessKeyId: config.aws_access_key,
        secretAccessKey: config.aws_secret_key,
        sessionToken: config.aws_session_token,
      },
      region: this.region,
      service: "bedrock",
      sha256: Sha256,
    });
  }

  getEndpoint(modelId) {
    // anthropic.claude-3-sonnet → converse endpoint
    return `https://bedrock-runtime.${this.region}.amazonaws.com/model/${modelId}/converse`;
  }

  transformRequest(openaiPayload) {
    // OpenAI format → Bedrock Converse format
    return {
      modelId: openaiPayload.model,
      messages: openaiPayload.messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: [{ text: m.content }],
      })),
      inferenceConfig: {
        maxTokens: openaiPayload.max_tokens || 4096,
        temperature: openaiPayload.temperature,
        topP: openaiPayload.top_p,
      },
    };
  }

  transformResponse(bedrockResponse) {
    // Bedrock format → OpenAI format
    return {
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      model: bedrockResponse.modelId,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: bedrockResponse.output?.message?.content?.[0]?.text || "",
          },
          finish_reason: bedrockResponse.stopReason === "end_turn" ? "stop" : "length",
        },
      ],
      usage: {
        prompt_tokens: bedrockResponse.usage?.inputTokens || 0,
        completion_tokens: bedrockResponse.usage?.outputTokens || 0,
        total_tokens:
          (bedrockResponse.usage?.inputTokens || 0) + (bedrockResponse.usage?.outputTokens || 0),
      },
    };
  }

  async signRequest(url, body) {
    const request = new HttpRequest({
      method: "POST",
      hostname: new URL(url).hostname,
      path: new URL(url).pathname,
      headers: {
        "Content-Type": "application/json",
        host: new URL(url).hostname,
      },
      body: JSON.stringify(body),
    });
    return this.signer.sign(request);
  }
}
```

### Azure OpenAI Adapter

```javascript
// src/lib/providers/azure/adapter.js

export class AzureOpenAIAdapter {
  constructor(config) {
    this.resourceName = config.azure_resource;
    this.deploymentName = config.azure_deployment;
    this.apiVersion = config.azure_api_version || "2024-10-21";
    this.apiKey = config.azure_api_key;
  }

  getEndpoint() {
    return `https://${this.resourceName}.openai.azure.com/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`;
  }

  getHeaders() {
    return { "api-key": this.apiKey };
  }

  // Azure uses same OpenAI format — minimal transformation needed
  transformRequest(payload) {
    const transformed = { ...payload };
    delete transformed.model; // Azure uses deployment name in URL
    return transformed;
  }
}
```

### Vertex AI Adapter

```javascript
// src/lib/providers/vertex/adapter.js

export class VertexAIAdapter {
  constructor(config) {
    this.projectId = config.gcp_project;
    this.region = config.gcp_region || "us-central1";
    this.accessToken = null; // Refreshed via service account
  }

  getEndpoint(modelId) {
    return `https://${this.region}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.region}/publishers/google/models/${modelId}:generateContent`;
  }

  transformRequest(openaiPayload) {
    // OpenAI format → Vertex/Gemini format
    return {
      contents: openaiPayload.messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: openaiPayload.max_tokens,
        temperature: openaiPayload.temperature,
        topP: openaiPayload.top_p,
      },
    };
  }
}
```

## Arquivos a Criar/Modificar

| Arquivo                                | Ação                                             |
| -------------------------------------- | ------------------------------------------------ |
| `src/lib/providers/bedrock/adapter.js` | **NOVO** — Bedrock adapter com SigV4             |
| `src/lib/providers/azure/adapter.js`   | **NOVO** — Azure OpenAI adapter                  |
| `src/lib/providers/vertex/adapter.js`  | **NOVO** — Vertex AI adapter                     |
| `src/shared/constants/providers.js`    | **MODIFICAR** — Adicionar bedrock, azure, vertex |
| `open-sse/config/providerRegistry.js`  | **MODIFICAR** — Registrar adapters               |
| `package.json`                         | **MODIFICAR** — Dependências AWS SDK             |

## Critérios de Aceite

- [ ] Bedrock: autenticação IAM via SigV4, Converse API
- [ ] Azure: autenticação via api-key, deployment-based routing
- [ ] Vertex: autenticação via service account, generateContent API
- [ ] Formato de entrada/saída traduzido para OpenAI padrão
- [ ] Streaming suportado em todos os três
- [ ] Provider connection aceita credenciais cloud-specific
- [ ] Modelos aparecem no catálogo com prefix (bedrock/, azure/, vertex/)

## Referência

- [LiteLLM: llms/bedrock/](https://github.com/BerriAI/litellm/tree/main/litellm/llms/bedrock)
- [LiteLLM: llms/azure/](https://github.com/BerriAI/litellm/tree/main/litellm/llms/azure)
- [LiteLLM: llms/vertex_ai/](https://github.com/BerriAI/litellm/tree/main/litellm/llms/vertex_ai)
