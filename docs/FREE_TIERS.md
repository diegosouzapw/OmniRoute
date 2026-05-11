# 🆓 Free LLM API Providers — Consolidated Directory

> **The ultimate aggregated reference for all permanently free LLM API providers.**
> Consolidated from 6 community repositories. Use with OmniRoute to route through 25+ free providers simultaneously.

_Last consolidated: May 2026 · Sources: awesome-free-llm-apis, awesome-free-llm-apis2, free-llm-api-resources, Free-LLM-Collection, FREE-LLM-API-Provider, gpt4free_

---

## Table of Contents

- [Quick Comparison](#quick-comparison)
- [Provider APIs (First-Party)](#provider-apis-first-party)
- [Inference Providers (Third-Party)](#inference-providers-third-party)
- [China-Based Providers](#china-based-providers)
- [Trial Credit Providers](#trial-credit-providers)
- [Using with OmniRoute](#using-with-omniroute)
- [Glossary](#glossary)

---

## Quick Comparison

All free providers at a glance, sorted by generosity of free tier:

| Provider          | Type      | Best Free Model        | RPM     | RPD          | Tokens           | OpenAI Compat   | Speed     |
| ----------------- | --------- | ---------------------- | ------- | ------------ | ---------------- | --------------- | --------- |
| **Groq**          | Inference | Llama 3.3 70B          | 30      | 14,400       | 6K TPM           | ✅              | 🟢 Fast   |
| **Cerebras**      | Inference | Qwen3 235B             | 30      | 14,400       | 1M TPD           | ✅              | 🟢 Fast   |
| **Mistral AI**    | Provider  | Mistral Large 3        | 60      | Unlimited    | 1B/month         | ✅              | 🟡 Medium |
| **Google Gemini** | Provider  | Gemini 2.5 Flash       | 5–15    | 20–1,500     | 250K TPM         | ✅              | 🟢 Fast   |
| **NVIDIA NIM**    | Inference | 129 models             | 40      | —            | —                | ✅              | 🟡 Medium |
| **Ollama Cloud**  | Inference | 400+ models            | —       | —            | Session limits   | ❌ (Ollama API) | 🟡 Medium |
| **OpenRouter**    | Inference | 35+ free models        | 20      | 50–1,000     | —                | ✅              | 🟡 Medium |
| **GitHub Models** | Inference | GPT-4.1, GPT-5         | 10–15   | 50–150       | 8K in/4K out     | ✅              | 🟡 Medium |
| **Cloudflare AI** | Inference | 50+ models             | —       | 10K neurons  | —                | ⚠️ Partial      | 🟡 Medium |
| **Hugging Face**  | Inference | Thousands              | —       | —            | $0.10/mo credits | ✅              | 🔴 Slow   |
| **Cohere**        | Provider  | Command A (111B)       | 20      | —            | 1K calls/month   | ⚠️ Partial      | 🟡 Medium |
| **Pollinations**  | Inference | Text+Image+Video+Audio | —       | Hourly reset | —                | ✅              | 🟡 Medium |
| **Z.AI (Zhipu)**  | Provider  | GLM-4.7-Flash          | —       | —            | Undocumented     | ✅              | 🟡 Medium |
| **SiliconFlow**   | Inference | Qwen3-8B               | 1,000   | —            | 50K TPM          | ✅              | 🟡 Medium |
| **Kilo Code**     | Inference | Free auto-router       | ~200/hr | —            | —                | ✅              | 🟡 Medium |
| **LLM7.io**       | Inference | 30+ models             | 15–30   | —            | —                | ✅              | 🟡 Medium |
| **Kluster AI**    | Inference | DeepSeek-R1            | —       | —            | Undocumented     | ✅              | 🟡 Medium |
| **ModelScope**    | Inference | Qwen, DeepSeek         | —       | 2,000        | ≤500/model/day   | ✅              | 🟡 Medium |
| **IBM watsonx**   | Provider  | Granite models         | 2/sec   | —            | 300K/month       | ❌              | 🟡 Medium |

---

## Provider APIs (First-Party)

APIs from the companies that train or fine-tune the models.

### Google Gemini 🇺🇸

🔗 [Get API Key](https://aistudio.google.com/app/apikey) · Base URL: `https://generativelanguage.googleapis.com/v1beta`

> ⚠️ Free tier NOT available in EU/UK/Switzerland. Prompts may be used by Google to improve products.

| Model                             | Context | Max Output | Modality               | RPM | RPD    |
| --------------------------------- | ------- | ---------- | ---------------------- | --- | ------ |
| Gemini 2.5 Flash / Gemini 3 Flash | 1M      | 65K        | Text+Image+Audio+Video | 5   | 20     |
| Gemini 2.5 Flash-Lite             | 1M      | 65K        | Text+Image+Audio+Video | 10  | 20     |
| Gemini 3.1 Flash-Lite             | 1M      | 65K        | Text+Image+Audio+Video | 15  | 1,500  |
| Gemma 4 26B/31B                   | —       | —          | Text                   | 15  | 1,500  |
| Gemma 3 (1B/4B/12B/27B)           | —       | —          | Text                   | 30  | 14,400 |

### Mistral AI 🇫🇷

🔗 [Get API Key](https://console.mistral.ai/api-keys) · Base URL: `https://api.mistral.ai/v1`

Free "Experiment" plan, no credit card. ~1B tokens/month. Requires phone verification.

| Model              | Context | Max Output | Modality        | Rate Limit      |
| ------------------ | ------- | ---------- | --------------- | --------------- |
| Mistral Small 4    | 256K    | 256K       | Text+Image+Code | 1 RPS, 500K TPM |
| Mistral Medium 3   | 128K    | 128K       | Text            | 1 RPS, 500K TPM |
| Mistral Large 3    | 256K    | 256K       | Text            | 1 RPS, 500K TPM |
| Mistral Nemo (12B) | 128K    | 128K       | Text            | 1 RPS, 500K TPM |
| Codestral          | 256K    | 256K       | Code            | 30 RPM, 2K RPD  |
| Pixtral Large      | 128K    | 128K       | Text+Image      | 1 RPS, 500K TPM |

### Cohere 🇨🇦

🔗 [Get API Key](https://dashboard.cohere.com/api-keys) · Base URL: `https://api.cohere.com/v2`

Free "Trial" key. 1,000 API calls/month. Non-commercial use only. 20 RPM.

| Model               | Context | Max Output | Modality                |
| ------------------- | ------- | ---------- | ----------------------- |
| Command A (111B)    | 256K    | 4K         | Text                    |
| Command A Reasoning | 256K    | 4K         | Text (reasoning)        |
| Command A Vision    | 256K    | 4K         | Text+Image              |
| Command A Translate | 256K    | 4K         | Translation             |
| Command R+          | 128K    | 4K         | Text                    |
| Command R           | 128K    | 4K         | Text                    |
| Command R7B         | 128K    | 4K         | Text                    |
| Embed 4             | —       | —          | Embeddings (Text+Image) |
| Rerank 3.5          | —       | —          | Reranking               |

### Z.AI (Zhipu AI) 🇨🇳

🔗 [Get API Key](https://open.bigmodel.cn/usercenter/apikeys) · Base URL: `https://open.bigmodel.cn/api/paas/v4`

Permanent free models, no credit card. No published rate limits.

| Model           | Context | Max Output | Modality   |
| --------------- | ------- | ---------- | ---------- |
| GLM-4.7-Flash   | 200K    | 128K       | Text       |
| GLM-4.5-Flash   | 128K    | ~8K        | Text       |
| GLM-4.6V-Flash  | 128K    | ~4K        | Text+Image |
| GLM-5 / GLM-5.1 | —       | —          | Text       |

### IBM watsonx 🇺🇸

🔗 [Pricing](https://www.ibm.com/products/watsonx-ai/pricing)

Free tier: 2 RPS, 300K tokens/month. Granite foundation models.

---

## Inference Providers (Third-Party)

### Groq 🇺🇸

🔗 [Get API Key](https://console.groq.com/keys) · Base URL: `https://api.groq.com/openai/v1`

Ultra-fast LPU inference (~300–500 tok/s). No credit card required.

| Model                              | RPM | RPD    | TPM | Modality         |
| ---------------------------------- | --- | ------ | --- | ---------------- |
| llama-3.3-70b-versatile            | 30  | 1,000  | 12K | Text             |
| llama-3.1-8b-instant               | 30  | 14,400 | 6K  | Text             |
| llama-4-scout-17b-16e-instruct     | 30  | 1,000  | 30K | Text+Vision      |
| llama-4-maverick-17b-128e-instruct | 30  | 1,000  | 6K  | Text+Vision      |
| qwen3-32b                          | 60  | 1,000  | 6K  | Text             |
| kimi-k2-instruct                   | 60  | 1,000  | 10K | Text             |
| gpt-oss-120b / gpt-oss-20b         | 30  | 1,000  | 8K  | Text             |
| deepseek-r1-distill-70b            | 30  | 14,400 | —   | Text (reasoning) |
| whisper-large-v3 / v3-turbo        | 20  | 2,000  | —   | Audio→Text       |

### Cerebras 🇺🇸

🔗 [Get API Key](https://cloud.cerebras.ai/) · Base URL: `https://api.cerebras.ai/v1`

Wafer-scale chip inference (~2,600 tok/s). 1M tokens/day cap.

| Model                          | RPM | RPH | RPD    | TPM | TPD |
| ------------------------------ | --- | --- | ------ | --- | --- |
| gpt-oss-120b                   | 30  | 900 | 14,400 | 64K | 1M  |
| llama3.1-8b                    | 30  | 900 | 14,400 | 60K | 1M  |
| qwen-3-235b-a22b-instruct-2507 | 30  | 900 | 14,400 | 60K | 1M  |
| zai-glm-4.7                    | 10  | 100 | 100    | 60K | 1M  |

### NVIDIA NIM 🇺🇸

🔗 [Explore Models](https://build.nvidia.com/explore/discover) · Base URL: `https://integrate.api.nvidia.com/v1`

Free with NVIDIA Developer Program. **129 models**, 40 RPM. Phone verification required.

**Notable models:** DeepSeek-R1, DeepSeek-V3.2, Nemotron Ultra 253B, Llama 3.1 405B, Qwen3 Coder 480B, Mistral Large 3, Kimi K2, GLM-5.1, MiniMax M2.7, Gemma 4 31B, + 100 more.

### OpenRouter 🇺🇸

🔗 [Get API Key](https://openrouter.ai/keys) · Base URL: `https://openrouter.ai/api/v1`

35+ free models (suffix `:free`). 20 RPM.

| Credits Purchased | RPD   |
| ----------------- | ----- |
| < $10             | 50    |
| ≥ $10 (one-time)  | 1,000 |

**Notable free models:** DeepSeek R1, DeepSeek V3, Qwen3 Coder 480B, Llama 4 Scout/Maverick, GPT-OSS 120B, Nemotron 3 Super 120B, MiniMax M2.5, Gemma 4 31B, Devstral, + 23 more.

### GitHub Models 🇺🇸

🔗 [Marketplace](https://github.com/marketplace/models) · Base URL: `https://models.inference.ai.azure.com`

Free for all GitHub users. 45+ models including frontier models.

| Tier                    | RPM | RPD | Tokens/Request |
| ----------------------- | --- | --- | -------------- |
| Low tier models         | 15  | 150 | 8K in / 4K out |
| High tier models        | 10  | 50  | 8K in / 4K out |
| DeepSeek-R1 / MAI-DS-R1 | 1   | 8   | 4K in / 4K out |
| Grok-3                  | 1   | 15  | 4K in / 4K out |

**Notable models:** GPT-4.1, GPT-4o, GPT-5, GPT-5-mini, o3-mini, o4-mini, DeepSeek-R1, Llama 4 Scout/Maverick, Codestral, Mistral Medium 3, Phi-4, Grok-3.

### Cloudflare Workers AI 🇺🇸

🔗 [Get Token](https://dash.cloudflare.com/profile/api-tokens) · 10,000 Neurons/day free. 50+ models.

**Notable models:** Llama 3.3 70B, Llama 4 Scout, Qwen3 30B-A3B, QwQ 32B, DeepSeek R1 Distill, Gemma 4 26B, GLM 4.7 Flash, Nemotron 3 120B, Kimi K2.5/K2.6, Mistral Small 3.1, GPT-OSS 120B/20B, + 40 more.

### Hugging Face 🇺🇸

🔗 [Get Token](https://huggingface.co/settings/tokens) · Base URL: `https://api-inference.huggingface.co/v1`

$0.10/month free credits (auto-replenished). Thousands of models. Serverless limited to <10GB models.

### Ollama Cloud 🇺🇸

🔗 [Get Key](https://ollama.com/settings/keys) · Base URL: `https://api.ollama.com`

400+ models. Session/weekly limits (unpublished). NOT OpenAI SDK-compatible.

**Notable models:** GPT-OSS 120B, DeepSeek V3.2/V4, Kimi K2/K2.5/K2.6, GLM-5/5.1, Qwen3 Coder 480B, Gemini 3 Flash, MiniMax M2.7, Cogito 2.1 671B, Nemotron 3 Super 120B.

### Pollinations AI 🇩🇪

🔗 [Get Key](https://enter.pollinations.ai) · Base URL: `https://gen.pollinations.ai/v1`

No sign-up required for basic use. Unique: **text + image + video + audio** all free.

**Text models:** openai, openai-large, openai-reasoning, gemini, mistral, llama.
**Image models:** flux, gpt-image, seedream, kontext.
**Video:** wan-fast. **Audio:** tts-1, 30+ ElevenLabs voices.

### SiliconFlow 🇨🇳

🔗 [Get Key](https://cloud.siliconflow.cn/account/ak) · Base URL: `https://api.siliconflow.cn/v1`

14 CNY signup credits. Permanently free models: 1,000 RPM, 50K TPM.

| Model                       | Context | Modality         |
| --------------------------- | ------- | ---------------- |
| Qwen/Qwen3-8B               | 131K    | Text             |
| DeepSeek-R1-0528-Qwen3-8B   | ~33K    | Text (reasoning) |
| DeepSeek-R1-Distill-Qwen-7B | 131K    | Text (reasoning) |
| THUDM/glm-4-9b-chat         | 32K     | Text             |
| THUDM/GLM-4.1V-9B-Thinking  | 66K     | Vision+Text      |
| DeepSeek-OCR                | —       | Vision (OCR)     |

### Kilo Code 🇺🇸

🔗 [Get Key](https://kilo.ai) · Base URL: `https://api.kilo.ai/api/gateway`

Free models, no credit card. ~200 req/hr. Auto-router `kilo-auto/free`.

### LLM7.io 🇬🇧

🔗 [Get Token](https://token.llm7.io) · Base URL: `https://api.llm7.io/v1`

30+ models. 15 RPM (30 RPM with free token). No registration for basic access.

### Kluster AI 🇺🇸

🔗 [Get Key](https://platform.kluster.ai/apikeys) · DeepSeek-R1, Llama 4 Maverick, Qwen3-235B + more.

### OpenCode Zen

🔗 [Docs](https://opencode.ai/docs/zen/) · Free models (Big Pickle Stealth, MiniMax M2.5 Free, Arcee Large).

### Vercel AI Gateway

🔗 [Docs](https://vercel.com/docs/ai-gateway) · $5/month free credits. Routes to various providers.

---

## China-Based Providers

### ModelScope (魔搭社区) 🇨🇳

🔗 [Get Token](https://modelscope.cn/my/myaccesstoken) · Base URL: `https://api-inference.modelscope.cn/v1`

2,000 req/day total, ≤500/model/day. Requires Alibaba Cloud account + real-name verification.

**Models:** DeepSeek V4 Pro/Flash, DeepSeek V3.2, GLM-5/5.1, MiniMax M2.5, Qwen3-235B, Qwen3 Coder 480B, Ling-2.6-1T.

### Tencent Hunyuan (腾讯混元)

Hunyuan-Lite: free. Other models: 100M tokens free (1-year expiry).

### Volcengine (火山引擎)

500 resource points/day. Tongyi Qwen free (100 calls/day). Doubao models with tiered pricing.

### ChatAnywhere

🔗 Base URL: `https://api.chatanywhere.tech` · GPT-5.4-mini, DeepSeek-V4, and more.

### InternAI (书生)

🔗 Base URL: `https://chat.intern-ai.org.cn/api/v1` · 10 RPM. Keys valid 6 months.

**Models:** intern-latest, intern-s1-pro, internvl3.5-241b-a28b.

### Bigmodel (智谱)

🔗 Base URL: `https://open.bigmodel.cn/api/paas/v4/` · 30 concurrent requests.

**Models:** GLM-4-Flash, GLM-4V-Flash, GLM-4.1V-Thinking-Flash, GLM-4.6V-Flash, GLM-4.7-Flash.

---

## Trial Credit Providers

These offer one-time or time-limited credits (not permanent free tiers):

| Provider                                                   | Credits          | Expiry   | Notable Models                |
| ---------------------------------------------------------- | ---------------- | -------- | ----------------------------- |
| [Baseten](https://app.baseten.co/)                         | $30              | —        | Any model (pay by compute)    |
| [NLP Cloud](https://nlpcloud.com)                          | $15              | —        | Various open models           |
| [AI21](https://studio.ai21.com/)                           | $10              | 3 months | Jamba family                  |
| [Upstage](https://console.upstage.ai/)                     | $10              | 3 months | Solar Pro/Mini                |
| [Modal](https://modal.com)                                 | $5/mo            | Monthly  | Any model (compute time)      |
| [SambaNova](https://cloud.sambanova.ai/)                   | $5               | 3 months | Llama 3.3, Qwen3, DeepSeek R1 |
| [Scaleway](https://console.scaleway.com/generative-api)    | 1M tokens        | One-time | Llama 3.3, Gemma 3, GPT-OSS   |
| [Alibaba Cloud](https://bailian.console.alibabacloud.com/) | 1M tokens/model  | —        | Qwen family                   |
| [Fireworks](https://fireworks.ai/)                         | $1               | —        | Various open models           |
| [Nebius](https://tokenfactory.nebius.com/)                 | $1               | —        | Various open models           |
| [Inference.net](https://inference.net)                     | $1 (+$25 survey) | —        | Various open models           |
| [Hyperbolic](https://app.hyperbolic.ai/)                   | $1               | —        | DeepSeek V3, Llama 3.3        |
| [Novita](https://novita.ai/)                               | $0.50            | 1 year   | Various open models           |

---

## Using with OmniRoute

OmniRoute supports **all providers listed above** as connections. Here's how to maximize free usage:

### 1. Add Multiple Free Providers

```
Dashboard → Providers → Add Connection
```

Add API keys for Groq, Cerebras, Mistral, Google Gemini, OpenRouter, GitHub Models, etc.

### 2. Create a Free-Tier Combo

```
Dashboard → Combos → Create Combo → Add all free providers as targets
```

Use the **"priority"** or **"round-robin"** strategy to distribute load across free tiers.

### 3. Recommended Free Combo Strategy

| Priority | Provider          | Why                                           |
| -------- | ----------------- | --------------------------------------------- |
| 1        | **Groq**          | Fastest inference, 14,400 RPD on small models |
| 2        | **Cerebras**      | 1M TPD, fast wafer-scale chips                |
| 3        | **Mistral**       | 1B tokens/month, large model selection        |
| 4        | **Google Gemini** | 1M context, multimodal                        |
| 5        | **NVIDIA NIM**    | 129 models, 40 RPM                            |
| 6        | **OpenRouter**    | 35+ free models as final fallback             |

### 4. Environment Variables

```bash
# These providers work out of the box with OmniRoute:
GROQ_API_KEY=your-key
CEREBRAS_API_KEY=your-key
MISTRAL_API_KEY=your-key
GOOGLE_AI_API_KEY=your-key
NVIDIA_API_KEY=your-key
OPENROUTER_API_KEY=your-key
GITHUB_TOKEN=your-token
CLOUDFLARE_API_TOKEN=your-token
COHERE_API_KEY=your-key
SILICONFLOW_API_KEY=your-key
```

### 5. Estimated Free Capacity

With all top-6 providers combined in a combo:

| Metric               | Combined Free Capacity |
| -------------------- | ---------------------- |
| **Requests/Day**     | ~31,000+ RPD           |
| **Tokens/Month**     | ~32B+ tokens           |
| **Models Available** | 200+ unique models     |
| **Cost**             | $0.00                  |

---

## Glossary

| Term        | Meaning                                     |
| ----------- | ------------------------------------------- |
| **RPM**     | Requests per minute                         |
| **RPD**     | Requests per day                            |
| **RPH**     | Requests per hour                           |
| **RPS**     | Requests per second                         |
| **TPM**     | Tokens per minute                           |
| **TPD**     | Tokens per day                              |
| **Neurons** | Cloudflare's compute unit (~1 output token) |

---

## Sources

This document consolidates data from 6 community repositories:

| Repository                                                                 | Focus                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------ |
| [awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis)    | Curated list with detailed model tables          |
| [awesome-free-llm-apis2](https://github.com/)                              | Extended list with speed tiers and code snippets |
| [free-llm-api-resources](https://github.com/)                              | Auto-generated model lists with trial credits    |
| [Free-LLM-Collection](https://github.com/for-the-zero/Free-LLM-Collection) | Chinese + global providers with rate limits      |
| [FREE-LLM-API-Provider](https://github.com/CYBIRD-D/FREE-LLM-API-Provider) | Deep provider analysis with CN platforms         |
| [gpt4free](https://github.com/xtekky/gpt4free)                             | Config-based routing with quota awareness        |

> ⚠️ **Disclaimer:** Rate limits change frequently. Always verify with the provider's official documentation before relying on specific limits. Trial credits and time-limited promotions are separated from permanent free tiers.
