---
title: "Providers Guide: Connect AI Models to OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-06
---

# Providers Guide: Connect AI Models to OmniRoute

> **TL;DR**: A provider is a connection to an AI service (like OpenAI, Anthropic, Google). You need at least one provider to use OmniRoute.

---

## What Is a Provider?

Think of a provider like a **phone carrier**. Just as you need a phone carrier to make calls, you need an AI provider to use AI models. OmniRoute is like a phone that works with **all carriers** — you can switch between them automatically.

### Types of Providers

| Type           | What It Is                | Examples                          | Cost                   |
| -------------- | ------------------------- | --------------------------------- | ---------------------- |
| **Free**       | No payment required       | Kiro, OpenCode Free, Pollinations | $0                     |
| **API Key**    | You need an API key       | OpenAI, Anthropic, Google         | Pay per use            |
| **OAuth**      | Login with your account   | Claude Code, GitHub Copilot       | Subscription           |
| **Web Cookie** | Uses your browser session | ChatGPT Web (Codex), Gemini Web   | $0 (uses your account) |

### Web Cookie Providers

See **[WEB-COOKIE-GUIDE.md](./WEB-COOKIE-GUIDE.md)** for general setup instructions, limitations, troubleshooting, and provider-specific authentication guidance.
---

## Quick Start: Connect Your First Provider

### Optional first-run free-provider setup

The first-run wizard offers an explicit **Set up free providers** card. It derives the current
eligible list from OmniRoute's no-auth provider registry, then lets you review and deselect each
provider before confirming. OmniRoute shows the provider's caution notice and a link to its site
so you can review third-party terms, privacy, availability, and rate limits first.

This action is optional: finishing the wizard never creates free-provider connections silently.
It creates only providers that are still missing, leaves existing customized connections
untouched, and reports created, already-configured, and failed providers individually. You can
safely retry only the failures after a partial result.

### Option A: Free Provider (No Credit Card)

1. Open the dashboard at `http://localhost:20128`
2. Go to **Providers** → **Add Provider**
3. Select one of these free providers:
   - **Kiro AI** — Free Claude models (no auth needed)
   - **OpenCode Free** — Free GPT models (no auth needed)
   - **Pollinations** — Free GPT-5, Claude, Gemini (no key needed)
   - **LongCat** — 10M tokens free (one-time grant, requires account + KYC)
   - **Cloudflare AI** — 50+ models, 10K neurons/day
   - **MLX Gemma 26B** — Local Apple Silicon model (~38.5 tok/s, ~15.9GB RAM)
   - **MLX Qwen 3.8 27B** — Local Apple Silicon model (~9.1 tok/s, ~13.1GB RAM)
4. Click **Connect**
5. Done! You now have free AI access.

### Option B: API Key Provider (Paid)

1. Get an API key from the provider's website:
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Anthropic**: https://console.anthropic.com/
   - **Google**: https://aistudio.google.com/apikey
   - **DeepSeek**: https://platform.deepseek.com/
   - **Groq**: https://console.groq.com/
2. Open the dashboard at `http://localhost:20128`
3. Go to **Providers** → **Add Provider**
4. Select your provider
5. Paste your API key
6. Click **Connect**
7. Done! You now have access to that provider's models.

### Option C: OAuth Provider (Subscription)

1. Open the dashboard at `http://localhost:20128`
2. Go to **Providers** → **Add Provider**
3. Select your provider (e.g., Claude Code, GitHub Copilot)
4. Click **Connect with OAuth**
5. Login with your account
6. Done! You now have access to your subscription models.

### Option D: Local MLX Models (Apple Silicon)

For Apple Silicon Macs with unified memory, OmniRoute supports connecting to local MLX models running via `mlx-lm.server` as regular OpenAI-compatible local providers.

#### Prerequisites

- **Apple Silicon Mac** (M1/M2/M3/M4) with 24GB+ unified memory recommended
- **uv** package manager: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- **mlx-lm**: `uv pip install mlx-lm`

#### Quick Start

1. **Install dependencies**:

   ```bash
   # Install uv if not already installed
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # Install mlx-lm
   uv pip install mlx-lm
   ```

2. **Start MLX servers manually** (in separate terminals):

   ```bash
   # Terminal 1: Gemma 4 26B A4B IT-QAT (port 11435)
   uv run mlx_lm.server --model mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned --port 11435 --host 127.0.0.1

   # Terminal 2: Qwen 3.8 27B MLX Mixed (port 11436)
   uv run mlx_lm.server --model maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw --port 11436 --host 127.0.0.1
   ```

3. **Connect in OmniRoute Dashboard**:
   - Go to **Providers** → **Add Provider**
   - Select **MLX Gemma 26B** or **MLX Qwen 3.8 27B**
   - Click **Connect** (no API key needed)

4. **Use with OpenCode**:
   ```bash
   # Configure OpenCode to use OmniRoute
   opencode config set api.base_url http://localhost:20128/v1
   opencode config set api.key <your-omniroute-api-key>

   # Use MLX models
   opencode run --model mlx-gemma/gemma-4-26b
   opencode run --model mlx-qwen/qwen3.8-27b
   ```

#### Memory Management

**Important**: With 24GB unified memory, only **one large MLX model can run at a time**.

- Gemma 26B: ~15.9GB peak memory
- Qwen 3.8 27B: ~13.1GB peak memory

You must manage this manually:

- Run only one MLX server at a time, or
- Run both on separate machines, or
- Stop one before starting the other

OmniRoute does not automatically manage MLX server processes — it only routes requests to the OpenAI-compatible endpoints you configure.

#### Tool Calling Support

Both models support OpenAI-compatible tool calling. Test with:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mlx-gemma/gemma-4-26b",
    "messages": [{"role": "user", "content": "What is 2+2? Use the calculator tool."}],
    "tools": [{"type": "function", "function": {"name": "calculator", "description": "Calculate", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}, "required": ["expression"]}}}]
  }'
```

#### Troubleshooting

| Issue              | Solution                                                                      |
| ------------------ | ----------------------------------------------------------------------------- |
| Server won't start | Check `uv run mlx_lm.server --help` and verify model IDs                      |
| Out of memory      | Ensure only one model runs; close other apps; check Activity Monitor          |
| Connection refused | Verify server is running on correct port (11435/11436)                        |
| Slow responses     | First request loads model into memory (~30-60s); subsequent requests are fast |
| Tool calling fails | Ensure model supports tools; check OmniRoute logs for translation errors      |

---

## Best Free Providers

These providers offer **free access** with no credit card:

| Provider          | Free Quota       | Models                                   | How to Connect |
| ----------------- | ---------------- | ---------------------------------------- | -------------- |
| **Kiro AI**       | 50 credits/month | Claude Sonnet 4.5, Haiku 4.5, Opus 4.6   | No auth needed |
| **OpenCode Free** | Unlimited        | GPT-4o, Claude, Gemini                   | No auth needed |
| **Pollinations**  | No key needed    | GPT-5, Claude, Gemini, DeepSeek, Llama 4 | No auth needed |
| **LongCat**       | 10M one-time     | LongCat-2.0                              | API key + KYC  |
| **Cloudflare AI** | 10K neurons/day  | 50+ models                               | No auth needed |
| **NVIDIA NIM**    | ~40 RPM          | 129 models                               | API key needed |
| **Cerebras**      | $5 signup credit | GLM 4.7, GPT-OSS 120B                    | API key + card |
| **Qoder**         | Unlimited        | Kimi-K2, DeepSeek-R1, Qwen3-coder        | No auth needed |

**Tip**: Connect multiple free providers for **unlimited free AI** with automatic fallback!

---

## Best Paid Providers

These providers offer **high-quality models** with API keys:

| Provider      | Best Models                 | Cost                   | Free Tier          |
| ------------- | --------------------------- | ---------------------- | ------------------ |
| **OpenAI**    | GPT-5, GPT-4o               | $2.50-$10/1M tokens    | $5 free credits    |
| **Anthropic** | Claude Opus 4.6, Sonnet 4.6 | $3-$15/1M tokens       | $5 free credits    |
| **Google**    | Gemini 2.5 Pro, Flash       | $0.075-$1.25/1M tokens | 1,500 req/day free |
| **DeepSeek**  | DeepSeek V4                 | $0.14-$0.28/1M tokens  | 5M free tokens     |
| **Groq**      | Llama 4, Mixtral            | $0.05-$0.27/1M tokens  | 30 RPM free        |
| **xAI**       | Grok 3                      | $0.30-$0.60/1M tokens  | —                  |

---

## How to Connect a Provider (Step-by-Step)

### Step 1: Open the Dashboard

Go to `http://localhost:20128` in your browser.

### Step 2: Go to Providers

Click **Providers** in the sidebar.

### Step 3: Click Add Provider

Click the **+ Add Provider** button.

### Step 4: Select Your Provider

Browse the list or search for your provider. Click on it.

### Step 5: Enter Credentials

- **Free providers**: No credentials needed — just click **Connect**
- **API key providers**: Paste your API key
- **OAuth providers**: Click **Connect with OAuth** and login

### Step 6: Test the Connection

Click **Test Connection** to verify it works.

### Step 7: Done!

Your provider is now connected. You can use it with `model: "auto"` or specify the provider directly.

---

## Using Multiple Providers

OmniRoute works best with **multiple providers**. This gives you:

- **Automatic fallback** — If one provider fails, OmniRoute tries the next
- **Cost optimization** — OmniRoute picks the cheapest provider for each request
- **Speed optimization** — OmniRoute picks the fastest provider for each request
- **Quality optimization** — OmniRoute picks the best provider for each task

### Recommended Setup

Connect at least **3 providers** for the best experience:

1. **One free provider** (Kiro, OpenCode Free, or Pollinations) — Always available
2. **One fast provider** (Groq, Cerebras) — For quick responses
3. **One quality provider** (OpenAI, Anthropic, Google) — For complex tasks

Then use `model: "auto"` and OmniRoute will automatically pick the best one for each request.

---

## Provider-Specific Setup

### OpenAI

1. Get API key: https://platform.openai.com/api-keys
2. In OmniRoute: Providers → Add Provider → OpenAI
3. Paste API key → Connect

### Anthropic

1. Get API key: https://console.anthropic.com/
2. In OmniRoute: Providers → Add Provider → Anthropic
3. Paste API key → Connect

### Google (Gemini)

1. Get API key: https://aistudio.google.com/apikey
2. In OmniRoute: Providers → Add Provider → Gemini
3. Paste API key → Connect

### DeepSeek

1. Get API key: https://platform.deepseek.com/
2. In OmniRoute: Providers → Add Provider → DeepSeek
3. Paste API key → Connect

### Groq

1. Get API key: https://console.groq.com/
2. In OmniRoute: Providers → Add Provider → Groq
3. Paste API key → Connect

---

## Common Questions

### "Do I need to pay to use OmniRoute?"

**No!** OmniRoute is free and open-source. You can use free providers (Kiro, OpenCode Free, Pollinations) without paying anything. You only pay if you choose to use paid providers.

### "Which provider should I start with?"

Start with **Kiro AI** — it's free, requires no API key, and gives you access to Claude models. Then add more providers as needed.

### "Can I use multiple providers at once?"

**Yes!** That's the whole point of OmniRoute. Connect multiple providers and use `model: "auto"` to let OmniRoute pick the best one for each request.

### "What if a provider goes down?"

OmniRoute automatically skips failed providers and tries the next one. You don't need to do anything.

### "How do I disconnect a provider?"

Go to Providers → click on the provider → click **Disconnect**.

### "Can I use my existing API keys?"

**Yes!** If you already have API keys for OpenAI, Anthropic, Google, etc., you can use them in OmniRoute. Just paste them when connecting the provider.

---

## What's Next?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — Let OmniRoute pick the best AI for you
- **[Free Tiers Guide](./FREE-TIERS-GUIDE.md)** — Get free AI with no credit card
- **[Troubleshooting](../guides/TROUBLESHOOTING.md)** — Fix common issues
- **[Provider Reference](../reference/PROVIDER_REFERENCE.md)** — Full list of 226 providers

## Cursor images

Cursor plan images use `IMAGE_PROVIDERS.cursor` (`cursor-agent-image`). See [CURSOR_IMAGE.md](../providers/CURSOR_IMAGE.md).
