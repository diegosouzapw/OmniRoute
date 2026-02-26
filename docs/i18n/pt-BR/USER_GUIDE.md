# Guia do usuário

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Guia completo para configurar provedores, criar combos, integrar ferramentas CLI e implantar OmniRoute.

---

## Índice

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Visão geral dos preços

| Nível               | Provedor                 | Custo            | Redefinição de cota      | Melhor para                   |
| ------------------- | ------------------------ | ---------------- | ------------------------ | ----------------------------- |
| **💳 ASSINATURA**   | Código Claude (Pro)      | $ 20/mês         | 5h + semanalmente        | Já inscrito                   |
|                     | Códice (Plus/Pro)        | US$ 20-200/mês   | 5h + semanalmente        | Usuários OpenAI               |
|                     | Gêmeos CLI               | **GRÁTIS**       | 180 mil/mês + 1 mil/dia  | Todos!                        |
|                     | Copiloto GitHub          | US$ 10-19/mês    | Mensalmente              | Usuários do GitHub            |
| **🔑 CHAVE DE API** | DeepSeek                 | Pague por uso    | Nenhum                   | Raciocínio barato             |
|                     | Groq                     | Pague por uso    | Nenhum                   | Inferência ultrarrápida       |
|                     | xAI (Groque)             | Pague por uso    | Nenhum                   | Raciocínio Grok 4             |
|                     | Mistral                  | Pague por uso    | Nenhum                   | Modelos hospedados na UE      |
|                     | Perplexidade             | Pague por uso    | Nenhum                   | Pesquisa aumentada            |
|                     | Juntos IA                | Pague por uso    | Nenhum                   | Modelos de código aberto      |
|                     | IA de fogos de artifício | Pague por uso    | Nenhum                   | Imagens FLUX rápidas          |
|                     | Cérebros                 | Pague por uso    | Nenhum                   | Velocidade em escala de wafer |
|                     | Coerente                 | Pague por uso    | Nenhum                   | Comando R+ RAG                |
|                     | NVIDIA NIM               | Pague por uso    | Nenhum                   | Modelos empresariais          |
| **💰 BARATO**       | GLM-4.7                  | US$ 0,6/1 milhão | Diariamente 10h          | Backup de orçamento           |
|                     | MiniMax M2.1             | US$ 0,2/1 milhão | Rolamento de 5 horas     | Opção mais barata             |
|                     | Kimi K2                  | $ 9 / mês fixo   | 10 milhões de tokens/mês | Custo previsível              |
| **🆓 GRÁTIS**       | iFlow                    | $0               | Ilimitado                | 8 modelos grátis              |
|                     | Qwen                     | $0               | Ilimitado                | 3 modelos grátis              |
|                     | Kiro                     | $0               | Ilimitado                | Cláudio grátis                |

**💡 Dica profissional:** Comece com Gemini CLI (180 mil grátis/mês) + combo iFlow (gratuito ilimitado) = custo de $ 0!

---

## 🎯 Casos de uso

### Caso 1: "Tenho assinatura do Claude Pro"

**Problema:** A cota expira sem ser utilizada, limites de taxa durante codificação pesada

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Caso 2: "Quero custo zero"

**Problema:** Não posso pagar assinaturas, preciso de codificação de IA confiável

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Caso 3: "Preciso de codificação 24 horas por dia, 7 dias por semana, sem interrupções"

**Problema:** Prazos, não podemos arcar com o tempo de inatividade

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Caso 4: "Quero IA GRATUITA no OpenClaw"

**Problema:** Precisa de assistente de IA em aplicativos de mensagens, totalmente gratuito

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Configuração do provedor

### 🔐 Provedores de assinatura

#### Código Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Dica profissional:** Use o Opus para tarefas complexas e o Sonnet para velocidade. OmniRoute rastreia cota por modelo!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRÁTIS 180 mil/mês!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Melhor valor:** Grande nível gratuito! Use isso antes dos níveis pagos.

#### GitHub Copiloto

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Fornecedores baratos

#### GLM-4.7 (redefinição diária, US$ 0,6/1 milhão)

1. Inscreva-se: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenha a chave API do plano de codificação
3. Painel → Adicionar chave de API: Provedor: `glm`, chave de API: `your-key`

**Usar:** `glm/glm-4.7` — **Dica profissional:** O plano de codificação oferece 3× cota a 1/7 de custo! Redefinir diariamente às 10h.

#### MiniMax M2.1 (redefinição de 5h, US$ 0,20/1 milhão)

1. Inscreva-se: [MiniMax](https://www.minimax.io/)
2. Obter chave de API → Painel → Adicionar chave de API

**Use:** `minimax/MiniMax-M2.1` — **Dica profissional:** Opção mais barata para contexto longo (1 milhão de tokens)!

#### Kimi K2 (US$ 9/mês fixo)

1. Inscreva-se: [Moonshot AI](https://platform.moonshot.ai/)
2. Obter chave de API → Painel → Adicionar chave de API

**Uso:** `kimi/kimi-latest` — **Dica profissional:** Fixo US$ 9/mês para 10 milhões de tokens = US$ 0,90/1 milhão de custo efetivo!

### 🆓 Provedores GRATUITOS

#### iFlow (8 modelos GRATUITOS)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modelos GRATUITOS)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRÁTIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨Combos

### Exemplo 1: Maximize a assinatura → Backup barato

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exemplo 2: somente gratuito (custo zero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Integração CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Código Cláudio

Editar `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### CLI do Codex

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

###OpenClaw

Editar `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Ou use o Dashboard:** Ferramentas CLI → OpenClaw → Configuração automática

### Cline / Continuar / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Implantação

### Implantação VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Para o modo integrado ao host com binários CLI, consulte a seção Docker na documentação principal.

### Variáveis de Ambiente

| Variável              | Padrão                               | Descrição                                                             |
| --------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Segredo de assinatura do JWT (**mudança na produção**)                |
| `INITIAL_PASSWORD`    | `123456`                             | Senha do primeiro login                                               |
| `DATA_DIR`            | `~/.omniroute`                       | Diretório de dados (banco de dados, uso, logs)                        |
| `PORT`                | padrão da estrutura                  | Porta de serviço (`20128` em exemplos)                                |
| `HOSTNAME`            | padrão da estrutura                  | Host de vinculação (o padrão do Docker é `0.0.0.0`)                   |
| `NODE_ENV`            | padrão de tempo de execução          | Definir `production` para implantação                                 |
| `BASE_URL`            | `http://localhost:20128`             | URL base interna do lado do servidor                                  |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL base do endpoint de sincronização em nuvem                        |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Segredo HMAC para chaves de API geradas                               |
| `REQUIRE_API_KEY`     | `false`                              | Aplicar chave de API do portador em `/v1/*`                           |
| `ENABLE_REQUEST_LOGS` | `false`                              | Habilita registros de solicitação/resposta                            |
| `AUTH_COOKIE_SECURE`  | `false`                              | Forçar cookie de autenticação `Secure` (atrás do proxy reverso HTTPS) |

Para obter a referência completa da variável de ambiente, consulte [README](../README.md).

---

## 📊 Modelos Disponíveis

<details>
<summary><b>Ver todos os modelos disponíveis</b></summary>

**Código Claude (`cc/`)** — Pro/Máx: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Códice (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATUITO: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copiloto do GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — US$ 0,6/1 milhão: `glm/glm-4.7`

**MiniMax (`minimax/`)** — US$ 0,2/1 milhão: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATUITO: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATUITO: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATUITO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexidade (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Juntos AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**IA do Fireworks (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cérebros (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Coerente (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Recursos avançados

### Modelos personalizados

Adicione qualquer ID de modelo a qualquer provedor sem esperar por uma atualização do aplicativo:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Ou use o Dashboard: **Provedores → [Provedor] → Modelos personalizados**.

### Rotas de provedores dedicados

Encaminhe solicitações diretamente para um provedor específico com validação de modelo:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

O prefixo do provedor é adicionado automaticamente se estiver ausente. Modelos incompatíveis retornam `400`.

### Configuração de proxy de rede

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Precedência:** Específico da chave → Específico do combo → Específico do provedor → Global → Ambiente.

### API de catálogo de modelos

```bash
curl http://localhost:20128/api/models/catalog
```

Retorna modelos agrupados por provedor com tipos (`chat`, `embedding`, `image`).

### Sincronização na nuvem

- Sincronize provedores, combos e configurações entre dispositivos
- Sincronização automática em segundo plano com tempo limite + falha rápida
- Prefira `BASE_URL`/`CLOUD_URL` do lado do servidor na produção

### LLM Gateway Intelligence (Fase 9)

- **Cache Semântico** — Armazena automaticamente em cache sem streaming, temperatura = 0 respostas (ignorar com `X-OmniRoute-No-Cache: true`)
- **Idempotência de solicitação** — Desduplica solicitações em 5s por meio do cabeçalho `Idempotency-Key` ou `X-Request-Id`
- **Acompanhamento de progresso** — Eventos SSE `event: progress` de aceitação por meio do cabeçalho `X-OmniRoute-Progress: true`

---

### Parque do Tradutor

Acesso via **Painel → Tradutor**. Depure e visualize como o OmniRoute traduz solicitações de API entre provedores.

| Modo                      | Finalidade                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Parque Infantil**       | Selecione os formatos de origem/destino, cole uma solicitação e veja o resultado traduzido instantaneamente |
| **Testador de bate-papo** | Envie mensagens de chat ao vivo através do proxy e inspecione todo o ciclo de solicitação/resposta          |
| **Banco de testes**       | Execute testes em lote em múltiplas combinações de formatos para verificar a exatidão da tradução           |
| **Monitoramento ao vivo** | Assista às traduções em tempo real enquanto as solicitações fluem pelo proxy                                |

**Casos de uso:**

- Depure por que uma combinação específica de cliente/provedor falha
- Verifique se as tags de pensamento, as chamadas de ferramentas e os prompts do sistema são traduzidos corretamente
- Compare as diferenças de formato entre os formatos OpenAI, Claude, Gemini e Responses API

---

### Estratégias de roteamento

Configure via **Painel → Configurações → Roteamento**.

| Estratégia                       | Descrição                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Preencha primeiro**            | Usa contas em ordem de prioridade – a conta principal lida com todas as solicitações até ficar indisponível   |
| **Round Robin**                  | Percorre todas as contas com um limite fixo configurável (padrão: 3 chamadas por conta)                       |
| **P2C (Poder de Duas Escolhas)** | Escolhe 2 contas aleatórias e direciona para a mais saudável — equilibra a carga com a consciência da saúde   |
| **Aleatório**                    | Seleciona aleatoriamente uma conta para cada solicitação usando o embaralhamento Fisher-Yates                 |
| **Menos usado**                  | Roteia para a conta com o carimbo de data/hora `lastUsedAt` mais antigo, distribuindo o tráfego uniformemente |
| **Custo Otimizado**              | Rotas para a conta com menor valor de prioridade, otimizando para provedores de menor custo                   |

#### Aliases de modelo curinga

Crie padrões curinga para remapear nomes de modelos:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Os curingas suportam `*` (qualquer caractere) e `?` (caractere único).

#### Cadeias substitutas

Defina cadeias de fallback globais que se aplicam a todas as solicitações:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Resiliência e Disjuntores

Configure via **Painel → Configurações → Resiliência**.

OmniRoute implementa resiliência em nível de provedor com quatro componentes:

1. **Perfis de Provedores** — Configuração por provedor para:
   - Limite de falha (quantas falhas antes da abertura)
   - Duração do resfriamento
   - Sensibilidade de detecção de limite de taxa
   - Parâmetros de espera exponencial

2. **Limites de taxa editáveis** — Padrões de nível de sistema configuráveis no painel:
   - **Solicitações por minuto (RPM)** — Máximo de solicitações por minuto por conta
   - **Tempo mínimo entre solicitações** — Intervalo mínimo em milissegundos entre solicitações
   - **Máximo de solicitações simultâneas** — Máximo de solicitações simultâneas por conta
   - Clique em **Editar** para modificar e depois em **Salvar** ou **Cancelar**. Os valores persistem por meio da API de resiliência.

3. **Disjuntor** — Rastreia falhas por provedor e abre automaticamente o circuito quando um limite é atingido:
   - **FECHADO** (Saudável) — As solicitações fluem normalmente
   - **OPEN** — O provedor é bloqueado temporariamente após falhas repetidas
   - **HALF_OPEN** — Testando se o provedor se recuperou

4. **Políticas e identificadores bloqueados** — Mostra o status do disjuntor e identificadores bloqueados com capacidade de desbloqueio forçado.

5. **Detecção automática de limite de taxa** — Monitora os cabeçalhos `429` e `Retry-After` para evitar proativamente atingir os limites de taxa do provedor.

**Dica profissional:** Use o botão **Redefinir tudo** para limpar todos os disjuntores e resfriamentos quando um provedor se recupera de uma interrupção.

---

### Exportação/Importação de banco de dados

Gerencie backups de banco de dados em **Painel → Configurações → Sistema e armazenamento**.

| Ação                        | Descrição                                                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exportar banco de dados** | Baixa o banco de dados SQLite atual como um arquivo `.sqlite`                                                                                         |
| **Exportar tudo (.tar.gz)** | Baixa um arquivo de backup completo, incluindo: banco de dados, configurações, combos, conexões de provedor (sem credenciais), metadados de chave API |
| **Importar banco de dados** | Faça upload de um arquivo `.sqlite` para substituir o banco de dados atual. Um backup de pré-importação é criado automaticamente                      |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Validação de importação:** O arquivo importado é validado quanto à integridade (verificação de pragma SQLite), tabelas necessárias (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) e tamanho (máximo de 100 MB).

**Casos de uso:**

- Migrar OmniRoute entre máquinas
- Crie backups externos para recuperação de desastres
- Compartilhe configurações entre membros da equipe (exportar tudo → compartilhar arquivo)

---

### Painel de configurações

A página de configurações está organizada em 5 guias para facilitar a navegação:

| Guia            | Conteúdo                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Segurança**   | Configurações de login/senha, controle de acesso IP, autenticação de API para `/models` e bloqueio de provedor    |
| **Roteamento**  | Estratégia de roteamento global (6 opções), aliases de modelo curinga, cadeias de fallback, padrões de combinação |
| **Resiliência** | Perfis de provedores, limites de taxas editáveis, status de disjuntores, políticas e identificadores bloqueados   |
| **IA**          | Pensando na configuração do orçamento, injeção de prompt do sistema global, estatísticas de cache de prompt       |
| **Avançado**    | Configuração de proxy global (HTTP/SOCKS5)                                                                        |

---

### Gestão de Custos e Orçamento

Acesso via **Painel → Custos**.

| Guia          | Finalidade                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Orçamento** | Defina limites de gastos por chave de API com orçamentos diários/semanais/mensais e rastreamento em tempo real |
| **Preços**    | Visualize e edite entradas de preços de modelo — custo por 1 mil tokens de entrada/saída por provedor          |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Acompanhamento de custos:** cada solicitação registra o uso do token e calcula o custo usando a tabela de preços. Veja detalhes em **Painel → Uso** por provedor, modelo e chave de API.

---

### Transcrição de áudio

OmniRoute oferece suporte à transcrição de áudio por meio do endpoint compatível com OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Provedores disponíveis: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Formatos de áudio suportados: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Estratégias de balanceamento de combinação

Configure o balanceamento por combo em **Painel → Combos → Criar/Editar → Estratégia**.

| Estratégia          | Descrição                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Round-Robin**     | Gira pelos modelos sequencialmente                                                        |
| **Prioridade**      | Tenta sempre o primeiro modelo; recorre apenas ao erro                                    |
| **Aleatório**       | Escolhe um modelo aleatório do combo para cada solicitação                                |
| **Ponderada**       | Rotas proporcionalmente com base nos pesos atribuídos por modelo                          |
| **Menos usado**     | Rotas para o modelo com o menor número de solicitações recentes (usa métricas combinadas) |
| **Custo Otimizado** | Rotas para o modelo mais barato disponível (usa tabela de preços)                         |

Os padrões de combinação global podem ser definidos em **Painel → Configurações → Roteamento → Padrões de combinação**.

---

### Painel de saúde

Acesso via **Painel → Saúde**. Visão geral da integridade do sistema em tempo real com 6 cartões:

| Cartão                     | O que mostra                                                            |
| -------------------------- | ----------------------------------------------------------------------- |
| **Status do sistema**      | Tempo de atividade, versão, uso de memória, diretório de dados          |
| **Provedor de Saúde**      | Estado do disjuntor por fornecedor (Fechado/Aberto/Meio-aberto)         |
| **Limites de Tarifas**     | Cooldowns de limite de taxa ativa por conta com tempo restante          |
| **Bloqueios ativos**       | Prestadores bloqueados temporariamente pela política de lockout         |
| **Cache de Assinaturas**   | Estatísticas do cache de desduplicação (chaves ativas, taxa de acertos) |
| **Telemetria de latência** | Agregação de latência p50/p95/p99 por provedor                          |

**Dica profissional:** a página Saúde é atualizada automaticamente a cada 10 segundos. Use a placa do disjuntor para identificar quais provedores estão enfrentando problemas.
