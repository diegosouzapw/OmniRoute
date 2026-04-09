# Post 3: r/node / r/programming (Technical Deep Dive)

**Subreddits:** r/node (~200K), r/programming (~6M)
**Schedule:** Day 3 (Thursday) / Day 6 (Tuesday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `architecture-fallback-diagram.png` — the technical architecture flowchart showing the proxy, fallback tiers, and format translation
2. Optional second image: `omniroute-hub-diagram.png` — shows providers connected to the central hub

**How to add:** Reddit post editor → camera/photo icon → upload image → it appears inline in the post.

---

## Title:

```
Built a free AI gateway in TypeScript — one OpenAI-compatible endpoint for 44+ providers, multi-account pooling per provider, 4-tier fallback, MCP server + A2A protocol
```

## Body:

```
## What it does

OmniRoute is a local reverse proxy built in TypeScript/Next.js that exposes a single OpenAI-compatible endpoint (`localhost:20128/v1`) for 44+ AI providers. It handles format translation, multi-account pooling, provider routing, OAuth token management, cost tracking, and agent protocol support — all in one process.

[IMAGE: architecture diagram showing the full request pipeline]

## Core architecture

**Request Pipeline (`open-sse/` — JS, ES Modules):**

- `chatCore.js` — Main chat completions proxy, SSE + non-SSE
- `responsesHandler.js` — OpenAI Responses API compatibility for Codex
- `responseTranslator.js` — Format conversion between API specs
- `translator/` — OpenAI ↔ Claude ↔ Gemini ↔ Ollama, schema-safe

**Routing Engine:**

    Client → localhost:20128/v1 (OpenAI-compatible)
      → Per-provider account pool (up to 10 OAuth accounts per provider)
        → 6 distribution strategies: round-robin | least-used | cost-optimized | fill-first | P2C | random
      → 4-tier cross-provider fallback: Subscription → API Key → Cheap → Free
      → Per-model circuit breaker (open/half-open/closed)
      → Anti-thundering herd: mutex + semaphore on retry events
      → Semantic cache (signature + embedding, two-tier)
      → 5s request idempotency window / content-hash dedup

**Multi-Account Pooling:**

The account pool is per provider — each provider in a combo can have multiple connected OAuth accounts. OmniRoute distributes requests across them using the configured strategy, then spills over to the next provider when all accounts in a tier are exhausted or slow.

    Example: 3 team members each connect their Gemini CLI account.
    OmniRoute pools all 3 → distributes load across them → 3× the monthly quota.
    When all 3 hit their monthly cap → spills to Qoder (unlimited).

**Data Layer (`src/lib/db/`):**

SQLite via `better-sqlite3`. WAL mode, AES-256-GCM encryption at rest. Domain modules: `core.ts`, `providers.ts`, `models.ts`, `apiKeys.ts`, `settings.ts`, `backup.ts`.

## Agent protocols

**MCP Server (16 tools, 3 transports):**

- `stdio` — Local IDE integration (Claude Desktop, Cursor, VS Code)
- `SSE` — Remote at `/api/mcp/sse`
- `Streamable HTTP` — Modern bidirectional at `/api/mcp/stream`
- 9 authorization scopes, SQLite audit log, Zod validation

**A2A Server:**

- JSON-RPC 2.0: `message/send`, `message/stream`, `tasks/get`, `tasks/cancel`
- Agent Card at `/.well-known/agent.json`
- SSE streaming with 15s heartbeat, TTL-based cleanup

## API surface

**Chat / Completions:**
- `/v1/chat/completions` — SSE + non-SSE
- `/v1/responses` — Responses API for Codex

**Media:**
- `/v1/images/generations` — 10 providers, 20+ models
- `/v1/audio/transcriptions` — Whisper + Deepgram + AssemblyAI
- `/v1/audio/speech` — ElevenLabs, Inworld, Cartesia, PlayHT + more
- `/v1/videos/generations` — ComfyUI, SD WebUI
- `/v1/music/generations` — MusicGen, Stable Audio Open
- `/v1/embeddings` — 6 providers
- `/v1/rerank` — Relevance scoring

## The free-forever stack (multi-account aware)

    gc/gemini-3-flash     → up to 10 accounts, 180K tokens/month each, round-robin
    if/kimi-k2-thinking   → Unlimited (Qoder OAuth) — single account absorbs overflow
    kr/claude-sonnet-4.5  → Unlimited (Kiro/AWS Builder ID) — up to 10 accounts pooled
    qw/qwen3-coder-plus   → Unlimited (Qwen Device Code) — final safety net

Multiple Gemini CLI accounts (personal, work, side project) contribute their quotas to the same pool. When one is exhausted, others continue. When all are exhausted for the day, spill to Qoder with zero downtime.

**API Key Management for teams:** Issue scoped keys with model-level permissions. Restrict per provider, per model, wildcard patterns. Usage tracked per key. Dashboard for key lifecycle management.

## Tech stack

Next.js 16 (App Router), TypeScript 5.9, SQLite (better-sqlite3), OAuth 2.0 PKCE, Docker (AMD64+ARM64), Electron, next-intl (30 languages). ~60K lines TypeScript. GPL-3.0.

**GitHub:** https://github.com/diegosouzapw/OmniRoute

```bash
npm install -g omniroute && omniroute
```
```

**Character count:** ~2,600 ✅
**Tone:** Technical deep-dive, multi-account pooling as an architectural feature, developer audience
