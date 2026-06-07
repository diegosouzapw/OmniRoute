# Unlimited LLM Access — Research Catalog

> **Last updated:** 2026-05-29
> **Status:** Active research
> **Related:** [Issue #2885](https://github.com/diegosouzapw/OmniRoute/issues/2885)

## Overview

This document catalogs every known method for accessing LLMs without paying — through reverse engineering, web cookies, auto-registration, trial exploitation, session pooling, and free-tier maximization. Each method includes feasibility rating, risk assessment, and implementation guidance.

**Feasibility Scale:** 1 (theoretical) → 5 (proven in production)

---

## Method Categories

### 1. Web-Cookie Subscription Bypass

**How it works:** Extract session cookies/tokens from a logged-in browser session and use them to call the provider's internal API directly, bypassing the official API and its billing.

**OmniRoute pattern:** Already implemented for 16 providers. Uses `webCookieAuth.ts` helpers for cookie normalization, TLS fingerprint bypass for Cloudflare, and OpenAI format translation.

| Provider | Cookie/Token | API Endpoint | Feasibility | Risk | Complexity | Status |
|----------|-------------|--------------|-------------|------|------------|--------|
| ChatGPT Web | `__Secure-next-auth.session-token` | `chatgpt.com/backend-api/f/conversation` | 5 | Medium | High (PoW + TLS) | ✅ Implemented |
| Claude Web | `sessionKey` | `claude.ai/api/organizations/{org}/chat_conversations/{conv}/completion` | 5 | Medium | High (Turnstile) | ✅ Implemented |
| Gemini Web | `__Secure-1PSID` | `gemini.google.com` (Playwright) | 5 | Low | Medium | ✅ Implemented |
| Copilot Web | `access_token` | `wss://copilot.microsoft.com/c/api/chat` | 5 | Medium | Medium (WebSocket) | ✅ Implemented |
| DeepSeek Web | `userToken` (localStorage) | `chat.deepseek.com/api/v0/chat/completion` | 5 | Medium | High (PoW) | ✅ Implemented |
| Perplexity Web | `__Secure-next-auth.session-token` | `perplexity.ai/rest/sse/perplexity_ask` | 5 | Medium | Medium (TLS) | ✅ Implemented |
| Blackbox Web | `__Secure-authjs.session-token` | `app.blackbox.ai/api/chat` | 5 | Medium | Low | ✅ Implemented |
| Grok Web | `sso` cookie | `grok.com/rest/app-chat/conversations/new` | 5 | Medium | High (NDJSON) | ✅ Implemented |
| Meta AI Web | `ecto_1_sess` | `meta.ai/api/graphql` | 5 | Medium | Medium | ✅ Implemented |
| t3.chat Web | cookies + `convex-session-id` | `t3.chat/api/chat` | 4 | Low | Medium | ✅ Skeleton |
| Inner.ai | `token` cookie | `chatapi.innerai.com/chat` | 5 | Low | Low | ✅ Implemented |
| Adapta Web | Clerk JWT | `agent.adapta.one/api/chat/stream/v1` | 5 | Low | Medium | ✅ Implemented |

**New candidates (not yet implemented):**

| Provider | Cookie/Token | API Endpoint | Feasibility | Risk | Complexity | Notes |
|----------|-------------|--------------|-------------|------|------------|-------|
| Poe Web | `p-b` cookie | `poe.com/api/gql_POST` (GraphQL) | 4 | Medium | High (GraphQL) | Many models via single subscription |
| Venice Web | session cookie | `venice.ai/api/...` | 4 | Low | Low | Privacy-focused, less bot detection |
| v0 Vercel Web | session cookie | `v0.dev/api/...` | 3 | Low | Medium | Code gen focused |
| Kimi Web | session cookie | `kimi.moonshot.cn/api/...` | 4 | Medium | Medium | Chinese market, may need captcha |
| Doubao Web | session cookie | `doubao.com/api/...` | 4 | Medium | Medium | ByteDance, large model catalog |
| you.com | session cookie | `you.com/api/...` | 4 | Low | Medium | Issue #2690 |
| HuggingChat | CSRF token | `huggingface.co/chat/conversation` | 5 | Low | Low | Free, no auth for basic use |
| Phind | session cookie | `phind.com/api/...` | 4 | Low | Low | Free tier, dev-focused |

**Key techniques:**
- Cookie normalization via `extractCookieValue()` / `normalizeSessionCookieHeader()`
- TLS fingerprint bypass (JA3/JA4 matching) for Cloudflare-protected sites
- Proof-of-work solvers (SHA3-512, DeepSeekHashV1, hashcash)
- Browser fingerprint spoofing (User-Agent, Sec-Ch-Ua, Origin, Referer)
- Auto-refresh wrappers for session expiry handling

---

### 2. Free-Tier / No-Auth Providers

**How it works:** Use providers that offer free access without authentication, or with generous free tiers that don't require payment.

| Provider | Auth Required | Rate Limit | Models | Feasibility | Risk | Status |
|----------|--------------|------------|--------|-------------|------|--------|
| OpenCode Free | No | Yes | Kimi, GLM, Qwen, MiMo, MiniMax | 5 | None | ✅ Implemented |
| Qoder AI | No | Yes | Multiple | 5 | None | ✅ Implemented |
| Pollinations | No | Yes | Image/gen models | 5 | None | ✅ Implemented |
| HuggingChat | No | Yes | Multiple open-source | 5 | None | 🔲 Candidate |
| Phind | Free tier | Yes | Code-focused | 5 | None | 🔲 Candidate |
| DuckDuckGo AI | No | Yes | GPT-4o-mini, Claude, etc. | 5 | None | 🔲 PR #2862 |

---

### 3. Auto-Registration (Programmatic Account Creation)

**How it works:** Automate the signup flow to create throwaway accounts, extract session tokens, and use them until they expire or get banned. Then repeat.

**Risk level:** HIGH — violates ToS of most providers. Research only unless user approves.

#### 3a. Disposable Email + Verification

**How it works:** Use disposable email services (Guerrilla Mail, TempMail, Mailinator) to create accounts. Most providers send a verification link — click it programmatically to complete signup.

| Provider | Signup Method | Verification | Feasibility | Risk | Notes |
|----------|--------------|--------------|-------------|------|-------|
| ChatGPT | Email + password | Email link | 4 | High | Rate limits on signup, phone verification may be required |
| Claude | Email + password | Email link | 3 | High | Anthropic may require phone |
| Gemini | Google account | OAuth | 3 | Medium | Need Google account automation |
| Perplexity | Email + password | Email link | 4 | Medium | Less aggressive bot detection |
| Poe | Email + password | Email link | 4 | Medium | Quora account system |

**Implementation complexity:** Medium
- Need: disposable email API, HTTP client for signup flow, email link extractor, session token storage
- Challenge: CAPTCHAs (most providers use reCAPTCHA/hCaptcha), IP rate limiting, phone verification

#### 3b. OAuth Automation

**How it works:** Create throwaway Google/GitHub/Apple accounts, then use OAuth to sign up for LLM providers. More reliable than email-based signup because OAuth tokens are harder to invalidate.

| OAuth Provider | Target LLM Providers | Feasibility | Risk | Notes |
|---------------|---------------------|-------------|------|-------|
| Google | Gemini, ChatGPT, Claude | 3 | High | Google account creation requires phone |
| GitHub | Copilot, various | 4 | Medium | GitHub free tier is generous |
| Apple | Claude, others | 2 | High | Apple ID creation is heavily gated |

**Implementation complexity:** High
- Need: Playwright-based browser automation, CAPTCHA solving service, phone verification service
- Challenge: Google/Apple account creation requires phone number, increasingly aggressive bot detection

#### 3c. SMS Verification

**How it works:** Use virtual phone number services (SMS-Activate, 5sim, SMSpva) to receive verification codes during signup.

| Service | Cost per SMS | Countries | Reliability | Notes |
|---------|-------------|-----------|-------------|-------|
| SMS-Activate | $0.10-0.50 | 180+ | High | Most popular |
| 5sim | $0.05-0.30 | 100+ | Medium | Cheaper but less reliable |
| SMSpva | $0.10-0.50 | 50+ | Medium | Limited country selection |

**Implementation complexity:** High
- Need: virtual number API integration, SMS parsing, retry logic for failed verifications
- Challenge: cost per attempt, number recycling (may get already-used numbers), provider blacklisting

---

### 4. Token Harvesting / Session Pooling

**How it works:** Extract tokens from existing authenticated sessions (browser extensions, CLI tools, other apps) and pool them for high-throughput access.

#### 4a. CLI Tool Token Extraction

| Tool | Token Location | Token Type | Feasibility | Notes |
|------|---------------|------------|-------------|-------|
| `gemini-cli` | `~/.gemini/oauth_creds.json` | OAuth refresh token | 5 | Already used by gemini-cli provider |
| `claude-code` | `~/.claude/credentials` | OAuth token | 5 | Already used by claude-code provider |
| `copilot-cli` | `~/.config/github-copilot/` | OAuth token | 4 | Used by copilot provider |
| `codex-cli` | `~/.codex/` | OAuth token | 4 | Used by codex provider |

#### 4b. Session Pool Architecture

```
┌─────────────────┐
│  Session Pool    │
│  ┌───┐ ┌───┐    │
│  │ S1│ │ S2│... │  ← Multiple authenticated sessions
│  └───┘ └───┘    │
│  ┌──────────┐   │
│  │ Rotator   │   │  ← Round-robin or health-based rotation
│  └──────────┘   │
│  ┌──────────┐   │
│  │ Health    │   │  ← Detect expired/banned sessions
│  │ Monitor   │   │
│  └──────────┘   │
└─────────────────┘
```

**Key features:**
- Round-robin or least-used rotation across sessions
- Health checks (periodic validation that sessions are still active)
- Auto-replace expired sessions
- Rate limit tracking per session
- Failover to next session on 401/403

---

### 5. Trial / Credit Exploitation

**How it works:** Exploit free trials, signup credits, and promotional offers from API providers.

| Provider | Free Credit | Expiry | Signup Method | Feasibility | Risk |
|----------|------------|--------|---------------|-------------|------|
| OpenAI | $5-18 credit | 3 months | Email + phone | 4 | Medium |
| Anthropic | $5 credit | 3 months | Email | 3 | Medium |
| Google Cloud | $300 credit | 90 days | Google account + credit card | 3 | Medium |
| AWS Bedrock | Free tier (limited) | 12 months | AWS account | 3 | Low |
| Azure OpenAI | $200 credit | 30 days | Microsoft account + phone | 3 | Medium |
| Together AI | $5 credit | — | Email | 5 | Low |
| Fireworks AI | $1 credit | — | Email | 5 | Low |
| Cerebras | Free tier | — | Email | 5 | Low |
| Groq | Free tier | — | Email | 5 | Low |

**Auto-registration potential:** Medium — most require email verification, some require phone or credit card.

---

### 6. Leaked / Shared Credential Rotation

**How it works:** Use API keys or session tokens from public sources (GitHub leaks, shared accounts, public dashboards).

**Risk level:** CRITICAL — unauthorized access, potential legal consequences.

| Source | Credential Type | Volume | Feasibility | Risk | Notes |
|--------|----------------|--------|-------------|------|-------|
| GitHub leaks | API keys | High | 4 | Critical | Search for leaked keys in public repos |
| Public dashboards | Session tokens | Low | 3 | High | Some projects expose tokens in configs |
| Shared accounts | Login credentials | Medium | 3 | High | Account sharing communities |

**NOT RECOMMENDED** — included for completeness only. This method involves unauthorized access and potential legal liability.

---

### 7. Reverse Engineering Official APIs

**How it works:** Intercept and reverse-engineer the internal APIs used by provider web interfaces, CLI tools, and mobile apps.

| Target | Protocol | Auth Method | Complexity | Feasibility | Status |
|--------|----------|-------------|------------|-------------|--------|
| ChatGPT Web | REST + SSE | Session token + PoW | High | 5 | ✅ Done |
| Claude Web | REST + TLS | Session key + Turnstile | High | 5 | ✅ Done |
| Gemini Web | Playwright | Cookie injection | Medium | 5 | ✅ Done |
| Copilot Web | WebSocket | Hashcash PoW | Medium | 5 | ✅ Done |
| DeepSeek Web | REST + SSE | userToken + PoW | High | 5 | ✅ Done |
| Poe Web | GraphQL | p-b cookie | High | 4 | 🔲 Candidate |
| Kimi Web | REST | Session cookie | Medium | 4 | 🔲 Candidate |
| Doubao Web | REST | Session cookie | Medium | 4 | 🔲 Candidate |

**Key techniques:**
- Browser DevTools network tab for API discovery
- mitmproxy / Charles for HTTPS interception
- Playwright for automating browser interactions
- TLS fingerprint matching (JA3/JA4)
- PoW solver implementation

---

## Top Candidates for Implementation (Ranked)

| Rank | Provider | Method | Feasibility | Risk | Effort | Value |
|------|----------|--------|-------------|------|--------|-------|
| 1 | HuggingChat | Free/no-auth | 5 | None | Low | High (popular, many models) |
| 2 | Phind | Free tier | 5 | None | Low | Medium (dev-focused) |
| 3 | Poe Web | Web-cookie | 4 | Medium | High | High (many models) |
| 4 | Venice Web | Web-cookie | 4 | Low | Low | Medium (privacy) |
| 5 | v0 Vercel Web | Web-cookie | 3 | Low | Medium | Medium (code gen) |
| 6 | Kimi Web | Web-cookie | 4 | Medium | Medium | Medium (Chinese market) |
| 7 | Doubao Web | Web-cookie | 4 | Medium | Medium | Medium (Chinese market) |
| 8 | DuckDuckGo AI | Free/no-auth | 5 | None | Low | Medium (PR #2862) |
| 9 | Together AI | Trial credits | 5 | Low | Low | Low ($5 credit) |
| 10 | Fireworks AI | Trial credits | 5 | Low | Low | Low ($1 credit) |

---

## Auto-Registration Research Summary

### Disposable Email Flow
```
1. Generate temp email (Guerrilla Mail API)
2. Submit signup form (HTTP client)
3. Extract verification link from email (IMAP/API)
4. Click verification link
5. Extract session token from response
6. Store in session pool
7. Repeat when session expires
```

### OAuth Automation Flow
```
1. Create throwaway Google/GitHub account (Playwright)
2. Solve CAPTCHA (2captcha/anticaptcha API)
3. Complete phone verification (SMS-Activate)
4. Use OAuth to sign up for LLM provider
5. Extract session token
6. Store in session pool
```

### Key Challenges
- **CAPTCHAs:** Most providers use reCAPTCHA or hCaptcha. Solving services cost $1-3 per 1000 solves.
- **Phone verification:** Virtual numbers cost $0.10-0.50 per SMS. Numbers may be recycled/blacklisted.
- **IP rate limiting:** Providers track signup IP. Need proxy rotation.
- **Detection:** Providers increasingly use behavioral analysis (mouse movements, typing patterns).
- **Sustainability:** Accounts get banned. Need continuous re-registration.

---

## Session Lifecycle Management

### Full Automation Pipeline
```
Register → Verify → Extract Session → Store in Pool → Use → Detect Expiry → Re-register
```

### Health Check Strategy
- Periodic validation: send lightweight request, check response
- Expiry detection: track TTL from session creation
- Ban detection: monitor for 401/403 responses
- Auto-replace: remove unhealthy sessions, trigger re-registration

### Pool Configuration
```typescript
interface SessionPool {
  providerId: string;
  sessions: Session[];
  rotationStrategy: 'round-robin' | 'least-used' | 'random';
  maxSessions: number;
  healthCheckInterval: number; // ms
  autoReplace: boolean;
}
```

---

## Risk Assessment Matrix

| Method | ToS Violation | Legal Risk | Account Ban | IP Ban | Cost |
|--------|--------------|------------|-------------|--------|------|
| Web-cookie (own account) | Low | Low | Low | Low | Free |
| Free-tier providers | None | None | None | None | Free |
| Auto-registration | High | Medium | High | Medium | $0.10-0.50/account |
| Token harvesting | Low | Low | Low | Low | Free |
| Trial exploitation | Medium | Low | Medium | Low | Free |
| Leaked credentials | Critical | High | High | High | Free |

---

## References

- OmniRoute provider definitions: `src/shared/constants/providers.ts`
- Cookie auth helpers: `src/lib/providers/webCookieAuth.ts`
- Existing executors: `open-sse/executors/`
- TLS clients: `open-sse/executors/chatgptTlsClient.ts`, `perplexityTlsClient.ts`, `claudeTlsClient.ts`
- PoW solvers: `open-sse/executors/deepseek-pow.ts`, `claudeTurnstileSolver.ts`
