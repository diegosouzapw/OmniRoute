# Free Tiers

> **Last consolidated:** 2026-05-13 — OmniRoute v3.8.0
> **Source of truth:** `src/shared/constants/providers.ts` (`FREE_PROVIDERS`, `OAUTH_PROVIDERS`, and `APIKEY_PROVIDERS` entries flagged with `hasFree: true` + `freeNote`)

This page lists providers with usable free tiers shipped in OmniRoute v3.8.0. The data is derived from the provider catalog. If a provider does not appear here, it either has no free tier in the catalog or its `hasFree` flag is `false`.

Add credentials from the dashboard (`/dashboard/providers/new`) — OmniRoute reads keys from the database, not from per-provider environment variables. The only env vars that influence provider behavior are listed in the [Environment Variables](#environment-variables) section.

---

## How free providers are wired

OmniRoute classifies providers into the following groups in `src/shared/constants/providers.ts`:

| Group              | Auth                           | Example IDs                                 |
| ------------------ | ------------------------------ | ------------------------------------------- |
| `FREE_PROVIDERS`   | OAuth or vendor account        | `qoder`, `gemini-cli`, `kiro`, `amazon-q`   |
| `OAUTH_PROVIDERS`  | OAuth                          | `claude`, `cursor`, `windsurf`, `devin-cli` |
| `APIKEY_PROVIDERS` | API key (with `hasFree: true`) | `groq`, `cerebras`, `mistral`, `gemini`     |

A provider appears in the **free pool** when either:

- It is listed in the `FREE_PROVIDERS` map (and not flagged `deprecated: true`), or
- It is listed in `APIKEY_PROVIDERS` with `hasFree: true` and a `freeNote` string, or
- It is an OAuth provider whose vendor offers a free tier on top of OAuth sign-in.

---

## Quick reference (API key providers with `hasFree: true`)

| Provider           | ID              | Free tier note                                                                                       |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------- |
| AgentRouter        | `agentrouter`   | $200 free credits on signup — multi-model routing gateway                                            |
| AI21 Labs          | `ai21`          | $10 trial credits on signup (valid 3 months), no credit card required                                |
| AI/ML API          | `aimlapi`       | $0.025/day free credits — 200+ models via single endpoint                                            |
| BazaarLink         | `bazaarlink`    | Free tier with `auto:free` routing — zero-cost inference, no credit card required                    |
| Baseten            | `baseten`       | $30 free trial credits for GPU inference                                                             |
| Blackbox AI        | `blackbox`      | Free tier: unlimited basic chat plus Minimax-M2.5, no credit card required                           |
| Bytez              | `bytez`         | $1 free credits, refreshes every 4 weeks                                                             |
| Cerebras           | `cerebras`      | Free: 1M tokens/day, 60K TPM — world's fastest inference                                             |
| Cloudflare AI      | `cloudflare-ai` | Free 10K Neurons/day: ~150 LLM responses or 500s Whisper audio                                       |
| Cohere             | `cohere`        | Free Trial: 1,000 API calls/month for testing, no credit card required                               |
| Completions.me     | `completions`   | Free unlimited access to Claude, GPT, Gemini — no credit card, no rate limits                        |
| DeepInfra          | `deepinfra`     | Free signup credits for API testing and model exploration                                            |
| DeepSeek           | `deepseek`      | 5M free tokens on signup — no credit card required                                                   |
| Enally AI          | `enally`        | Free for students and developers — no credit card, OTP verification                                  |
| Fireworks AI       | `fireworks`     | $1 free starter credits on signup for API testing                                                    |
| FreeTheAi          | `freetheai`     | Community-run — free forever, no paid tiers, no credit card                                          |
| Gemini (AI Studio) | `gemini`        | Free forever: 1,500 req/day for Gemini 2.5 Flash — no credit card                                    |
| GLHF Chat          | `glhf`          | Free tier for open-source model inference                                                            |
| Groq               | `groq`          | Free tier: 30 RPM / 14.4K RPD — no credit card                                                       |
| HuggingFace        | `huggingface`   | Free Inference API for thousands of models (Whisper, VITS, SDXL…)                                    |
| Hyperbolic         | `hyperbolic`    | $1–5 trial credits on signup for serverless inference                                                |
| Inference.net      | `inference-net` | $25 free credits on signup plus research grants available                                            |
| Jina AI            | `jina-ai`       | 10M free tokens on signup (non-commercial), no credit card required                                  |
| Kluster AI         | `kluster`       | $5 free credits on signup — DeepSeek R1, Llama 4 Maverick/Scout, Qwen3 235B                          |
| Lepton AI          | `lepton`        | Free tier available — fast inference on custom hardware                                              |
| LLM7.io            | `llm7`          | No signup required — 2 req/s, 20 RPM, 100 req/hr free tier                                           |
| LongCat AI         | `longcat`       | 50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) — 100% free while public beta                 |
| Mistral            | `mistral`       | Free Experiment tier: rate-limited access to all models, no credit card required                     |
| Modal              | `modal`         | $30/month free credits for new accounts                                                              |
| Morph              | `morph`         | Free tier: 250K credits/month, $0                                                                    |
| Nebius             | `nebius`        | ~$1 trial credits on signup for API testing                                                          |
| NLP Cloud          | `nlpcloud`      | Trial credits for new accounts                                                                       |
| Nous Research      | `nous-research` | Free tier: 50 RPM, 500,000 TPM — no credit card                                                      |
| Novita AI          | `novita`        | $0.50 trial credits on signup (valid about 1 year)                                                   |
| nScale             | `nscale`        | $5 free credits on signup for inference testing                                                      |
| NVIDIA NIM         | `nvidia`        | Free dev access: ~40 RPM, 70+ models (Kimi K2.5, GLM 4.7, DeepSeek V3.2…)                            |
| OpenRouter         | `openrouter`    | Free models at $0/token with `:free` suffix — 20 RPM / 200 RPD                                       |
| Pollinations AI    | `pollinations`  | No API key required for free public endpoint. Optional Spore tier: ~0.01 pollen/hour                 |
| Predibase          | `predibase`     | $25 free trial credits (30-day validity)                                                             |
| PublicAI           | `publicai`      | Free community inference tier for testing                                                            |
| Puter AI           | `puter`         | 500+ models (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3…) — users pay via Puter account |
| Reka               | `reka`          | $10/month recurring free API credits                                                                 |
| SambaNova          | `sambanova`     | $5 free credits on signup (30-day validity), no credit card required                                 |
| Scaleway AI        | `scaleway`      | 1M free tokens for new accounts — EU/GDPR compliant (Paris), Qwen3 235B & Llama 70B                  |
| SiliconFlow        | `siliconflow`   | $1 free credits plus permanently free models after identity verification                             |
| Together AI        | `together`      | $25 signup credits + 3 permanently free models: Llama 3.3 70B, Vision, DeepSeek-R1 distill           |
| UncloseAI          | `uncloseai`     | Free forever — no signup, no credit card. OpenAI-compatible endpoints                                |
| Voyage AI          | `voyage-ai`     | 200M free tokens for embeddings and reranking                                                        |

**Total: 48 API-key providers with `hasFree: true`.**

> All entries above are copied verbatim from the `freeNote` field in the provider catalog so they stay in sync with the code.

---

## OAuth-based free tiers

### Always-free OAuth providers (in `FREE_PROVIDERS`)

These providers are designed around a vendor OAuth flow and ship a free tier by default:

| Provider   | ID           | Notes                                                                                                       |
| ---------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| Qoder AI   | `qoder`      | OAuth or Personal Access Token. Free tier on signup.                                                        |
| Gemini CLI | `gemini-cli` | Uses Gemini CLI OAuth / Cloud Code credentials. Pro models require an eligible Google account or paid plan. |
| Kiro AI    | `kiro`       | AWS Builder ID (Kiro Free tier).                                                                            |
| Amazon Q   | `amazon-q`   | Same AWS Builder ID / refresh-token flow as Kiro, but kept as separate connections.                         |

### OAuth providers with vendor-controlled free tiers (in `OAUTH_PROVIDERS`)

The free-tier surface here depends entirely on each vendor's account plan, not on OmniRoute:

| Provider             | ID            | Auth hint                                                                               |
| -------------------- | ------------- | --------------------------------------------------------------------------------------- |
| Claude Code          | `claude`      | OAuth via `platform.claude.com`. Free quota depends on your Anthropic account.          |
| Antigravity          | `antigravity` | Google OAuth (Antigravity).                                                             |
| OpenAI Codex         | `codex`       | OAuth via OpenAI (Codex CLI). Subject to ChatGPT plan free credits.                     |
| GitHub Copilot       | `github`      | OAuth via GitHub. Free for verified students; free trial otherwise.                     |
| GitLab Duo           | `gitlab-duo`  | OAuth (`ai_features + read_user`). Requires GitLab Duo entitlement.                     |
| Cursor IDE           | `cursor`      | Cursor OAuth. Free tier limits depend on Cursor plan.                                   |
| Kimi Coding          | `kimi-coding` | Moonshot OAuth. Free quota on Kimi Coding accounts.                                     |
| Kilo Code            | `kilocode`    | Kilo OAuth — free auto-router available.                                                |
| Cline                | `cline`       | Cline OAuth.                                                                            |
| Windsurf (Devin CLI) | `windsurf`    | Sign in at `windsurf.com`, paste your token. Free tier limits set by Windsurf.          |
| Devin CLI (Official) | `devin-cli`   | Uses the official Devin CLI binary or `WINDSURF_API_KEY`. Subject to Devin's free tier. |

---

## Deprecated / discontinued

### Qwen Code (`qwen`)

Marked `deprecated: true` in `FREE_PROVIDERS`. Discontinued **2026-04-15**.

> Qwen OAuth free tier was discontinued on 2026-04-15. Use `alicode`, `alicode-intl`, or `openrouter` providers with an API key instead.

Connections of type `qwen` will keep working until their tokens expire, but no new OAuth sign-ins are accepted upstream. Migrate to:

- `alicode` (Alibaba Cloud Bailian — DashScope)
- `alicode-intl` (Alibaba Cloud International)
- `openrouter` (Qwen models exposed via OpenRouter)

---

## Command Code

`command-code` is a separate API-key provider for the Command Code agent (see `commandcode.ai`). It is not flagged with `hasFree: true` in the catalog, so it does not appear in the free table above, but it is included here because it ships in v3.8.0 alongside the free-tier providers:

- ID: `command-code`
- Endpoint: Command Code `/alpha/generate`
- Auth: Bearer API key, configured from the dashboard.

Check Command Code's website for the current free-tier policy.

---

## Environment variables

OmniRoute v3.8.0 does **not** read provider API keys from environment variables (with one exception below). Keys are stored in the encrypted SQLite database and configured from the dashboard. The env vars listed here are the only ones that affect free-tier behavior:

```bash
# Windsurf / Devin CLI — Firebase Web API key used by the Secure Token
# Service to refresh the Windsurf app. The default value ships in
# .env.example (it is a public Firebase Web API key extracted from the
# Devin CLI binary, not a real secret); override only if you mirror your
# own Windsurf token-refresh service.
WINDSURF_FIREBASE_API_KEY=<see .env.example>

# Optional fallback for the devin-cli executor when no connection key is set.
WINDSURF_API_KEY=

# Optional path to the official Devin CLI binary.
CLI_DEVIN_BIN=/usr/local/bin/devin

# OAuth client overrides (rarely needed — defaults shipped in code)
CODEX_OAUTH_CLIENT_ID=
GEMINI_OAUTH_CLIENT_ID=
GEMINI_OAUTH_CLIENT_SECRET=
GEMINI_CLI_OAUTH_CLIENT_ID=
GEMINI_CLI_OAUTH_CLIENT_SECRET=
QWEN_OAUTH_CLIENT_ID=
KIMI_CODING_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_ID=
GITLAB_DUO_OAUTH_CLIENT_ID=
GITLAB_DUO_OAUTH_CLIENT_SECRET=
QODER_OAUTH_CLIENT_SECRET=
QODER_PERSONAL_ACCESS_TOKEN=

# CLI sidecar binaries
CLI_CODEX_BIN=codex
CLI_CURSOR_BIN=agent
CLI_CLINE_BIN=cline
CLI_QODER_BIN=qoder
CLI_QWEN_BIN=qwen
```

For all other providers (Groq, Cerebras, Mistral, Gemini, Cohere, NVIDIA, OpenRouter, Together, Fireworks, Cloudflare AI, SambaNova, HuggingFace, SiliconFlow, Hyperbolic, Morph, LLM7, Lepton, Kluster, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi, AgentRouter, Command Code, etc.), add the key from `/dashboard/providers/new`.

---

## How to use

1. Open `/dashboard/providers/new` and pick the provider you want.
2. Paste the API key (or complete the OAuth flow). For OAuth providers, follow the dashboard wizard.
3. The provider appears in your routing pool automatically and is eligible for combos and auto-routing.
4. Track usage at `/dashboard/usage` to see how close you are to free-tier limits.

### Suggested combos

| Goal                         | Strategy             | Notes                                                                 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------- |
| Cheapest possible chat       | `auto/cheap`         | Prefers free / lowest-cost providers; falls back automatically.       |
| Local-only routing           | `auto/offline`       | Routes only to local providers (Ollama, LM Studio, vLLM, …).          |
| Redundancy across free tiers | combo `priority`     | List Groq → Cerebras → Mistral → Gemini → NVIDIA → OpenRouter.        |
| High RPM throughput          | combo `round-robin`  | Spreads requests across all configured free providers.                |
| Best success rate            | combo `lkgp` / `p2c` | Picks last-known-good provider or "power of two choices" rebalancing. |

### Tips

- Combine multiple free providers in a combo (`/dashboard/combos`) to maximize daily quota and route around outages.
- Use `omniroute doctor` to verify all configured free providers are reachable.
- Check provider health in `/dashboard/monitoring/health` — a provider with an open circuit breaker is skipped automatically.
- Free-tier limits change frequently; the `freeNote` strings reflect the limits as known at v3.8.0 ship date. Verify with each provider's official docs before relying on a specific number.

---

## Glossary

| Term       | Meaning                                                  |
| ---------- | -------------------------------------------------------- |
| **RPM**    | Requests per minute                                      |
| **RPD**    | Requests per day                                         |
| **RPH**    | Requests per hour                                        |
| **RPS**    | Requests per second                                      |
| **TPM**    | Tokens per minute                                        |
| **TPD**    | Tokens per day                                           |
| **Neuron** | Cloudflare's compute unit (~1 output token)              |
| **LKGP**   | Last-known-good provider — auto-combo strategy           |
| **P2C**    | Power-of-two choices — auto-combo load balancer strategy |
