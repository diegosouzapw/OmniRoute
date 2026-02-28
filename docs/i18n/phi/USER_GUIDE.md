# Gabay sa Gumagamit

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Kumpletong gabay para sa pag-configure ng mga provider, paggawa ng mga combo, pagsasama ng mga tool sa CLI, at pag-deploy ng OmniRoute.

---

## Talaan ng mga Nilalaman

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Pagpepresyo sa isang Sulyap

| Tier                | Provider          | Gastos                     | I-reset ang Quota    | Pinakamahusay Para sa          |
| ------------------- | ----------------- | -------------------------- | -------------------- | ------------------------------ |
| **💳 SUBSCRIPTION** | Claude Code (Pro) | $20/buwan                  | 5h + lingguhan       | Naka-subscribe na              |
|                     | Codex (Plus/Pro)  | $20-200/buwan              | 5h + lingguhan       | Mga user ng OpenAI             |
|                     | Gemini CLI        | **LIBRE**                  | 180K/buwan + 1K/araw | Lahat!                         |
|                     | GitHub Copilot    | $10-19/buwan               | Buwanang             | Mga user ng GitHub             |
| **🔑 API KEY**      | DeepSeek          | Magbayad sa bawat paggamit | Wala                 | Murang pangangatwiran          |
|                     | Groq              | Magbayad sa bawat paggamit | Wala                 | Napakabilis na hinuha          |
|                     | xAI (Grok)        | Magbayad sa bawat paggamit | Wala                 | Grok 4 na pangangatwiran       |
|                     | Mistral           | Magbayad sa bawat paggamit | Wala                 | Mga modelong naka-host sa EU   |
|                     | Pagkagulo         | Magbayad sa bawat paggamit | Wala                 | Search-augmented               |
|                     | Magkasama AI      | Magbayad sa bawat paggamit | Wala                 | Open-source na mga modelo      |
|                     | Fireworks AI      | Magbayad sa bawat paggamit | Wala                 | Mabilis na FLUX na mga larawan |
|                     | Cerebras          | Magbayad sa bawat paggamit | Wala                 | Wafer-scale na bilis           |
|                     | Cohere            | Magbayad sa bawat paggamit | Wala                 | Command R+ RAG                 |
|                     | NVIDIA NIM        | Magbayad sa bawat paggamit | Wala                 | Mga modelo ng enterprise       |
| **💰 MURA**         | GLM-4.7           | $0.6/1M                    | Araw-araw 10AM       | Backup ng badyet               |
|                     | MiniMax M2.1      | $0.2/1M                    | 5 oras na rolling    | Pinaka murang opsyon           |
|                     | Kimi K2           | $9/buwan flat              | 10M token/buwan      | Nahuhulaang gastos             |
| **🆓 LIBRE**        | iFlow             | $0                         | Walang limitasyong   | 8 mga modelong libre           |
|                     | Qwen              | $0                         | Walang limitasyong   | 3 mga modelong libre           |
|                     | Kiro              | $0                         | Walang limitasyong   | Claude libre                   |

**💡 Pro Tip:** Magsimula sa Gemini CLI (180K libre/buwan) + iFlow (walang limitasyong libre) combo = $0 na halaga!

---

## 🎯 Use Cases

### Case 1: "May subscription ako sa Claude Pro"

**Problema:** Nag-e-expire ang quota nang hindi nagamit, mga limitasyon sa rate sa panahon ng mabigat na coding

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Case 2: "Gusto ko ng zero cost"

**Problema:** Hindi kayang bayaran ang mga subscription, kailangan ng maaasahang AI coding

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Case 3: "Kailangan ko ng 24/7 coding, walang mga pagkaantala"

**Problema:** Mga deadline, hindi kayang bayaran ang downtime

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

### Kaso 4: "Gusto ko ng LIBRENG AI sa OpenClaw"

**Problema:** Kailangan ng AI assistant sa mga app sa pagmemensahe, ganap na libre

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Setup ng Provider

### 🔐 Mga Tagabigay ng Subscription

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

**Pro Tip:** Gamitin ang Opus para sa mga kumplikadong gawain, Soneto para sa bilis. Sinusubaybayan ng OmniRoute ang quota bawat modelo!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (LIBRE 180K/buwan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Pinakamahusay na Halaga:** Malaking libreng tier! Gamitin ito bago ang mga bayad na tier.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Mga Murang Provider

#### GLM-4.7 (Araw-araw na pag-reset, $0.6/1M)

1. Mag-sign up: [Zhipu AI](https://open.bigmodel.cn/)
2. Kumuha ng API key mula sa Coding Plan
3. Dashboard → Magdagdag ng API Key: Provider: `glm`, API Key: `your-key`

**Gamitin:** `glm/glm-4.7` — **Pro Tip:** Nag-aalok ang Coding Plan ng 3× na quota sa 1/7 na halaga! I-reset araw-araw 10:00 AM.

#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Mag-sign up: [MiniMax](https://www.minimax.io/)
2. Kunin ang API key → Dashboard → Magdagdag ng API Key

**Gamitin:** `minimax/MiniMax-M2.1` — **Pro Tip:** Pinakamamurang opsyon para sa mahabang konteksto (1M token)!

#### Kimi K2 ($9/month flat)

1. Mag-subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Kunin ang API key → Dashboard → Magdagdag ng API Key

**Gamitin:** `kimi/kimi-latest` — **Pro Tip:** Nakapirming $9/buwan para sa 10M token = $0.90/1M epektibong gastos!

### 🆓 LIBRENG Provider

#### iFlow (8 LIBRENG modelo)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 LIBRENG modelo)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude LIBRE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Mga combo

### Halimbawa 1: I-maximize ang Subscription → Murang Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Halimbawa 2: Libre-Lamang (Zero na Gastos)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Pagsasama ng CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

I-edit ang `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

I-edit ang `~/.openclaw/openclaw.json`:

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

**O gumamit ng Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Magpatuloy / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Deployment

### VPS Deployment

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

Para sa host-integrated mode na may mga CLI binary, tingnan ang seksyong Docker sa mga pangunahing doc.

### Mga Variable ng Environment

| Variable              | Default                              | Paglalarawan                                                       |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT signing secret (**pagbabago sa produksyon**)                   |
| `INITIAL_PASSWORD`    | `123456`                             | Unang login password                                               |
| `DATA_DIR`            | `~/.omniroute`                       | Direktoryo ng data (db, paggamit, mga log)                         |
| `PORT`                | default na framework                 | Port ng serbisyo (`20128` sa mga halimbawa)                        |
| `HOSTNAME`            | default na framework                 | Bind host (Docker default sa `0.0.0.0`)                            |
| `NODE_ENV`            | default na runtime                   | Itakda ang `production` para sa pag-deploy                         |
| `BASE_URL`            | `http://localhost:20128`             | Panloob na base URL sa gilid ng server                             |
| `CLOUD_URL`           | `https://omniroute.dev`              | Cloud sync endpoint base URL                                       |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC secret para sa mga nabuong API key                            |
| `REQUIRE_API_KEY`     | `false`                              | Ipatupad ang Bearer API key sa `/v1/*`                             |
| `ENABLE_REQUEST_LOGS` | `false`                              | Pinapagana ang mga log ng kahilingan/tugon                         |
| `AUTH_COOKIE_SECURE`  | `false`                              | Pilitin ang `Secure` auth cookie (sa likod ng HTTPS reverse proxy) |

Para sa buong environment variable reference, tingnan ang [README](../README.md).

---

## 📊 Mga Magagamit na Modelo

<details>
<summary><b>Tingnan ang lahat ng available na modelo</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — LIBRE: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — LIBRE: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — LIBRE: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — LIBRE: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Pagkakagulo (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Magkasama AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Mga Advanced na Tampok

### Mga Custom na Modelo

Magdagdag ng anumang ID ng modelo sa anumang provider nang hindi naghihintay ng update ng app:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

O gamitin ang Dashboard: **Mga Provider → [Provider] → Mga Custom na Modelo**.

### Nakalaang Mga Ruta ng Provider

Direktang iruta ang mga kahilingan sa isang partikular na provider na may pagpapatunay ng modelo:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Ang prefix ng provider ay awtomatikong idinaragdag kung nawawala. Ang mga hindi tugmang modelo ay nagbabalik ng `400`.

### Network Proxy Configuration

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

**Precedence:** Key-specific → Combo-specific → Provider-specific → Global → Environment.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Ibinabalik ang mga modelong nakapangkat ayon sa provider na may mga uri (`chat`, `embedding`, `image`).

### Cloud Sync

- I-sync ang mga provider, combo, at mga setting sa mga device
- Awtomatikong pag-sync sa background na may timeout + mabilis na mabibigo
- Mas gusto ang server-side `BASE_URL`/`CLOUD_URL` sa produksyon

### LLM Gateway Intelligence (Phase 9)

- **Semantic Cache** — Auto-cache non-streaming, temperature=0 na tugon (bypass gamit ang `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** — Nagde-deduplicate ng mga kahilingan sa loob ng 5s sa pamamagitan ng `Idempotency-Key` o `X-Request-Id` header
- **Pagsubaybay sa Pag-unlad** — Mag-opt-in sa SSE `event: progress` na mga kaganapan sa pamamagitan ng `X-OmniRoute-Progress: true` header

---

### Palaruan ng Tagasalin

Access sa pamamagitan ng **Dashboard → Translator**. I-debug at i-visualize kung paano isinasalin ng OmniRoute ang mga kahilingan sa API sa pagitan ng mga provider.

| Mode             | Layunin                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Laruan**       | Pumili ng pinagmulan/target na mga format, i-paste ang isang kahilingan, at makita agad ang isinaling output      |
| **Chat Tester**  | Magpadala ng mga mensahe sa live chat sa pamamagitan ng proxy at siyasatin ang buong cycle ng kahilingan/pagtugon |
| **Test Bench**   | Magpatakbo ng mga batch test sa maraming kumbinasyon ng format upang i-verify ang kawastuhan ng pagsasalin        |
| **Live Monitor** | Manood ng mga real-time na pagsasalin habang dumadaloy ang mga kahilingan sa pamamagitan ng proxy                 |

**Mga kaso ng paggamit:**

- I-debug kung bakit nabigo ang isang partikular na kumbinasyon ng kliyente/provider
- I-verify na ang mga tag ng pag-iisip, mga tawag sa tool, at mga prompt ng system ay naisalin nang tama
- Ihambing ang mga pagkakaiba sa format sa pagitan ng mga format ng OpenAI, Claude, Gemini, at Responses API

---

### Mga Istratehiya sa Pagruruta

I-configure sa pamamagitan ng **Dashboard → Mga Setting → Pagruruta**.

| Diskarte                       | Paglalarawan                                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Punan muna**                 | Gumagamit ng mga account sa pagkakasunud-sunod ng priyoridad — pinangangasiwaan ng pangunahing account ang lahat ng kahilingan hanggang sa hindi magamit |
| **Round Robin**                | Umiikot sa lahat ng account na may na-configure na malagkit na limitasyon (default: 3 tawag sa bawat account)                                            |
| **P2C (Power of Two Choices)** | Pumili ng 2 random na account at ruta patungo sa mas malusog — binabalanse ang load nang may kamalayan sa kalusugan                                      |
| **Random**                     | Random na pumipili ng account para sa bawat kahilingan gamit ang Fisher-Yates shuffle                                                                    |
| **Hindi gaanong Nagamit**      | Mga ruta patungo sa account na may pinakamatandang `lastUsedAt` timestamp, na namamahagi ng trapiko nang pantay-pantay                                   |
| **Na-optimize ang Gastos**     | Mga ruta patungo sa account na may pinakamababang halaga ng priyoridad, na nag-o-optimize para sa mga provider na may pinakamababang halaga              |

#### Mga Alyas ng Modelong Wildcard

Lumikha ng mga pattern ng wildcard upang i-remap ang mga pangalan ng modelo:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Sinusuportahan ng mga wildcard ang `*` (anumang character) at `?` (solong character).

#### Fallback Chain

Tukuyin ang mga pandaigdigang fallback chain na nalalapat sa lahat ng kahilingan:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Resilience at Circuit Breaker

I-configure sa pamamagitan ng **Dashboard → Mga Setting → Resilience**.

Ang OmniRoute ay nagpapatupad ng pagiging matatag sa antas ng provider na may apat na bahagi:

1. **Provider Profile** — Configuration ng bawat provider para sa:
   - Failure threshold (ilang pagkabigo bago buksan)
   - Tagal ng cooldown
   - Rate limit detection sensitivity
   - Exponential backoff na mga parameter

2. **Editable Rate Limits** — System-level defaults configurable sa dashboard:
   - **Requests Per Minute (RPM)** — Mga maximum na kahilingan kada minuto bawat account
   - **Min Time Between Requests** — Minimum na agwat sa millisecond sa pagitan ng mga kahilingan
   - **Max Kasabay na Kahilingan** — Pinakamataas na sabay-sabay na kahilingan sa bawat account
   - I-click ang **I-edit** upang baguhin, pagkatapos ay **I-save** o **Kanselahin**. Nananatili ang mga halaga sa pamamagitan ng resilience API.

3. **Circuit Breaker** — Sinusubaybayan ang mga pagkabigo sa bawat provider at awtomatikong bubuksan ang circuit kapag naabot ang isang threshold:
   - **SARADO** (Healthy) — Normal na dumadaloy ang mga kahilingan
   - **OPEN** — Pansamantalang naka-block ang provider pagkatapos ng paulit-ulit na pagkabigo
   - **HALF_OPEN** — Pagsubok kung nakabawi na ang provider

4. **Mga Patakaran at Mga Naka-lock na Identifier** — Nagpapakita ng status ng circuit breaker at mga naka-lock na identifier na may kakayahan sa force-unlock.

5. **Awtomatikong Pagtukoy sa Limitasyon ng Rate** — Sinusubaybayan ang `429` at `Retry-After` na mga header upang aktibong maiwasang maabot ang mga limitasyon sa rate ng provider.

**Pro Tip:** Gamitin ang **I-reset Lahat** na button para i-clear ang lahat ng mga circuit breaker at cooldown kapag gumaling ang isang provider mula sa isang outage.

---

### Pag-export / Pag-import ng Database

Pamahalaan ang mga backup ng database sa **Dashboard → Mga Setting → System at Storage**.

| Aksyon                       | Paglalarawan                                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **I-export ang Database**    | Dina-download ang kasalukuyang database ng SQLite bilang isang `.sqlite` file                                                                                |
| **I-export Lahat (.tar.gz)** | Nagda-download ng buong backup na archive kabilang ang: database, mga setting, combo, mga koneksyon sa provider (walang mga kredensyal), metadata ng API key |
| **Import Database**          | Mag-upload ng `.sqlite` file upang palitan ang kasalukuyang database. Awtomatikong nagagawa ang isang pre-import na backup                                   |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Import Validation:** Ang na-import na file ay napatunayan para sa integridad (SQLite pragma check), kinakailangang mga talahanayan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`), at laki (max 100MB).

**Mga Kaso ng Paggamit:**

- I-migrate ang OmniRoute sa pagitan ng mga machine
- Lumikha ng mga panlabas na backup para sa pagbawi ng kalamidad
- Magbahagi ng mga pagsasaayos sa pagitan ng mga miyembro ng koponan (i-export lahat → ibahagi ang archive)

---

### Dashboard ng Mga Setting

Ang pahina ng mga setting ay isinaayos sa 5 tab para sa madaling pag-navigate:

| Tab           | Mga Nilalaman                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Seguridad** | Mga setting ng Login/Password, IP Access Control, API auth para sa `/models`, at Provider Blocking                                   |
| **Pagruruta** | Pandaigdigang diskarte sa pagruruta (6 na opsyon), wildcard model alias, fallback chain, combo default                               |
| **Katatagan** | Mga profile ng provider, mga limitasyon sa nae-edit na rate, status ng circuit breaker, mga patakaran at mga naka-lock na identifier |
| **AI**        | Pag-iisip ng configuration ng badyet, pandaigdigang system prompt injection, prompt cache stats                                      |
| **Advanced**  | Global proxy configuration (HTTP/SOCKS5)                                                                                             |

---

### Pamamahala ng Mga Gastos at Badyet

Access sa pamamagitan ng **Dashboard → Mga Gastos**.

| Tab             | Layunin                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Badyet**      | Magtakda ng mga limitasyon sa paggastos sa bawat API key na may pang-araw-araw/lingguhan/buwanang mga badyet at real-time na pagsubaybay |
| **Pagpepresyo** | Tingnan at i-edit ang mga entry sa pagpepresyo ng modelo — cost per 1K input/output token bawat provider                                 |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Pagsubaybay sa Gastos:** Ang bawat kahilingan ay nagtatala ng paggamit ng token at kinakalkula ang gastos gamit ang talahanayan ng pagpepresyo. Tingnan ang mga breakdown sa **Dashboard → Paggamit** ayon sa provider, modelo, at API key.

---

### Transkripsyon ng Audio

Sinusuportahan ng OmniRoute ang audio transcription sa pamamagitan ng OpenAI-compatible na endpoint:

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

Mga available na provider: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Mga sinusuportahang format ng audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Mga Diskarte sa Pagbalanse ng Combo

I-configure ang per-combo balancing sa **Dashboard → Combos → Create/Edit → Strategy**.

| Diskarte                  | Paglalarawan                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Round-Robin**           | Umiikot sa mga modelo nang sunud-sunod                                                             |
| **Priyoridad**            | Palaging sinusubukan ang unang modelo; bumabalik lamang sa error                                   |
| **Random**                | Pumipili ng random na modelo mula sa combo para sa bawat kahilingan                                |
| **Tinimbang**             | Mga rutang proporsyonal batay sa mga nakatalagang timbang sa bawat modelo                          |
| **Hindi gaanong Nagamit** | Mga ruta patungo sa modelo na may kaunting mga kamakailang kahilingan (gumagamit ng combo metrics) |
| **Cost-Optimized**        | Mga ruta patungo sa pinakamurang available na modelo (gumagamit ng talahanayan ng pagpepresyo)     |

Maaaring itakda ang mga global combo default sa **Dashboard → Settings → Routing → Combo Defaults**.

---

### Health Dashboard

Access sa pamamagitan ng **Dashboard → Health**. Real-time na pangkalahatang-ideya ng kalusugan ng system na may 6 na card:

| Card                       | Ano ang Ipinakikita Nito                                                            |
| -------------------------- | ----------------------------------------------------------------------------------- |
| **System Status**          | Uptime, bersyon, paggamit ng memorya, direktoryo ng data                            |
| **Kalusugan ng Provider**  | Status ng circuit breaker ng bawat provider (Sarado/Bukas/Kalahating Bukas)         |
| **Mga Limitasyon sa Rate** | Mga cooldown sa limitasyon ng aktibong rate sa bawat account na may natitirang oras |
| **Mga Aktibong Lockout**   | Pansamantalang na-block ang mga provider ng patakaran sa lockout                    |
| **Signature Cache**        | Deduplication cache stats (aktibong key, hit rate)                                  |
| **Latency Telemetry**      | p50/p95/p99 latency aggregation bawat provider                                      |

**Pro Tip:** Awtomatikong nagre-refresh ang page ng Health bawat 10 segundo. Gamitin ang circuit breaker card upang matukoy kung aling mga provider ang nakakaranas ng mga isyu.
