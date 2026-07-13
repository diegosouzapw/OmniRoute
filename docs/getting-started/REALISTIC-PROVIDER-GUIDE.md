# Realistic Provider Guide

> **What actually works, what doesn't, and what you need to know before configuring a provider.**
> This guide is community-maintained. If something is outdated, open an issue or PR.

OmniRoute supports 88 providers across 10 categories. The existing `FREE-TIERS-GUIDE.md` and `PROVIDERS-GUIDE.md` list them at a high level, but skip the friction points that most users hit in practice. This doc fills that gap.

---

## Quick Reference: How Providers Are Organized

| Category            | Count | Auth Method                      | Cost                       |
| ------------------- | ----- | -------------------------------- | -------------------------- |
| NoAuth (truly free) | 7     | None                             | Free                       |
| Web Cookie          | 24    | Paste a cookie from your browser | Free (requires account)    |
| OAuth               | 21    | OAuth flow or CLI login          | Free tiers vary            |
| API Key             | 147   | API key from provider dashboard  | Free tiers vary, most paid |
| Local               | 12    | None (runs on your machine)      | Free (hardware costs)      |
| Search              | 11    | API key                          | Free tiers vary            |
| Audio               | 7     | API key                          | Free tiers vary            |
| Upstream Proxy      | 2     | API key                          | Paid                       |
| Cloud Agent         | 3     | API key                          | Paid                       |
| System              | 1     | None                             | N/A                        |

**Key takeaway:** "NoAuth" does NOT mean "works everywhere with zero friction." See below.

---

## Tier 1: Truly Zero-Config (NoAuth)

These providers require no credentials, no accounts, no CLI install. They "just work" — with caveats.

### OpenCode Free (`opencode`)

- **Models:** Kimi, GLM, Qwen, MiMo, MiniMax
- **Setup:** None. Auto-connects to `https://opencode.ai/zen/v1`.
- **Caveats:**
  - Rate limits are aggressive. Expect throttling after 10-20 requests in quick succession.
  - Not all listed models are available at all times — the endpoint rotates availability.
  - Quality varies significantly between models.

### DuckDuckGo AI Chat (`duckduckgo-web`)

- **Models:** GPT-4o-mini, Claude 3 Haiku, Llama, Mixtral
- **Setup:** None.
- **Caveats:**
  - **Anti-bot challenges:** DDG serves CAPTCHAs and IP blocks after sustained use. Running OmniRoute from a cloud VPS (AWS, Oracle, DigitalOcean) triggers this quickly.
  - Works best on residential IPs or through a proxy.
  - Streaming can be interrupted mid-response.
  - Rate limit is approximately 5-10 messages per minute per IP.

### Chipotle Pepper AI (`chipotle`)

- **Models:** Amelia (IPsoft)
- **Setup:** None. Reverse-engineered SockJS/STOMP protocol.
- **Caveats:**
  - This is a chatbot designed for ordering burritos. It's not a general-purpose coding assistant.
  - Can go offline during off-hours or maintenance.
  - Strict rate limits — designed for a few messages per session.

### The Old LLM (`theoldllm`)

- **Models:** GPT-5.4, Claude 4.6 Opus/Sonnet/Haiku, and more
- **Setup:** None. Auto-generates tokens via embedded Playwright browser.
- **Caveats:**
  - **Blocks cloud provider IPs** (Oracle Cloud, AWS, GCP). If OmniRoute runs on a VPS, this provider won't work.
  - Requires Playwright installed (`npx playwright install chromium`).
  - Token generation is slow (~2-5s per request).
  - Models listed may change without notice.

### MiMoCode (`mimocode`)

- **Models:** Xiaomi MiMo
- **Setup:** None. Auto-generates JWT via device fingerprint bootstrap.
- **Caveats:**
  - Device fingerprinting can fail on headless servers.
  - JWT tokens expire frequently — re-authentication happens automatically but adds latency.
  - Limited model selection.

### Veo AI Free (`veoaifree-web`)

- **Service:** Video generation (VEO 3.1, Seedance)
- **Setup:** None.
- **Caveats:**
  - Hard rate limit: 6 requests/hour per IP.
  - Video generation is slow (30-120s per request).
  - IP-based limiting — same cloud VPS issues as DDG.

### Augment / Auggie CLI (`auggie`)

- **Models:** Augment's coding models
- **Setup:** Install the Auggie CLI on the machine running OmniRoute, then run `auggie login`. This is an **interactive browser OAuth flow** — you cannot automate it headlessly.
- **Caveats:**
  - **Requires local CLI install** (`npm install -g @augmentcode-inc/auggie` or equivalent).
  - **Requires interactive login** — you need a browser on the machine. If OmniRoute runs on a headless server, you need to complete the login elsewhere and transfer the credentials.
  - OmniRoute spawns it as a subprocess — the CLI must be in your `$PATH`.
  - Not a cloud API — works only where the CLI is installed and authenticated.

---

## Tier 2: Web Cookie Providers (Free, Requires Account)

These providers let you use their web interface for free, and OmniRoute connects by reusing your browser session cookie. You need an account on each provider's website.

### How Cookie Auth Works

1. Open the provider's website in your browser.
2. Log in.
3. Open DevTools (F12) → Application → Cookies (or Network tab).
4. Copy the cookie value OmniRoute asks for.
5. Paste it in OmniRoute's provider settings.

### Common Issues

- **Cookies expire:** Most session cookies last hours to days. You'll need to re-paste periodically.
- **Anti-bot detection:** Claude, ChatGPT, and Perplexity detect non-browser traffic. OmniRoute routes through appropriate headers, but aggressive rate limiting can still trigger blocks.
- **Account requirements:** Some providers require paid subscriptions for access to their best models.

### Provider-Specific Notes

| Provider         | Cookie Needed                      | Free Tier?                 | Notes                                         |
| ---------------- | ---------------------------------- | -------------------------- | --------------------------------------------- |
| `chatgpt-web`    | `__Secure-next-auth.session-token` | Yes (GPT-4o-mini)          | GPT-4o requires Plus subscription ($20/mo)    |
| `claude-web`     | Session cookie                     | Yes (limited)              | Claude 4 Opus/Sonnet require Pro ($20/mo)     |
| `gemini-web`     | `__Secure-1PSID`                   | Yes                        | Free tier is generous                         |
| `grok-web`       | `sso` + `sso-rw` cookies           | Yes                        | Grok 3 is free; Grok 3 mini reasoning is free |
| `perplexity-web` | `__Secure-next-auth.session-token` | Yes (limited)              | Pro Search requires subscription              |
| `deepseek-web`   | `userToken` from Local Storage     | Yes                        | Free tier is very generous                    |
| `poe-web`        | `p-b` cookie                       | Yes (limited messages/day) | Daily message caps                            |
| `huggingchat`    | Full cookie header                 | Yes                        | Rate limits on popular models                 |
| `venice-web`     | Session cookie                     | Yes                        | Privacy-focused, fewer models                 |
| `kimi-web`       | Cookie with `kimi-auth`            | Yes                        | Moonshot models                               |
| `lmarena`        | Full cookie header                 | Yes                        | For comparing models, not production use      |

---

## Tier 3: OAuth Providers

These use standard OAuth flows. OmniRoute redirects you to the provider's login page, you authorize, and a token is stored.

### Coding Assistants (Free Tiers)

| Provider             | Free Tier           | What You Get               | Limitations                    |
| -------------------- | ------------------- | -------------------------- | ------------------------------ |
| `github`             | GitHub Copilot Free | Code suggestions in IDE    | Not usable as general chat LLM |
| `gitlab-duo`         | Free tier available | Limited AI features        | Requires GitLab account        |
| `cline`              | Free tier           | Coding assistance          | Limited requests/month         |
| `kilocode`           | Free tier           | Coding assistance          | Limited models                 |
| `windsurf`           | Free tier           | Coding assistance          | Limited to Windsurf IDE        |
| `trae`               | Free tier           | ByteDance coding assistant | Limited requests               |
| `qoder`              | Free tier           | Coding models              | Rate limits                    |
| `zed` / `zed-hosted` | Free tier           | Zed AI                     | Limited to Zed editor          |
| `codex`              | Free tier           | OpenAI Codex CLI           | Monthly credit caps            |
| `cursor`             | Free tier           | Cursor AI                  | Limited requests               |

### Coding Assistants (Paid/Deprecated)

| Provider      | Status         | Notes                                                                                                |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `qwen`        | **DEPRECATED** | OAuth free tier discontinued 2026-04-15. Use `bailian-coding-plan` or `alibaba` with API key instead |
| `claude`      | Paid           | Requires Anthropic API key or Claude subscription                                                    |
| `kiro`        | Paid           | AWS credits (50 free/month), ToS restricts proxy use                                                 |
| `amazon-q`    | Paid           | Requires AWS Builder ID                                                                              |
| `antigravity` | Limited        | Free tier available                                                                                  |
| `grok-cli`    | Paid           | Requires Grok subscription                                                                           |
| `devin-cli`   | Paid           | Devin AI — expensive                                                                                 |
| `github`      | Partial        | Copilot Free exists but limited                                                                      |

### Important: ToS Considerations

Several providers' Terms of Service explicitly or implicitly restrict using their free tier through a proxy like OmniRoute. This is a practical risk, not a technical one — OmniRoute routes requests as a user-agent, but the provider can detect unusual patterns. Check each provider's ToS before relying on their free tier in production.

---

## Tier 4: API Key Providers (Free Tiers Vary)

These require an API key. Most have free tiers with credit limits. Some are genuinely free; others are effectively paid.

### Generous Free Tiers

| Provider              | Free Tier | Monthly Credits     | Notes                               |
| --------------------- | --------- | ------------------- | ----------------------------------- |
| Google AI Studio      | Yes       | Free quota          | Generous Gemini API access          |
| Mistral               | Yes       | Free tier available | Rate limits apply                   |
| Cohere                | Yes       | Free tier           | Limited models                      |
| Together AI           | Yes       | $25 free credits    | Expires after 3 months              |
| Groq                  | Yes       | Free tier           | Very fast inference, limited models |
| Cloudflare Workers AI | Yes       | 10K neurons/day     | Limited model selection             |
| SambaNova             | Yes       | Free tier           | Fast inference                      |
| Cerebras              | Yes       | Free tier           | Fast inference                      |

### Limited Free Tiers

| Provider     | Free Tier                  | Notes                         |
| ------------ | -------------------------- | ----------------------------- |
| OpenAI       | $5 free credits (one-time) | No recurring free tier        |
| Anthropic    | No free tier               | Requires API key with billing |
| Fireworks AI | $1 free credits            | Limited                       |
| DeepInfra    | Free tier                  | Rate limits on popular models |
| Novita AI    | Free tier                  | Limited credits               |

### No Free Tier (Paid Only)

| Provider            | Notes                          |
| ------------------- | ------------------------------ |
| AWS Bedrock         | Requires AWS account + billing |
| Azure OpenAI        | Requires Azure subscription    |
| Google Cloud Vertex | Requires GCP billing           |

---

## Tier 5: Local Providers (Free, Requires Hardware)

Run models on your own hardware. No API keys, no rate limits, no privacy concerns — but you need GPU/CPU resources.

| Provider       | Hardware Requirement | Notes                                |
| -------------- | -------------------- | ------------------------------------ |
| `ollama-local` | Any (CPU or GPU)     | Easiest setup, `ollama pull <model>` |
| `lm-studio`    | Any (CPU or GPU)     | GUI for managing models              |
| `llama-cpp`    | CPU or GPU           | Most flexible, requires GGUF files   |
| `llamafile`    | Any (CPU or GPU)     | Single-file distribution             |
| `vllm`         | GPU required         | Production-grade serving             |
| `xinference`   | CPU or GPU           | Model management platform            |
| `oobabooga`    | GPU recommended      | Text generation web UI               |
| `comfyui`      | GPU required         | Image generation                     |
| `sdwebui`      | GPU required         | Stable Diffusion WebUI               |

**Recommendation for beginners:** Start with `ollama-local`. Pull a small model like Llama 3.1 8B or Phi-3 and you're running in under 5 minutes.

---

## Common Pitfalls

### Running on a Cloud VPS?

If OmniRoute is deployed on a cloud VPS (Oracle Cloud, AWS, Azure, DigitalOcean):

1. **DuckDuckGo AI Chat** will hit anti-bot challenges quickly.
2. **The Old LLM** blocks known cloud provider IP ranges entirely.
3. **Veo AI Free** has strict per-IP rate limits shared across all users on that IP.
4. **Web cookie providers** may flag unusual IP patterns if the cookie was generated from a different IP.

**Workarounds:**

- Use a residential proxy or VPN exit node.
- Prefer API key providers (they don't care about your IP).
- Use local providers with `ollama-local` or `llama-cpp`.

### "Free" Providers That Actually Require Effort

| Provider                 | Effort Required                                  |
| ------------------------ | ------------------------------------------------ |
| `auggie`                 | Install CLI + interactive browser login          |
| `mimocode`               | Device fingerprint bootstrap (can fail headless) |
| `theoldllm`              | Playwright install + non-cloud IP                |
| All web cookie providers | Manual cookie extraction from browser            |
| All OAuth providers      | Interactive OAuth flow (some require CLI)        |

### Rate Limiting Reality Check

Most "unlimited free" providers have undocumented rate limits that kick in after sustained use. OmniRoute has built-in circuit breakers that automatically pause providers hitting rate limits and retry later. Check the Troubleshooting guide for resetting circuit breakers.

---

## Recommended Starter Configuration

For new users who want to get running quickly with minimal friction:

**Step 1 — Zero-config providers (copy-paste ready):**

```
opencode      → Kimi / GLM (no setup)
gemini-web    → Gemini (paste cookie from gemini.google.com)
deepseek-web  → DeepSeek (paste token from deepseek.com)
```

**Step 2 — Add a local model for reliability:**

```
ollama-local  → ollama pull llama3.1:8b
```

**Step 3 — Add API key providers as needed:**

```
google-ai    → Free tier, generous (get key from aistudio.google.com)
groq          → Free tier, very fast (get key from console.groq.com)
```

This gives you ~6-8 models across different providers with minimal setup. Expand from there.

---

## Contributing to This Guide

This guide is meant to reflect **reality**, not marketing. If you find:

- A provider's status has changed (new free tier, discontinued, etc.)
- A workaround that isn't listed
- Inaccurate information

Open a PR or issue on the OmniRoute repository. Keep it practical — what works, what doesn't, and what the user actually needs to do.
