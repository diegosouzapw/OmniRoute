# Providers — Claude Web

## claude-web

Web-cookie-based provider for **Claude AI** (`claude.ai`) using session cookie authentication.

### How It Works

1. User pastes their `claude.ai` session cookies into the OmniRoute dashboard
2. `ClaudeWebExecutor` transforms OpenAI-format requests to Claude Web API format
3. Requests are sent via **`tls-client-node`** with **Chrome 124 TLS fingerprint** to bypass Cloudflare Turnstile
4. Responses are streamed back via SSE (`text/event-stream`)

### Required Cookies

| Cookie         | Purpose                        | Source                                 |
| -------------- | ------------------------------ | -------------------------------------- |
| `sessionKey`   | Main authentication            | `claude.ai` browser session            |
| `routingHint`  | Anthropic routing              | `claude.ai` browser session            |
| `cf_clearance` | Cloudflare Turnstile clearance | Auto-set by Cloudflare after challenge |
| `__cf_bm`      | Cloudflare bot management      | Auto-set by Cloudflare                 |
| `_cfuvid`      | Cloudflare visitor ID          | Auto-set by Cloudflare                 |

> **Note**: `cf_clearance` is bound to the TLS fingerprint of the browser that solved Cloudflare's Turnstile challenge. The `tls-client-node` library (via `claudeTlsClient.ts`) spoofs a Chrome 124 TLS handshake so the clearance token works from the OmniRoute server.

### API Reference

**Endpoint**: `POST /api/organizations/{orgId}/chat_conversations/{convId}/completion`

**Required Headers**:

```
accept: text/event-stream
anthropic-client-platform: web_claude_ai
anthropic-device-id: <uuid>
content-type: application/json
Referer: https://claude.ai/chat/{convId}
```

**Request Body**:

```json
{
  "prompt": "user message",
  "model": "claude-sonnet-4-6",
  "timezone": "Asia/Jakarta",
  "locale": "en-US",
  "personalized_styles": [...],
  "tools": [...],
  "rendering_mode": "messages",
  "create_conversation_params": {
    "name": "",
    "model": "claude-sonnet-4-6",
    "is_temporary": false
  }
}
```

### Architecture

```
User Cookies (claude.ai)
    ↓
OmniRoute Dashboard
    ↓
ClaudeWebExecutor (open-sse/executors/claude-web.ts)
    ↓ Request transformation (OpenAI → Claude Web format)
    ↓
tlsFetchClaude() (open-sse/services/claudeTlsClient.ts)
    ↓ Chrome 124 TLS fingerprint spoofing
    ↓
tls-client-node (Go native binding, koffi)
    ↓
claude.ai API
    ↓ SSE stream
```

### Files

| File                                                  | Purpose                                      |
| ----------------------------------------------------- | -------------------------------------------- |
| `src/shared/constants/providers.ts`                   | Provider registration (WEB_COOKIE_PROVIDERS) |
| `src/lib/providers/wrappers/claudeWeb.ts`             | Type definitions + cookie utilities          |
| `open-sse/executors/claude-web.ts`                    | Executor implementation                      |
| `open-sse/executors/index.ts`                         | Executor registration                        |
| `open-sse/services/claudeTlsClient.ts`                | TLS fingerprint spoofing via tls-client-node |
| `open-sse/services/__tests__/claudeTlsClient.test.ts` | TLS client tests                             |
| `tests/unit/claude-web.test.ts`                       | Executor tests                               |

### Testing

```bash
# Unit tests
node --import tsx/esm --test tests/unit/claude-web.test.ts

# TLS client tests
npx vitest run open-sse/services/__tests__/claudeTlsClient.test.ts
```

### Setup

1. Start OmniRoute: `omniroute`
2. Go to Dashboard → Providers → Add Provider
3. Select "Web Cookie" category
4. Choose "Claude Web"
5. Paste your full cookie header from `claude.ai` browser DevTools (Network tab → Copy as fetch → Cookie header)
