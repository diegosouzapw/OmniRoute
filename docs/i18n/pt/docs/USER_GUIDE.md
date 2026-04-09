# User Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Guia completo para configurar provedores, criar combos, integrar ferramentas CLI e implantar OmniRoute.---

## Table of Contents

- [Preços resumidos](#-pricing-at-a-glance)
- [Casos de uso](#-casos de uso)
- [Configuração do provedor](#-configuração do provedor)
- [Integração CLI](#-cli-integração)
- [Implantação](#-implantação)
- [Modelos disponíveis](#-modelos disponíveis)
- [Recursos avançados](#-recursos avançados)---

## 💰 Pricing at a Glance

| Nível               | Provedor                 | Custo            | Redefinição de cota      | Melhor para                   |
| ------------------- | ------------------------ | ---------------- | ------------------------ | ----------------------------- |
| **💳 ASSINATURA**   | Código Claude (Pro)      | $ 20/mês         | 5h + semanalmente        | Já inscrito                   |
|                     | Códice (Plus/Pro)        | US$ 20-200/mês   | 5h + semanalmente        | Usuários OpenAI               |
|                     | Gêmeos CLI               | **GRÁTIS**       | 180 mil/mês + 1 mil/dia  | Todos!                        |
|                     | Copiloto GitHub          | US$ 10-19/mês    | Mensalmente              | Usuários do GitHub            |
| **🔑 CHAVE DE API** | DeepSeek                 | Pague por uso    | Nenhum                   | Raciocínio barato             |
|                     | Groq                     | Pague por uso    | Nenhum                   | Inferência ultrarrápida       |
|                     | xAI (Grok)               | Pague por uso    | Nenhum                   | Raciocínio Grok 4             |
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
| **🆓 GRÁTIS**       | Qoder                    | $0               | Ilimitado                | 8 modelos grátis              |
|                     | Qwen                     | $0               | Ilimitado                | 3 modelos grátis              |
|                     | Kiro                     | $0               | Ilimitado                | Cláudio grátis                |

**💡 Dica profissional:**Comece com Gemini CLI (180 mil grátis/mês) + combo Qoder (grátis ilimitado) = custo de $ 0!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problema:**A cota expira sem ser utilizada, limites de taxa durante codificação pesada```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problema:**Não posso pagar assinaturas, preciso de codificação de IA confiável```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problema:**Prazos, não podemos arcar com o tempo de inatividade```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**Problema:**Precisa de assistente de IA em aplicativos de mensagens, totalmente gratuito```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Dica profissional:**Use o Opus para tarefas complexas e o Sonnet para velocidade. OmniRoute rastreia cota por modelo!#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Melhor valor:**Grande nível gratuito! Use isso antes dos níveis pagos.#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Inscreva-se: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenha a chave API do plano de codificação
3. Painel → Adicionar chave de API: Provedor: `glm`, chave de API: `sua-chave`

**Use:**`glm/glm-4.7` —**Dica profissional:**O plano de codificação oferece cota 3× pelo custo de 1/7! Redefinir diariamente às 10h.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Cadastre-se: [MiniMax](https://www.minimax.io/)
2. Obter chave de API → Painel → Adicionar chave de API

**Use:**`minimax/MiniMax-M2.1` —**Dica profissional:**Opção mais barata para contexto longo (tokens de 1 milhão)!#### Kimi K2 ($9/month flat)

1. Inscreva-se: [Moonshot AI](https://platform.moonshot.ai/)
2. Obter chave de API → Painel → Adicionar chave de API

**Use:**`kimi/kimi-latest` —**Dica profissional:**Fixo US$ 9/mês para 10 milhões de tokens = US$ 0,90/1 milhão de custo efetivo!### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Edite `~/.claude/config.json`:```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

Edite `~/.openclaw/openclaw.json`:```json
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

**Ou use o Dashboard:**Ferramentas CLI → OpenClaw → Configuração automática### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Implantação

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

A CLI carrega automaticamente `.env` de `~/.omniroute/.env` ou `./.env`.### VPS Deployment

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

### PM2 Deployment (Low Memory)

Para servidores com RAM limitada, use a opção de limite de memória:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Crie `ecosystem.config.js`:```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Para o modo integrado ao host com binários CLI, consulte a seção Docker na documentação principal.### Void Linux (xbps-src)

Os usuários do Void Linux podem empacotar e instalar o OmniRoute nativamente usando a estrutura de compilação cruzada `xbps-src`. Isso automatiza a construção autônoma do Node.js junto com as ligações nativas `better-sqlite3` necessárias.

<detalhes>
<summary><b>Ver modelo xbps-src</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
    for _mod in pino-abstract-transport split2 process-warning; do
    	cp -r "node_modules/$_mod" .next/standalone/node_modules/
    done

}

do_check() {
npm run test:unit
}

do_install() {
vmkdir usr/lib/omniroute/.next
vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

    # Prevent removal of empty Next.js app router dirs by the post-install hook
    for _d in \
    	.next/standalone/.next/server/app/dashboard \
    	.next/standalone/.next/server/app/dashboard/settings \
    	.next/standalone/.next/server/app/dashboard/providers; do
    	touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
    done

    cat > "${WRKDIR}/omniroute" <<'EOF'

#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
vlicense LICENSE
}

````

</details>

### Environment Variables

| Variável | Padrão | Descrição |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Segredo de assinatura do JWT (**mudança na produção**) |
| `INITIAL_PASSWORD` | `123456` | Senha do primeiro login |
| `DADOS_DIR` | `~/.omniroute` | Diretório de dados (banco de dados, uso, logs) |
| `PORTO` | padrão da estrutura | Porta de serviço (`20128` nos exemplos) |
| `NOME DO ANFITRIÃO` | padrão da estrutura | Vincular host (o padrão do Docker é `0.0.0.0`) |
| `NODE_ENV` | padrão de tempo de execução | Defina `produção` para implantação |
| `BASE_URL` | `http://localhost:20128` | URL base interna do lado do servidor |
| `CLOUD_URL` | `https://omniroute.dev` | URL base do endpoint de sincronização em nuvem |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Segredo HMAC para chaves de API geradas |
| `REQUIRE_API_KEY` | `falso` | Aplicar chave de API do portador em `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `falso` | Permitir que o Api Manager copie chaves de API completas sob demanda |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Cadência de atualização do lado do servidor para dados armazenados em cache do Provider Limits; Os botões de atualização da IU ainda acionam a sincronização manual |
| `DISABLE_SQLITE_AUTO_BACKUP` | `falso` | Desative os instantâneos automáticos do SQLite antes de gravar/importar/restaurar; backups manuais ainda funcionam |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `falso` | Forçar cookie de autenticação `Secure` (por trás do proxy reverso HTTPS) |
| `CLOUDFLARED_BIN` | desarmar | Use um binário `cloudflared` existente em vez de download gerenciado |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transporte para Quick Tunnels gerenciados (`http2`, `quic` ou `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Limite de heap do Node.js em MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Máximo de entradas de cache de prompt |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Máximo de entradas de cache semântico |Para obter a referência completa da variável de ambiente, consulte o [README](../README.md).---

## 📊 Available Models

<detalhes>
<summary><b>Ver todos os modelos disponíveis</b></summary>

**Código Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATUITO: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copiloto do GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— US$ 0,6/1 milhão: `glm/glm-4.7`

**MiniMax (`minimax/`)**— US$ 0,2/1 milhão: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATUITO: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATUITO: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATUITO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexidade (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Juntos AI (`juntos/`)**: `juntos/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**IA do Fireworks (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Adicione qualquer ID de modelo a qualquer provedor sem esperar por uma atualização do aplicativo:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Ou use o Dashboard:**Provedores → [Provedor] → Modelos personalizados**.

Notas:

- Provedores compatíveis com OpenRouter e OpenAI/Anthropic são gerenciados apenas a partir de**Modelos disponíveis**. Adição manual, importação e sincronização automática estão na mesma lista de modelos disponíveis, portanto, não há uma seção separada de modelos personalizados para esses provedores.
- A seção**Modelos Personalizados**destina-se a provedores que não expõem importações gerenciadas de modelos disponíveis.### Dedicated Provider Routes

Encaminhe solicitações diretamente para um provedor específico com validação de modelo:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

O prefixo do provedor é adicionado automaticamente se estiver ausente. Modelos incompatíveis retornam `400`.### Network Proxy Configuration

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
````

**Precedência:**Específico da chave → Específico do combo → Específico do provedor → Global → Ambiente.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Retorna modelos agrupados por provedor com tipos (`chat`, `embedding`, `image`).### Cloud Sync

- Sincronize provedores, combos e configurações entre dispositivos
- Sincronização automática em segundo plano com tempo limite + falha rápida
- Prefira `BASE_URL`/`CLOUD_URL` do lado do servidor em produção### Cloudflare Quick Tunnel

- Disponível em**Dashboard → Endpoints**para Docker e outras implantações auto-hospedadas
- Cria um URL `https://*.trycloudflare.com` temporário que encaminha para seu endpoint `/v1` compatível com OpenAI atual
- Primeiro habilite a instalação do `cloudflared` somente quando necessário; depois reinicia reutilizar o mesmo binário gerenciado
- Os Quick Tunnels não são restaurados automaticamente após um OmniRoute ou reinicialização do contêiner; reative-os no painel quando necessário
- Os URLs do túnel são efêmeros e mudam sempre que você interrompe/inicia o túnel
- Túneis rápidos gerenciados padrão para transporte HTTP/2 para evitar avisos de buffer QUIC UDP barulhentos em contêineres restritos
- Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` se desejar substituir a opção de transporte gerenciado
- Defina `CLOUDFLARED_BIN` se preferir usar um binário `cloudflared` pré-instalado em vez do download gerenciado### LLM Gateway Intelligence (Phase 9)

-**Cache Semântico**— Armazena automaticamente em cache sem streaming, respostas de temperatura = 0 (ignorar com `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Desduplica solicitações em 5s por meio do cabeçalho `Idempotency-Key` ou `X-Request-Id` -**Acompanhamento de progresso**— Eventos SSE `event: progress` opcionais por meio do cabeçalho `X-OmniRoute-Progress: true`---

### Translator Playground

Acesso via**Painel → Tradutor**. Depure e visualize como o OmniRoute traduz solicitações de API entre provedores.

| Modo                      | Finalidade                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Parque Infantil**       | Selecione os formatos de origem/destino, cole uma solicitação e veja o resultado traduzido instantaneamente |
| **Testador de bate-papo** | Envie mensagens de chat ao vivo através do proxy e inspecione todo o ciclo de solicitação/resposta          |
| **Banco de testes**       | Execute testes em lote em múltiplas combinações de formatos para verificar a exatidão da tradução           |
| **Monitoramento ao vivo** | Assista às traduções em tempo real enquanto as solicitações fluem pelo proxy                                |

**Casos de uso:**

- Depure por que uma combinação específica de cliente/provedor falha
- Verifique se as tags de pensamento, as chamadas de ferramentas e os prompts do sistema são traduzidos corretamente
- Compare as diferenças de formato entre os formatos OpenAI, Claude, Gemini e Responses API---

### Routing Strategies

Configure via**Painel → Configurações → Roteamento**.

| Estratégia                       | Descrição                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Preencha primeiro**            | Usa contas em ordem de prioridade – a conta principal lida com todas as solicitações até ficar indisponível   |
| **Round Robin**                  | Percorre todas as contas com um limite fixo configurável (padrão: 3 chamadas por conta)                       |
| **P2C (Poder de Duas Escolhas)** | Escolhe 2 contas aleatórias e direciona para a mais saudável — equilibra a carga com a consciência da saúde   |
| **Aleatório**                    | Seleciona aleatoriamente uma conta para cada solicitação usando o embaralhamento Fisher-Yates                 |
| **Menos usado**                  | Roteia para a conta com o carimbo de data/hora `lastUsedAt` mais antigo, distribuindo o tráfego uniformemente |
| **Custo Otimizado**              | Rotas para a conta com menor valor de prioridade, otimizando para provedores de menor custo                   | #### External Sticky Session Header |

Para afinidade de sessão externa (por exemplo, agentes Claude Code/Codex por trás de proxies reversos), envie:```http
X-Session-Id: your-session-key

````

OmniRoute também aceita `x_session_id` e retorna a chave de sessão efetiva em `X-OmniRoute-Session-Id`.

Se você usa Nginx e envia cabeçalhos em formato de sublinhado, habilite:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Crie padrões curinga para remapear nomes de modelos:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Os curingas suportam `*` (qualquer caractere) e `?` (caractere único).#### Fallback Chains

Defina cadeias de fallback globais que se aplicam a todas as solicitações:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configure via**Painel → Configurações → Resiliência**.

OmniRoute implementa resiliência em nível de provedor com quatro componentes:

1.**Perfis de Provedores**— Configuração por provedor para:

- Limite de falha (quantas falhas antes da abertura)
- Duração do resfriamento
- Sensibilidade de detecção de limite de taxa
- Parâmetros de espera exponencial

  2.**Limites de taxa editáveis**— Padrões de nível de sistema configuráveis no painel: -**Solicitações por minuto (RPM)**— Máximo de solicitações por minuto por conta -**Tempo mínimo entre solicitações**— Intervalo mínimo em milissegundos entre solicitações -**Máximo de solicitações simultâneas**— Máximo de solicitações simultâneas por conta

- Clique em**Editar**para modificar e depois em**Salvar**ou**Cancelar**. Os valores persistem por meio da API de resiliência.

  3.**Disjuntor**— Rastreia falhas por provedor e abre automaticamente o circuito quando um limite é atingido: -**FECHADO**(Saudável) — As solicitações fluem normalmente -**OPEN**— O provedor é bloqueado temporariamente após falhas repetidas -**HALF_OPEN**— Testando se o provedor se recuperou

  4.**Políticas e identificadores bloqueados**— Mostra o status do disjuntor e identificadores bloqueados com capacidade de desbloqueio forçado.

  5.**Detecção automática de limite de taxa**— Monitora os cabeçalhos `429` e `Retry-After` para evitar proativamente atingir os limites de taxa do provedor.

**Dica profissional:**Use o botão**Redefinir tudo**para limpar todos os disjuntores e resfriamentos quando um provedor se recupera de uma interrupção.---

### Database Export / Import

Gerencie backups de banco de dados em**Painel → Configurações → Sistema e armazenamento**.

| Ação                        | Descrição                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Exportar banco de dados** | Baixa o banco de dados SQLite atual como um arquivo `.sqlite`                                                                                                             |
| **Exportar tudo (.tar.gz)** | Baixa um arquivo de backup completo, incluindo: banco de dados, configurações, combos, conexões de provedor (sem credenciais), metadados de chave API                     |
| **Importar banco de dados** | Carregue um arquivo `.sqlite` para substituir o banco de dados atual. Um backup de pré-importação é criado automaticamente, a menos que `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Validação de importação:**O arquivo importado é validado quanto à integridade (verificação de pragma SQLite), tabelas necessárias (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) e tamanho (máximo de 100 MB).

**Casos de uso:**

- Migrar OmniRoute entre máquinas
- Crie backups externos para recuperação de desastres
- Compartilhe configurações entre membros da equipe (exportar tudo → compartilhar arquivo)---

### Settings Dashboard

A página de configurações está organizada em 6 guias para facilitar a navegação:

| Guia | Conteúdo |
| -------------- | --------------------------------------------------------------------------------------------- |
|**Geral**| Ferramentas de armazenamento do sistema, configurações de aparência, controles de tema e visibilidade da barra lateral por item |
|**Segurança**| Configurações de login/senha, controle de acesso IP, autenticação de API para `/models` e bloqueio de provedor |
|**Roteamento**| Estratégia de roteamento global (6 opções), aliases de modelo curinga, cadeias de fallback, padrões de combinação |
|**Resiliência**| Perfis de provedores, limites de taxas editáveis, status de disjuntores, políticas e identificadores bloqueados |
|**IA**| Pensando na configuração do orçamento, injeção de prompt do sistema global, estatísticas de cache de prompt |
|**Avançado**| Configuração de proxy global (HTTP/SOCKS5) |---

### Costs & Budget Management

Acesso via**Painel → Custos**.

| Guia | Finalidade |
| ----------- | --------------------------------------------------------------------------------------------------- |
|**Orçamento**| Defina limites de gastos por chave de API com orçamentos diários/semanais/mensais e rastreamento em tempo real |
|**Preços**| Visualize e edite entradas de preços de modelo — custo por 1 mil tokens de entrada/saída por provedor |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Acompanhamento de custos:**cada solicitação registra o uso do token e calcula o custo usando a tabela de preços. Veja detalhes em**Painel → Uso**por provedor, modelo e chave de API.---

### Audio Transcription

OmniRoute oferece suporte à transcrição de áudio por meio do endpoint compatível com OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Provedores disponíveis:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Formatos de áudio suportados: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configure o balanceamento por combo em**Painel → Combos → Criar/Editar → Estratégia**.

| Estratégia | Descrição |
| ------------------ | --------------------------------------------------------------------------------------- |
|**Round-Robin**| Gira pelos modelos sequencialmente |
|**Prioridade**| Tenta sempre o primeiro modelo; recorre apenas ao erro |
|**Aleatório**| Escolhe um modelo aleatório do combo para cada solicitação |
|**Ponderada**| Rotas proporcionalmente com base nos pesos atribuídos por modelo |
|**Menos usado**| Rotas para o modelo com o menor número de solicitações recentes (usa métricas combinadas) |
|**Custo Otimizado**| Rotas para o modelo mais barato disponível (usa tabela de preços) |

Os padrões de combinação global podem ser definidos em**Painel → Configurações → Roteamento → Padrões de combinação**.---

### Health Dashboard

Acesso via**Painel → Saúde**. Visão geral da integridade do sistema em tempo real com 6 cartões:

| Cartão | O que mostra |
| --------------------- | ----------------------------------------------------------- |
|**Status do sistema**| Tempo de atividade, versão, uso de memória, diretório de dados |
|**Provedor de Saúde**| Estado do disjuntor por fornecedor (Fechado/Aberto/Meio-aberto) |
|**Limites de Tarifas**| Cooldowns de limite de taxa ativa por conta com tempo restante |
|**Bloqueios ativos**| Prestadores bloqueados temporariamente pela política de lockout |
|**Cache de Assinaturas**| Estatísticas do cache de desduplicação (chaves ativas, taxa de acertos) |
|**Telemetria de latência**| Agregação de latência p50/p95/p99 por provedor |

**Dica profissional:**a página Saúde é atualizada automaticamente a cada 10 segundos. Use a placa do disjuntor para identificar quais provedores estão enfrentando problemas.---

## 🖥️ Desktop Application (Electron)

OmniRoute está disponível como um aplicativo de desktop nativo para Windows, macOS e Linux.### Instalar

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Saída → `elétron/dist-elétron/`### Key Features

| Recurso                               | Descrição                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| **Prontidão do servidor**             | Pesquisa o servidor antes de mostrar a janela (sem tela em branco)           |
| **Bandeja do sistema**                | Minimizar para a bandeja, alterar a porta, sair do menu da bandeja           |
| **Gerenciamento Portuário**           | Alterar a porta do servidor na bandeja (reinicia automaticamente o servidor) |
| **Política de segurança de conteúdo** | CSP restritivo por meio de cabeçalhos de sessão                              |
| **Instância única**                   | Apenas uma instância de aplicativo pode ser executada por vez                |
| **Modo off-line**                     | Servidor Next.js incluído funciona sem internet                              | ### Environment Variables |

| Variável              | Padrão  | Descrição                                |
| --------------------- | ------- | ---------------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Porta do servidor                        |
| `OMNIROUTE_MEMORY_MB` | `512`   | Limite de heap do Node.js (64–16.384 MB) |

📖 Documentação completa: [`electron/README.md`](../electron/README.md)
