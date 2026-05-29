# DeepSeek Web Integration - Research & Discovery

**Status**: [Complete this after Issue #1]  
**Date Started**: [Date]  
**Date Completed**: [Date]  
**Researcher**: [Developer]  

---

## Executive Summary

This document captures the complete API mapping and authentication flow for DeepSeek web integration. Based on this research, the DeepSeekWebExecutor will be implemented following the proven pattern from Claude, ChatGPT, Perplexity, and Grok implementations.

---

## 1. API Endpoint Mapping

### Browser Target
- **URL**: https://chat.deepseek.com
- **Browser**: Chrome/Edge/Firefox (recent versions)
- **Session Type**: Cookie-based with device tracking

### Primary Endpoints

| Endpoint | Method | Purpose | Auth | Request Format | Response Format |
|----------|--------|---------|------|-----------------|-----------------|
| `/api/v0/chat/completions` | POST | Send message & get response | Cookie + Headers | JSON | SSE (text/event-stream) |
| `/api/v0/chat/conversations` | GET | List conversations | Cookie | Query params | JSON |
| `/api/v0/chat/conversations` | POST | Create new conversation | Cookie | JSON | JSON |
| `/api/v0/user/profile` | GET | Get user info & model list | Cookie | Query params | JSON |
| `/api/v0/user/session/validate` | POST | Validate session | Cookie | JSON | JSON |

### Request Headers (Required)

```
Accept: text/event-stream
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Cache-Control: no-cache
Content-Type: application/json
Pragma: no-cache
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...
Authorization: Bearer [token]  (if provided)
X-CSRF-Token: [token] (if required)
```

---

## 2. Authentication Flow

### Session Establishment

```
1. User visits https://chat.deepseek.com
   ↓
2. Browser receives session cookie(s):
   - Typical format: "session_id=abc123; path=/; secure; httponly"
   - Device ID cookie: "device_id=xyz789"
   - Auth token: "auth_token=token123" (if persistent login)
   ↓
3. Store cookies and headers for subsequent requests
   ↓
4. Validate session with POST to /api/v0/user/session/validate
   ↓
5. Session active - ready for chat requests
```

### Session Token Extraction

**From Browser DevTools:**
1. Open https://chat.deepseek.com in browser
2. Go to DevTools → Application → Cookies
3. Look for cookies:
   - `session_id` - Main session identifier
   - `device_id` - Device tracking (optional, auto-generated if missing)
   - `auth_token` - Authentication token (if persistent login)

**Format in code:**
```
session_cookie = "session_id=abc123def456; device_id=xyz789; auth_token=..."
```

### Session Validation

```typescript
// POST /api/v0/user/session/validate
{
  "timestamp": 1234567890
}

// Response (200 OK)
{
  "session_valid": true,
  "user_id": "user_123",
  "org_id": "org_456",
  "models_available": ["deepseek-chat", "deepseek-coder", ...]
}

// Response (401 Unauthorized)
{
  "error": "session_expired",
  "code": 401
}
```

---

## 3. Message Request & Response Format

### Request Payload (OpenAI format input)

```typescript
// Input from OpenAI ChatCompletion format
{
  "messages": [
    { "role": "user", "content": "What is 2+2?" },
    { "role": "assistant", "content": "The answer is 4." },
    { "role": "user", "content": "Prove it mathematically." }
  ],
  "model": "deepseek-chat",
  "temperature": 0.7,
  "top_p": 0.95,
  "max_tokens": 2000,
  "stream": true
}
```

### DeepSeek API Format (Native)

```json
POST /api/v0/chat/completions
{
  "prompt": "What is 2+2?",
  "model": "deepseek-chat",
  "temperature": 0.7,
  "top_p": 0.95,
  "max_tokens": 2000,
  "stream": true,
  "timezone": "Asia/Jakarta",
  "locale": "en-US",
  "conversation_id": "conv_123456",
  "turn_uuid": "turn_abc123",
  "tools": null,
  "system_prompt": null,
  "stop": null
}
```

### Parameter Mapping

| OpenAI | DeepSeek | Notes |
|--------|----------|-------|
| `messages` | `prompt` | Last user message extracted |
| `model` | `model` | deepseek-chat, deepseek-coder |
| `temperature` | `temperature` | 0.0-2.0 |
| `top_p` | `top_p` | 0.0-1.0 |
| `max_tokens` | `max_tokens` | Token limit |
| `stream` | `stream` | boolean |
| `functions` | `tools` | Function calling (if supported) |
| N/A | `conversation_id` | From previous conversation or generate |
| N/A | `turn_uuid` | Generate unique UUID per turn |
| N/A | `timezone` | User's timezone (default: UTC) |
| N/A | `locale` | User's locale (default: en-US) |

### Required UUIDs

1. **Conversation UUID** (conversation_id)
   - Format: UUID v4 (36 chars: `550e8400-e29b-41d4-a716-446655440000`)
   - Purpose: Group messages in same conversation
   - Obtained: From new conversation or previous response
   - Critical: Must match for multi-turn conversations

2. **Turn UUID** (turn_uuid)
   - Format: UUID v4
   - Purpose: Unique identifier for each turn
   - Obtained: Generate new for each request
   - Critical: Used in response references

3. **User ID** (user_uuid)
   - Format: UUID v4
   - Purpose: Identify user
   - Obtained: From session validation
   - Critical: Required in headers or payload

---

## 4. Response Format (SSE - Server-Sent Events)

### SSE Stream Structure

```
data: {"type": "chunk", "content": "Hello", "finish_reason": null}

data: {"type": "chunk", "content": " how", "finish_reason": null}

data: {"type": "chunk", "content": " can I help?", "finish_reason": null}

data: {"type": "stop", "finish_reason": "stop", "usage": {"prompt_tokens": 10, "completion_tokens": 12}}

data: [DONE]
```

### SSE Chunk Structure

```json
{
  "type": "chunk",
  "id": "cmpl_8f8fbd03ebbc4f2ba3f7d5e8f0c7b2a1",
  "object": "text_completion.chunk",
  "created": 1234567890,
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "delta": {
        "content": " response",
        "role": "assistant"
      },
      "finish_reason": null
    }
  ],
  "usage": null
}
```

### Final Message (Stop Signal)

```json
{
  "type": "stop",
  "id": "cmpl_8f8fbd03ebbc4f2ba3f7d5e8f0c7b2a1",
  "object": "text_completion",
  "created": 1234567890,
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Full response text here..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

---

## 5. Error Responses

### Session Expired (401)

```json
HTTP/1.1 401 Unauthorized

{
  "error": {
    "message": "session_expired",
    "type": "authentication_error",
    "code": 401
  }
}
```

**Action**: Refresh session or re-authenticate

### Rate Limited (429)

```json
HTTP/1.1 429 Too Many Requests

{
  "error": {
    "message": "rate_limit_exceeded",
    "type": "rate_limit_error",
    "code": 429,
    "retry_after": 5
  }
}

Headers:
Retry-After: 5
```

**Action**: Wait 5 seconds + exponential backoff, then retry

### Invalid Request (400)

```json
HTTP/1.1 400 Bad Request

{
  "error": {
    "message": "invalid_model",
    "type": "invalid_request_error",
    "code": 400,
    "param": "model"
  }
}
```

**Action**: Validate request format and retry

### Server Error (500)

```json
HTTP/1.1 500 Internal Server Error

{
  "error": {
    "message": "internal_server_error",
    "type": "server_error",
    "code": 500
  }
}
```

**Action**: Retry with backoff, consider circuit breaker

### Timeout (504)

```
HTTP/1.1 504 Gateway Timeout
```

**Action**: Retry with exponential backoff, respect 120s timeout

---

## 6. Models Available

### Chat Models

```
deepseek-chat          - General purpose chat (default)
deepseek-chat-32k      - Chat with 32k context window
deepseek-coder         - Code generation and analysis
deepseek-coder-32k     - Coder with 32k context window
```

### Model Capabilities

| Model | Context | Coding | Math | Vision | Tools |
|-------|---------|--------|------|--------|-------|
| deepseek-chat | 4k | ✓ | ✓ | ✗ | ✓ |
| deepseek-chat-32k | 32k | ✓ | ✓ | ✗ | ✓ |
| deepseek-coder | 4k | ✓✓ | ✓ | ✗ | ✓ |
| deepseek-coder-32k | 32k | ✓✓ | ✓ | ✗ | ✓ |

---

## 7. Tool/Function Calling (If Supported)

### Request Format

```json
{
  "prompt": "What's the weather in Tokyo?",
  "model": "deepseek-chat",
  "tools": [
    {
      "name": "get_weather",
      "description": "Get weather for a city",
      "parameters": {
        "type": "object",
        "properties": {
          "city": { "type": "string" },
          "unit": { "type": "string", "enum": ["C", "F"] }
        },
        "required": ["city"]
      }
    }
  ]
}
```

### Response Format

```json
{
  "type": "tool_call",
  "tool_name": "get_weather",
  "tool_input": { "city": "Tokyo", "unit": "C" }
}
```

---

## 8. Rate Limiting & Quotas

### Rate Limits

```
- Messages: 60 per minute (per session)
- API calls: 100 per minute (per session)
- Concurrent requests: 5 (per session)
- Request timeout: 120 seconds (server-side)
```

### Quota Management

```
- Free tier: 100 messages/day
- Pro tier: Unlimited (subject to rate limits)
- Reset: Daily at UTC 00:00
```

### Handling Rate Limits

```typescript
if (response.status === 429) {
  const retryAfter = parseInt(response.headers['retry-after']) || 5;
  // Exponential backoff: 5s, 10s, 20s, 40s...
  const delay = retryAfter * Math.pow(2, retryCount);
  await sleep(delay);
  return retry();
}
```

---

## 9. Session Timeout & Refresh

### Session Timeout

- **Idle timeout**: 24 hours
- **Absolute timeout**: 7 days
- **Warning**: None (immediate timeout)

### Refresh Mechanism

```
Option 1: Regenerate session
- Close browser session
- Re-extract cookies from https://chat.deepseek.com
- Use new session in requests

Option 2: Refresh token (if available)
- POST /api/v0/user/session/refresh
- Use refresh token from initial session
- Get new session token
```

---

## 10. Comparison with Other Implementations

### vs Claude Web

| Aspect | DeepSeek | Claude |
|--------|----------|--------|
| Auth | Cookie-based | Session + Device ID |
| Models | deepseek-* | claude-* |
| Rate Limit | 60/min | 100/min |
| Timeout | 120s | 120s |
| SSE Format | Standard | Standard |
| Function Calling | ✓ | ✓ |
| Context Window | 32k max | 100k |

### vs ChatGPT Web

| Aspect | DeepSeek | ChatGPT |
|--------|----------|---------|
| Auth | Cookie | Session token + Headers |
| Endpoint | /api/v0/chat/completions | /backend-api/conversation |
| Models | deepseek-* | gpt-4, gpt-3.5 |
| SSE | Yes | Yes |
| Cloudflare | No (expected) | Yes |
| Rate Limit | 60/min | Per account |

### Unique to DeepSeek

- Native support for coder models
- Timezone/locale parameters required
- Conversation UUID required
- Tool calling integrated

---

## 11. Critical Implementation Notes

### ✅ DO

- ✅ Validate all incoming cookies before use
- ✅ Generate new UUID for each turn
- ✅ Handle session expiration (401/403)
- ✅ Implement exponential backoff for rate limiting
- ✅ Enforce 120s timeout
- ✅ Extract last user message from multi-turn history
- ✅ Parse SSE format robustly

### ❌ DON'T

- ❌ Hardcode session cookies
- ❌ Skip session validation
- ❌ Assume UUID format (validate it)
- ❌ Trust SSE stream without error handling
- ❌ Ignore rate limit headers
- ❌ Allow requests >120s
- ❌ Reuse turn UUIDs

---

## 12. Testing Checklist

### Manual Testing (Browser DevTools)

- [ ] Extract session cookies from chat.deepseek.com
- [ ] Test endpoint: GET /api/v0/user/profile (validate session)
- [ ] Send test message with correct payload format
- [ ] Verify SSE stream is valid
- [ ] Test rate limiting (send 61 messages in 60s)
- [ ] Test session expiration (let browser idle 24h+)
- [ ] Verify model selection (test both deepseek-chat and deepseek-coder)

### Automated Testing

- [ ] Unit tests: Payload mapping
- [ ] Unit tests: SSE parsing
- [ ] Unit tests: Error handling
- [ ] Integration tests: Mock API responses
- [ ] E2E tests: Real session (if safe)
- [ ] Performance tests: Response time
- [ ] Concurrency tests: Multiple requests

---

## 13. Research Artifacts

### Raw API Captures

[Paste actual curl commands here]

```bash
# Session validation
curl -X POST https://chat.deepseek.com/api/v0/user/session/validate \
  -H "Cookie: session_id=abc123; device_id=xyz789" \
  -H "Content-Type: application/json" \
  -d '{"timestamp": 1234567890}'

# Send message
curl -X POST https://chat.deepseek.com/api/v0/chat/completions \
  -H "Cookie: session_id=abc123; device_id=xyz789" \
  -H "Accept: text/event-stream" \
  -H "Content-Type: application/json" \
  -d '{...payload...}'
```

### Sample Responses

[Paste actual responses here]

---

## 14. Unknowns & Open Questions

- [ ] Does DeepSeek API support vision models?
- [ ] What's the exact rate limit format for streaming?
- [ ] Does Cloudflare protection apply?
- [ ] Are there webhook endpoints for async responses?
- [ ] What's the max context window in practice?
- [ ] Are there any request signing requirements?
- [ ] What happens after 7-day absolute timeout?

---

## 15. Sign-off

**Research Completed**: [Date]  
**Approved**: [Code Owner]  
**Ready for Implementation**: YES ✅  

**Next Step**: Create Issue #2 (Implementation)

---

## Appendix: Template Reference

This research follows the **Web Wrapper Integration Template** pattern:

1. ✅ API endpoint mapping complete
2. ✅ Authentication flow documented
3. ✅ Request/response formats captured
4. ✅ Error handling identified
5. ✅ Comparison with existing implementations
6. ✅ Critical bugs documented
7. ✅ Ready for implementation phase

See `.sisyphus/templates/WEB_WRAPPER_INTEGRATION_TEMPLATE.md` for detailed phase guidance.
