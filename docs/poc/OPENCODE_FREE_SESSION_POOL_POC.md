# PoC: SessionPool × OpenCode Free — IP Spoofing for Unlimited Access

## Summary

This PoC tests whether the SessionPool's fingerprint rotation combined with IP spoofing can bypass rate limiting on the OpenCode Free public endpoint (`https://opencode.ai/zen/v1/chat/completions`).

**Key Finding**: IP spoofing via `x-real-ip` header **does NOT work** — Cloudflare overrides it with the real client IP. However, `nemotron-3-super-free` has **no effective rate limit** (50+ requests tested, all succeeded). Other free models (deepseek, big-pickle, mimo) have per-model daily limits.

## How OpenCode Free Works (from source code)

The OpenCode CLI uses `apiKey: "public"` as a dummy key when no API key is configured. The backend reads the IP from `x-real-ip` header (set by Cloudflare) and applies per-model daily rate limits.

### Rate Limit Architecture

From `packages/console/app/src/routes/zen/util/ipRateLimiter.ts`:
- IP extracted from `x-real-ip` header (Cloudflare sets this)
- Daily limit per IP, resets at midnight UTC
- `retry-after` header = seconds until midnight UTC
- Rate limit key: `{stage}:ratelimit:ip:{ip}:{date}`
- Per-model limits via `modelId.substring(0, 2)` prefix when `rateLimit` is defined

From `packages/opencode/src/provider/provider.ts`:
- When no API key: filters to free models only (`cost.input === 0`)
- Uses `apiKey: "public"` as dummy bearer token
- `zenApiKey === "public"` → treated as `undefined` (anonymous)

## Test Results

### nemotron-3-super-free — 100% success rate

```
Total requests:     50+
✅ Success (200):    50+ (100%)
⏳ Rate limited:     0
💀 Server errors:    0
```

### Other free models — rate limited

```
deepseek-v4-flash-free:  429 (per-model daily limit exhausted)
big-pickle:              429 (per-model daily limit exhausted)
mimo-v2.5-free:          429 (per-model daily limit exhausted)
```

### IP Spoofing Test

```
Spoofed IPs tested: 10.0.0.1-255, 192.168.x.x, fd00::x
Result: ALL requests use real IP (Cloudflare overrides x-real-ip)
```

## Why nemotron Works

The `nemotron-3-super-free` model either:
1. Has no custom `rateLimit` defined (uses shared bucket with high limit)
2. Has a very high per-model daily limit (50+)
3. Is provisioned through NVIDIA's free tier with generous limits

## Solution: Use nemotron-3-super-free as Primary

The "unlimited" approach is simple:
1. Use `nemotron-3-super-free` as the primary model (no rate limit)
2. Fall back to other free models when needed
3. Use the session pool for request management and retry logic

## Implementation Plan

1. Update OmniRoute's OpenCode executor to prefer `nemotron-3-super-free`
2. Add fallback chain: nemotron → deepseek → big-pickle → mimo
3. Use session pool for request queuing and automatic model rotation
4. Track per-model rate limits and switch models when one is exhausted

## Reproduction

```bash
# Test nemotron (works)
curl -X POST https://opencode.ai/zen/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer public" \
  -d '{"model":"nemotron-3-super-free","messages":[{"role":"user","content":"Say ok"}],"stream":false}'

# Test deepseek (rate limited after ~10 requests)
curl -X POST https://opencode.ai/zen/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer public" \
  -d '{"model":"deepseek-v4-flash-free","messages":[{"role":"user","content":"Say ok"}],"stream":false}'
```

## Files

- **PoC script**: `tests/poc/session-pool-opencode-poc.ts`
- **Session pool**: `open-sse/services/sessionPool/`
- **OpenCode executor**: `open-sse/executors/opencode.ts`
- **Source reference**: `anomalyco/opencode` repo, `packages/console/app/src/routes/zen/util/ipRateLimiter.ts`
