# Post 5: r/selfhosted (Docker + Free Stack)

**Subreddit:** r/selfhosted (~400K)
**Schedule:** Day 2 (Wednesday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `architecture-fallback-diagram.png` — shows the technical flow and Docker setup context
2. **Second image:** `free-stack-infographic.png` — shows the 4 free tiers and zero cost

**How to add:** In Reddit post editor, click the image icon → upload images in order. They appear inline in the body at the position where you add them.

---

## Title:

```
Self-hosted AI gateway — one Docker container, 44+ providers, multi-account pooling per provider, API key management, smart fallback. My team's stack costs $0/month.
```

## Body:

```
Built a self-hosted AI gateway for my team. After deploying to a VPS, 3 developers connect their tools to it — one shared endpoint, organized quota pooling across accounts, zero per-seat costs.

## Quick Docker deploy

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

Dashboard at `http://your-server:20128`. AMD64 and ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi all work).

[IMAGE: architecture diagram showing the proxy and fallback tiers]

## The team's free stack and how we pool accounts

    Provider      | Accounts | Models                  | Cost/month
    --------------+----------+-------------------------+------------
    Gemini CLI    |    ×3    | gemini-3-flash-preview  | FREE
                  |          | (each: 180K/mo)         | (540K total)
    Qoder         |    ×1    | kimi-k2-thinking,       | FREE
                  |          | qwen3-coder-plus,       | (unlimited)
                  |          | deepseek-r1             |
    Kiro          |    ×3    | claude-sonnet-4.5,      | FREE
                  |          | claude-haiku-4.5        | (unlimited)
    Qwen          |    ×1    | qwen3-coder-plus        | FREE
    --------------+----------+-------------------------+------------
    TOTAL for     |          |                         | $0/month
    3 developers  |          |                         |

Each developer connects their own Gemini CLI and Kiro accounts. OmniRoute **pools the quota from all 3 Gemini accounts** (3×180K = 540K tokens/month combined) and distributes requests across them using least-used strategy. When the active account slows down or nears its daily limit, OmniRoute shifts to the others — seamlessly. When all 3 hit the monthly cap, Qoder handles the overflow with no quota limits.

[IMAGE: free stack infographic showing all 4 tiers]

## What OmniRoute actually does

**One app, all providers — with account pooling:**

1. Connect accounts via OAuth (Kiro, Qoder, Gemini) or API key (DeepSeek, Groq, etc.)
2. **Multiple accounts per provider are grouped in a pool** — up to 10 per provider
3. Set up a "Combo" — your fallback pipeline: Gemini pool → Qoder → Kiro pool → Qwen
4. Point all tools to `http://your-server:20128/v1`
5. OmniRoute distributes, routes, and tracks usage per account

**Format translation happens automatically:**
OpenAI format in → Claude/Gemini/etc. format out. Transparent to the caller.

## API Key Management (key for team deployments)

Each developer gets their own API key from OmniRoute. We scope keys by provider and model pattern:

- Dev A's key → all providers, all models
- Dev B's key → free tiers only (`qoder/*`, `kiro/*`, `qwen/*`)
- CI pipeline key → embedding providers only
- Wildcard patterns: `openai/*`, `claude/*`, `kiro/*`

Keys are scoped, rotatable, and track usage individually. The usage dashboard shows per-key costs and quotas — essential for understanding team AI consumption.

## What else comes with it

- 🔌 **Circuit breakers** — per-model trip/recover, <1s auto-switch when provider goes down
- 📊 **Dashboard** — real-time quota per account, cost tracking, request logs
- 🧠 **Semantic cache** — repeated prompts served from cache, zero tokens
- 🔧 **MCP Server** — 16 tools to control OmniRoute from IDE (stdio, SSE, HTTP)
- 🤖 **A2A Protocol** — agent-to-agent orchestration with SSE streaming
- 🖼️ **Multi-modal** — images, audio, TTS, video, music, embeddings
- 💾 **AES-256 encryption** — all credentials encrypted at rest
- 📂 **Auto backup** — SQLite backup/export/import
- 🌍 **30 language UI** — RTL support included

## Compose profiles

```yaml
# Base profile (no CLI tools built-in)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw pre-installed)
docker compose --profile cli up -d
```

Production compose also available (`docker-compose.prod.yml`) with isolated data volumes.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
GPL-3.0. Self-host everything. Own your AI stack.
```

**Character count:** ~2,600 ✅
**Tone:** Selfhosted/team deployment, multi-account pooling shown as shared quota across team members, Docker-focused
