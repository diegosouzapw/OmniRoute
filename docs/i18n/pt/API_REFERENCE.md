# Referência de API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Referência completa para todos os endpoints da API OmniRoute.

---

## Índice

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Conclusões de bate-papo

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Cabeçalhos personalizados

| Cabeçalho                | Direção     | Descrição                                                  |
| ------------------------ | ----------- | ---------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Solicitação | Defina como `true` para ignorar o cache                    |
| `X-OmniRoute-Progress`   | Solicitação | Defina como `true` para eventos de progresso               |
| `Idempotency-Key`        | Solicitação | Chave de desduplicação (janela 5s)                         |
| `X-Request-Id`           | Solicitação | Chave de desduplicação alternativa                         |
| `X-OmniRoute-Cache`      | Resposta    | `HIT` ou `MISS` (sem streaming)                            |
| `X-OmniRoute-Idempotent` | Resposta    | `true` se desduplicado                                     |
| `X-OmniRoute-Progress`   | Resposta    | `enabled` se o acompanhamento do progresso estiver ativado |

---

## Incorporações

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Provedores disponíveis: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Geração de imagem

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Provedores disponíveis: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Listar modelos

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Terminais de compatibilidade

| Método | Caminho                     | Formato              |
| ------ | --------------------------- | -------------------- |
| POSTAR | `/v1/chat/completions`      | OpenAI               |
| POSTAR | `/v1/messages`              | Antrópico            |
| POSTAR | `/v1/responses`             | Respostas OpenAI     |
| POSTAR | `/v1/embeddings`            | OpenAI               |
| POSTAR | `/v1/images/generations`    | OpenAI               |
| OBTER  | `/v1/models`                | OpenAI               |
| POSTAR | `/v1/messages/count_tokens` | Antrópico            |
| OBTER  | `/v1beta/models`            | Gêmeos               |
| POSTAR | `/v1beta/models/{...path}`  | Gêmeos gera conteúdo |
| POSTAR | `/v1/api/chat`              | Ollama               |

### Rotas de provedores dedicados

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

O prefixo do provedor é adicionado automaticamente se estiver ausente. Modelos incompatíveis retornam `400`.

---

## Cache Semântico

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Exemplo de resposta:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Painel e gerenciamento

### Autenticação

| Ponto final                   | Método        | Descrição                 |
| ----------------------------- | ------------- | ------------------------- |
| `/api/auth/login`             | POSTAR        | Entrar                    |
| `/api/auth/logout`            | POSTAR        | Sair                      |
| `/api/settings/require-login` | OBTER/COLOCAR | Alternar login necessário |

### Gerenciamento de Provedores

| Ponto final                  | Método                | Descrição                        |
| ---------------------------- | --------------------- | -------------------------------- |
| `/api/providers`             | OBTER/POSTAR          | Listar/criar provedores          |
| `/api/providers/[id]`        | OBTER/COLOCAR/EXCLUIR | Gerenciar um provedor            |
| `/api/providers/[id]/test`   | POSTAR                | Testar conexão do provedor       |
| `/api/providers/[id]/models` | OBTER                 | Listar modelos de provedores     |
| `/api/providers/validate`    | POSTAR                | Validar configuração do provedor |
| `/api/provider-nodes*`       | Vários                | Gerenciamento de nós de provedor |
| `/api/provider-models`       | OBTER/POSTAR/EXCLUIR  | Modelos personalizados           |

### Fluxos OAuth

| Ponto final                      | Método | Descrição                    |
| -------------------------------- | ------ | ---------------------------- |
| `/api/oauth/[provider]/[action]` | Vários | OAuth específico do provedor |

### Roteamento e configuração

| Ponto final           | Método       | Descrição                              |
| --------------------- | ------------ | -------------------------------------- |
| `/api/models/alias`   | OBTER/POSTAR | Aliases de modelo                      |
| `/api/models/catalog` | OBTER        | Todos os modelos por fornecedor + tipo |
| `/api/combos*`        | Vários       | Gestão de combos                       |
| `/api/keys*`          | Vários       | Gerenciamento de chaves API            |
| `/api/pricing`        | OBTER        | Preços do modelo                       |

### Uso e análise

| Ponto final                 | Método | Descrição                    |
| --------------------------- | ------ | ---------------------------- |
| `/api/usage/history`        | OBTER  | Histórico de uso             |
| `/api/usage/logs`           | OBTER  | Registros de uso             |
| `/api/usage/request-logs`   | OBTER  | Logs em nível de solicitação |
| `/api/usage/[connectionId]` | OBTER  | Uso por conexão              |

### Configurações

| Ponto final                     | Método        | Descrição                                    |
| ------------------------------- | ------------- | -------------------------------------------- |
| `/api/settings`                 | OBTER/COLOCAR | Configurações gerais                         |
| `/api/settings/proxy`           | OBTER/COLOCAR | Configuração de proxy de rede                |
| `/api/settings/proxy/test`      | POSTAR        | Testar conexão proxy                         |
| `/api/settings/ip-filter`       | OBTER/COLOCAR | Lista de permissões/lista de bloqueios de IP |
| `/api/settings/thinking-budget` | OBTER/COLOCAR | Orçamento de token de raciocínio             |
| `/api/settings/system-prompt`   | OBTER/COLOCAR | Alerta do sistema global                     |

### Monitoramento

| Ponto final              | Método        | Descrição                      |
| ------------------------ | ------------- | ------------------------------ |
| `/api/sessions`          | OBTER         | Acompanhamento de sessão ativa |
| `/api/rate-limits`       | OBTER         | Limites de taxas por conta     |
| `/api/monitoring/health` | OBTER         | Exame de saúde                 |
| `/api/cache`             | OBTER/EXCLUIR | Estatísticas de cache/limpar   |

### Backup e exportação/importação

| Ponto final                 | Método  | Descrição                                               |
| --------------------------- | ------- | ------------------------------------------------------- |
| `/api/db-backups`           | OBTER   | Listar backups disponíveis                              |
| `/api/db-backups`           | COLOCAR | Crie um backup manual                                   |
| `/api/db-backups`           | POSTAR  | Restaurar de um backup específico                       |
| `/api/db-backups/export`    | OBTER   | Baixe o banco de dados como arquivo .sqlite             |
| `/api/db-backups/import`    | POSTAR  | Carregar arquivo .sqlite para substituir banco de dados |
| `/api/db-backups/exportAll` | OBTER   | Baixe o backup completo como arquivo .tar.gz            |

### Sincronização na nuvem

| Ponto final            | Método | Descrição                           |
| ---------------------- | ------ | ----------------------------------- |
| `/api/sync/cloud`      | Vários | Operações de sincronização em nuvem |
| `/api/sync/initialize` | POSTAR | Inicializar sincronização           |
| `/api/cloud/*`         | Vários | Gerenciamento de nuvem              |

### Ferramentas CLI

| Ponto final                        | Método | Descrição                      |
| ---------------------------------- | ------ | ------------------------------ |
| `/api/cli-tools/claude-settings`   | OBTER  | Status CLI de Claude           |
| `/api/cli-tools/codex-settings`    | OBTER  | Status da CLI do Codex         |
| `/api/cli-tools/droid-settings`    | OBTER  | Status da CLI do Droid         |
| `/api/cli-tools/openclaw-settings` | OBTER  | Status da CLI do OpenClaw      |
| `/api/cli-tools/runtime/[toolId]`  | OBTER  | Tempo de execução CLI genérico |

As respostas CLI incluem: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resiliência e limites de taxas

| Ponto final             | Método        | Descrição                             |
| ----------------------- | ------------- | ------------------------------------- |
| `/api/resilience`       | OBTER/COLOCAR | Obter/atualizar perfis de resiliência |
| `/api/resilience/reset` | POSTAR        | Reinicializar disjuntores             |
| `/api/rate-limits`      | OBTER         | Status do limite de taxa por conta    |
| `/api/rate-limit`       | OBTER         | Configuração de limite de taxa global |

### Avaliações

| Ponto final  | Método       | Descrição                                     |
| ------------ | ------------ | --------------------------------------------- |
| `/api/evals` | OBTER/POSTAR | Listar suítes de avaliação/executar avaliação |

### Políticas

| Ponto final     | Método               | Descrição                         |
| --------------- | -------------------- | --------------------------------- |
| `/api/policies` | OBTER/POSTAR/EXCLUIR | Gerenciar políticas de roteamento |

### Conformidade

| Ponto final                 | Método | Descrição                                       |
| --------------------------- | ------ | ----------------------------------------------- |
| `/api/compliance/audit-log` | OBTER  | Registo de auditoria de conformidade (último N) |

### v1beta (compatível com Gemini)

| Ponto final                | Método | Descrição                                     |
| -------------------------- | ------ | --------------------------------------------- |
| `/v1beta/models`           | OBTER  | Listar modelos no formato Gemini              |
| `/v1beta/models/{...path}` | POSTAR | Ponto de extremidade Gêmeos `generateContent` |

Esses endpoints refletem o formato API do Gemini para clientes que esperam compatibilidade nativa do Gemini SDK.

### APIs internas/do sistema

| Ponto final     | Método | Descrição                                                               |
| --------------- | ------ | ----------------------------------------------------------------------- |
| `/api/init`     | OBTER  | Verificação de inicialização do aplicativo (usada na primeira execução) |
| `/api/tags`     | OBTER  | Tags de modelo compatíveis com Ollama (para clientes Ollama)            |
| `/api/restart`  | POSTAR | Acionar reinicialização normal do servidor                              |
| `/api/shutdown` | POSTAR | Acionar o desligamento normal do servidor                               |

> **Observação:** Esses endpoints são usados internamente pelo sistema ou para compatibilidade do cliente Ollama. Eles normalmente não são chamados pelos usuários finais.

---

## Transcrição de áudio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcreva arquivos de áudio usando Deepgram ou AssemblyAI.

**Solicitação:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Resposta:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Provedores suportados:** `deepgram/nova-3`, `assemblyai/best`.

**Formatos suportados:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Compatibilidade com Ollama

Para clientes que usam o formato API do Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

As solicitações são traduzidas automaticamente entre o Ollama e os formatos internos.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Resposta:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Orçamento

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Disponibilidade do modelo

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Processamento de solicitação

1. Cliente envia solicitação para `/v1/*`
2. O manipulador de rota chama `handleChat`, `handleEmbedding`, `handleAudioTranscription` ou `handleImageGeneration`
3. O modelo foi resolvido (provedor/modelo direto ou alias/combo)
4. Credenciais selecionadas do banco de dados local com filtragem de disponibilidade de conta
5. Para bate-papo: `handleChatCore` — detecção de formato, tradução, verificação de cache, verificação de idempotência
6. O executor do provedor envia uma solicitação upstream
7. Resposta traduzida de volta para o formato do cliente (chat) ou retornada como está (incorporações/imagens/áudio)
8. Uso/registro registrado
9. Fallback se aplica a erros de acordo com regras de combinação

Referência completa da arquitetura: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Autenticação

- Rotas do painel (`/dashboard/*`) usam cookie `auth_token`
- O login utiliza hash de senha salva; substituto para `INITIAL_PASSWORD`
- `requireLogin` alternável via `/api/settings/require-login`
- As rotas `/v1/*` requerem opcionalmente a chave da API do portador quando `REQUIRE_API_KEY=true`
