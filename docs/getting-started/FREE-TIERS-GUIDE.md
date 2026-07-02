# Free Tiers Guide: Get Free AI Without a Credit Card

> **TL;DR**: OmniRoute aggregates free tiers from 50+ providers. Connect multiple free providers for unlimited free AI with automatic fallback.

---

## What Are Free Tiers?

Many AI providers offer **free usage** — no credit card required. Think of it like free samples at a grocery store. You can try the product without paying.

OmniRoute **aggregates** these free tiers into one endpoint. Instead of signing up for 10 different services, you connect them all to OmniRoute and use `model: "auto"` to automatically pick the best free option for each request.

---

## Best Free Providers (No Credit Card)

### Tier 1: Free Forever (Unlimited)

These providers are **always free** with no limits:

| Provider | Models | Quota | How to Connect |
|----------|--------|-------|----------------|
| **Kiro AI** | Claude Sonnet 4.5, Haiku 4.5, Opus 4.6 | 50 credits/month | No auth needed |
| **OpenCode Free** | GPT-4o, Claude, Gemini | Unlimited | No auth needed |
| **Pollinations** | GPT-5, Claude, Gemini, DeepSeek, Llama 4 | No key needed | No auth needed |
| **LongCat** | LongCat-2.0 | 10M tokens (one-time) | API key + KYC |
| **Cloudflare AI** | 50+ models | 10K neurons/day | No auth needed |
| **Qwen** | Qwen3-coder-plus/flash/next | Unlimited | No auth needed |
| **Qoder** | Kimi-K2, DeepSeek-R1, Qwen3-coder | Unlimited | No auth needed |

### Tier 2: Free with Signup (Generous)

These providers give you **free credits** when you sign up:

| Provider | Free Credits | Models | How to Get |
|----------|-------------|--------|------------|
| **NVIDIA NIM** | ~40 RPM | 129 models | Sign up at build.nvidia.com |
| **Cerebras** | 1M tokens/day | Qwen3 235B, GPT-OSS 120B | Sign up at cerebras.ai |
| **DeepSeek** | 5M free tokens | DeepSeek V4 | Sign up at platform.deepseek.com |
| **Groq** | 30 RPM free | Llama 4, Mixtral | Sign up at console.groq.com |
| **OpenAI** | $5 free credits | GPT-5, GPT-4o | Sign up at platform.openai.com |
| **Anthropic** | $5 free credits | Claude Opus 4.6, Sonnet 4.6 | Sign up at console.anthropic.com |
| **Google** | 1,500 req/day | Gemini 2.5 Pro, Flash | Sign up at aistudio.google.com |

### Tier 3: Free with Limits (Specific Use Cases)

These providers have **free tiers** with specific limits:

| Provider | Free Limit | Models | Best For |
|----------|-----------|--------|----------|
| **Cerebras** | 1M tokens/day | Qwen3 235B | Fast inference |
| **NVIDIA NIM** | ~40 RPM | 129 models | Variety |
| **Groq** | 30 RPM | Llama 4, Mixtral | Speed |
| **Cloudflare AI** | 10K neurons/day | 50+ models | Variety |

---

## How to Stack Free Tiers

The magic of OmniRoute is **stacking free tiers**. Instead of relying on one provider, you connect multiple free providers and let OmniRoute automatically pick the best one for each request.

### Example: Unlimited Free AI

Connect these 4 providers for **unlimited free AI**:

1. **Kiro AI** — 50 credits/month (Claude models)
2. **OpenCode Free** — Unlimited (GPT models)
3. **Pollinations** — No key needed (multiple models)
4. **LongCat** — 10M tokens one-time (backup, requires KYC)

Then use `model: "auto"` and OmniRoute will:
- Try Kiro first (best quality)
- If Kiro is busy → try OpenCode Free
- If OpenCode Free is slow → try Pollinations
- If all fail → use LongCat as backup

**Result**: Unlimited free AI with automatic fallback!

---

## How to Connect Free Providers

### Step 1: Open the Dashboard

Go to `http://localhost:20128` in your browser.

### Step 2: Go to Providers

Click **Providers** in the sidebar.

### Step 3: Click Add Provider

Click the **+ Add Provider** button.

### Step 4: Select a Free Provider

Browse the list and select one of these free providers:
- **Kiro AI** — Free Claude models
- **OpenCode Free** — Free GPT models
- **Pollinations** — Free GPT-5, Claude, Gemini
- **LongCat** — 10M tokens free (one-time, requires KYC)
- **Cloudflare AI** — 50+ models, 10K neurons/day

### Step 5: Click Connect

No API key needed — just click **Connect**.

### Step 6: Repeat

Connect 3-4 free providers for the best experience.

---

## Free Provider Details

### Kiro AI

- **Models**: Claude Sonnet 4.5, Haiku 4.5, Opus 4.6
- **Quota**: 50 credits/month
- **Auth**: No auth needed
- **Best for**: High-quality Claude models

### OpenCode Free

- **Models**: GPT-4o, Claude, Gemini
- **Quota**: Unlimited
- **Auth**: No auth needed
- **Best for**: General-purpose AI

### Pollinations

- **Models**: GPT-5, Claude, Gemini, DeepSeek, Llama 4
- **Quota**: No key needed
- **Auth**: No auth needed
- **Best for**: Variety of models

### LongCat

- **Models**: LongCat-2.0
- **Quota**: 10M tokens, one-time grant on signup (not recurring daily/monthly)
- **Auth**: API key + KYC verification required to unlock the free grant
- **Best for**: A one-off free allowance; pay-as-you-go beyond it

### Cloudflare AI

- **Models**: 50+ models
- **Quota**: 10K neurons/day
- **Auth**: No auth needed
- **Best for**: Variety and reliability

### NVIDIA NIM

- **Models**: 129 models
- **Quota**: ~40 RPM
- **Auth**: Sign up at build.nvidia.com
- **Best for**: Variety and speed

### Cerebras

- **Models**: Qwen3 235B, GPT-OSS 120B
- **Quota**: 1M tokens/day
- **Auth**: Sign up at cerebras.ai
- **Best for**: Fast inference

### Qwen

- **Models**: Qwen3-coder-plus/flash/next
- **Quota**: Unlimited
- **Auth**: No auth needed
- **Best for**: Coding tasks

### Qoder

- **Models**: Kimi-K2, DeepSeek-R1, Qwen3-coder
- **Quota**: Unlimited
- **Auth**: No auth needed
- **Best for**: Coding tasks

---

## How OmniRoute Makes Free Tiers Better

### 1. Automatic Fallback

If one free provider is busy or down, OmniRoute automatically tries the next one. You don't need to do anything.

### 2. Smart Routing

OmniRoute picks the **best free provider** for each request based on:
- Speed — Which provider is fastest right now?
- Quality — Which provider is best for this task?
- Capacity — Which provider has quota remaining?

### 3. Token Savings

OmniRoute's **compression** feature saves 15-95% of tokens. This means your free quota lasts **5-20x longer**.

### 4. Multi-Account Support

If you have multiple accounts for the same provider, OmniRoute treats each as a separate candidate. This doubles or triples your free quota.

---

## Free Tier Math

Let's calculate how much free AI you can get:

### Conservative Estimate (3 providers)

| Provider | Daily Quota | Monthly Quota |
|----------|-------------|---------------|
| Kiro AI | ~1.7 credits | 50 credits |
| OpenCode Free | Unlimited | Unlimited |
| Pollinations | Unlimited | Unlimited |

**Total**: Unlimited free AI

### Aggressive Estimate (7 providers)

| Provider | Daily Quota | Monthly Quota |
|----------|-------------|---------------|
| Kiro AI | ~1.7 credits | 50 credits |
| OpenCode Free | Unlimited | Unlimited |
| Pollinations | Unlimited | Unlimited |
| LongCat | — (one-time) | 10M tokens (one-time, KYC) |
| Cloudflare AI | 10K neurons | 300K neurons |
| NVIDIA NIM | ~40 RPM | ~1.7M requests |
| Cerebras | 1M tokens | 30M tokens |

**Total**: ~1.6B documented free tokens/month — up to ~2.1B in your first month with signup credits (with compression: ~7.5B+ effective tokens)

---

## Common Questions

### "Is this really free?"

**Yes!** These are official free tiers from the providers. OmniRoute just makes it easier to use them all at once.

### "Will the free tier run out?"

Some providers have limits (like Kiro's 50 credits/month), but others are unlimited (like OpenCode Free and Pollinations). By connecting multiple providers, you always have a backup.

### "Can I use free providers for production?"

**Yes!** Many free providers are production-ready. However, for critical applications, consider adding a paid provider as a backup.

### "What's the catch?"

No catch! Providers offer free tiers to attract users. OmniRoute just makes it easier to use them all at once.

### "How do I get more free quota?"

1. Connect more free providers
2. Use compression to save tokens (15-95% savings)
3. Use `auto/cheap` to prioritize free/cheap providers
4. Create multiple accounts for the same provider

### "Do free providers have worse quality?"

**Not necessarily!** Many free providers offer the same models as paid providers. For example, Kiro gives you access to Claude Sonnet 4.5 — the same model you'd get with a paid Anthropic subscription.

---

## What's Next?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — Let OmniRoute pick the best AI for you
- **[Providers Guide](./PROVIDERS-GUIDE.md)** — Connect more providers
- **[Troubleshooting](./TROUBLESHOOTING.md)** — Fix common issues
- **[Free Tiers Reference](../reference/FREE_TIERS.md)** — Full list of free tiers
