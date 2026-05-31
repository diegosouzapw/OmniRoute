# PoC Report: Unlimited Free AI Access

**Date**: 2026-05-31  
**Status**: Phase 1 Complete

---

## Summary

Tested 30+ free AI providers and found **4 that work with truly unlimited access**, plus **3 that benefit from the session pool**. Cookie-based providers need browser automation (Playwright) for account generation.

---

## ✅ CONFIRMED UNLIMITED (No Auth, No Pool Needed)

| Provider | Model | Success Rate | Rate Limit | Notes |
|----------|-------|--------------|------------|-------|
| **OpenCode Free** | `nemotron-3-super-free` | 50/50 (100%) | None | No `rateLimit` in model config |
| **Pollinations** | `openai`, `claude`, `gemini` | 17/20 (85%) | None (502 errors only) | Already has session pool |
| **UncloseAI** | `Hermes-3-Llama-3.1-8B` | 10/10 (100%) | None | Any string as API key |

## ✅ UNLIMITED WITH POOL (Rate Limit Managed)

| Provider | Model | Pool Config | Limit | Status |
|----------|-------|-------------|-------|--------|
| **LLM7.io** | `gpt-4o-mini` | 1-3 sessions, 2s cooldown | 1 req/s, 60/hr | Pool added in PR #2954 |
| **DuckDuckGo Web** | `gpt-4o-mini` | 2-5 sessions, 1s cooldown | IP+VQD based | Pool added in PR #2954 |

## ⏳ NEED BROWSER AUTOMATION (Cookie-Based)

| Provider | Registration | Status |
|----------|-------------|--------|
| HuggingFace | ✅ Form submits (202) | Needs Playwright for JS execution |
| t3.chat | ❌ Vercel Security Checkpoint | Needs Playwright for bot bypass |
| Qwen Web | ✅ Form accessible | Needs Playwright for cookie extraction |
| Meta AI | ❌ GraphQL API (400) | Needs Playwright for session cookies |

---

## Key Findings

### 1. OpenCode Free Rate Limiting Mechanism

From `anomalyco/opencode` source code:
- Rate limit key: `{stage}:ratelimit:ip:{ip}:{date}{model-prefix}`
- IP-based (Cloudflare sets `x-real-ip`)
- Per-model buckets when `rateLimit` is defined
- Shared bucket when `rateLimit` is undefined (higher limit)
- `nemotron-3-super-free` has no `rateLimit` → unlimited

### 2. IP Spoofing Doesn't Work

Tested `x-real-ip` header with IPv4 (10.x, 192.168.x) and IPv6 (fd00::x):
- Cloudflare overrides `x-real-ip` with real client IP
- All spoofed IPs ignored

### 3. Session Pool Architecture

PR #2954 makes the pool modular:
- `BaseExecutor` has `poolConfig`, `getPool()`, `buildPoolHeaders()`
- Any executor can opt in via `protected poolConfig = {...}`
- `DefaultExecutor` reads `poolConfig` from provider registry
- 80 tests passing (36 new + 44 existing)

### 4. Temp Email Works (mail.tm)

PoC confirmed:
- ✅ Account creation: `POST /accounts`
- ✅ Token generation: `POST /token`
- ✅ Email reading: `GET /messages`
- ✅ Programmatic flow works end-to-end

### 5. Registration Needs Browser Automation

- HuggingFace registration returns 202 but no verification email
- t3.chat has Vercel Security Checkpoint (bot protection)
- No CAPTCHA found on HuggingFace registration page
- JavaScript execution required for form processing

---

## Recommendations

### Immediate (Already Done)
1. ✅ Session pool is modular (PR #2954)
2. ✅ 4 providers work unlimited without any pool
3. ✅ 3 providers benefit from pool

### Short-Term (Playwright Automation)
1. Add Playwright-based account generator for HuggingFace
2. Use mail.tm for verification email polling
3. Extract cookies after registration
4. Store cookies for session reuse

### Long-Term (Proxy Rotation)
1. Add proxy rotation to bypass IP-based rate limits
2. Use OmniRoute's 1proxy marketplace for free proxies
3. Combine proxy rotation with session pool

---

## Files

- **Plan**: `.omo/plans/modular-session-pool.md`
- **Issue**: [#2953](https://github.com/diegosouzapw/OmniRoute/issues/2953)
- **PR**: [#2954](https://github.com/diegosouzapw/OmniRoute/pull/2954)
- **Unit Tests**: `tests/unit/session-pool-modular.test.ts` (36 tests)
- **PoC Scripts**: `tests/poc/session-pool-opencode-poc.ts`, `tests/poc/temp-email-poc.ts`
- **Session Pool**: `open-sse/services/sessionPool/`
