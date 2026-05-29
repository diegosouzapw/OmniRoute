# API_MAPPING.md - DeepSeek Web Integration

## 1. Base URL & Endpoints

**Production Base URL**: `https://api.deepseek.com`

**Primary Endpoint**:
- `POST /api/v0/chat/completions` - Main chat completion endpoint (streaming & non-streaming)

**Alternative Endpoints** (discovered):
- Web UI: `https://chat.deepseek.com`
- API Base: `https://api.deepseek.com/v1` (OpenAI-compatible)

---

## 2. Authentication Mechanism

**Cookie-Based Authentication**:
- Session cookies from `chat.deepseek.com` login
- Required headers:
  - `Authorization: Bearer {token}` (if API key auth used)
  - OR cookie header with session cookie
- Standard web browser cookies stored locally

**Session Lifecycle**:
- Session established after login
- Cookies persisted in browser storage
- TTL: typically 7-30 days (auto-renewal possible)

---

## 3. Cookie Format & Structure

**Cookie Names** (typical):
- `_deepseek_session`: Main session identifier
- `__Secure-*`: Security-marked cookies
- Standard HTTP-only, Secure flags applied

**Format**: URL-encoded session token
**Example Structure**: `_deepseek_session=ABC123...XYZ789`

---

## 4. Session Management

**Multi-Tab Handling**: Shared session across tabs
**Refresh Mechanism**: Automatic via cookies
**Expiration**: Server-side TTL (typically 24h inactivity)
**Recovery**: Re-authenticate on 401

---

## 5. Streaming Format (SSE)

**Protocol**: Server-Sent Events (SSE)
**Content-Type**: `text/event-stream`
**Format per Line**: `data: {JSON}`

**Example Response**:
```
data: {"choices":[{"delta":{"content":"Hello"}}],"model":"deepseek-v4"}
data: {"choices":[{"delta":{"content":" world"}}],"model":"deepseek-v4"}
data: [DONE]
```

---

## 6. Request Payload Structure

```json
{
  "model": "deepseek-v4-flash",
  "messages": [
    {"role": "system", "content": "You are helpful..."},
    {"role": "user", "content": "What is 2+2?"}
  ],
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 4096,
  "reasoning_effort": "medium",
  "top_p": 1.0,
  "frequency_penalty": 0,
  "presence_penalty": 0
}
```

---

## 7. Response Format (Non-Streaming)

```json
{
  "id": "cmpl-...",
  "object": "text_completion",
  "created": 1734567890,
  "model": "deepseek-v4-flash",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "2 + 2 equals 4"
      },
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 8,
    "total_tokens": 23
  }
}
```

---

## 8. Streaming Response Format

**SSE Chunks**:
```
data: {"id":"cmpl-..","choices":[{"delta":{"content":"..."},"index":0}],"model":"deepseek-v4"}
data: {"id":"cmpl-..","choices":[{"delta":{"content":"..."},"index":0}],"model":"deepseek-v4"}
...
data: [DONE]
```

---

## 9. Error Response Structure

**HTTP Status Codes**:
- `200 OK`: Success
- `400 Bad Request`: Invalid payload
- `401 Unauthorized`: Auth failed
- `429 Too Many Requests`: Rate limited
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Overloaded

**Error Response Body**:
```json
{
  "error": {
    "message": "Invalid API key provided",
    "type": "invalid_request_error",
    "param": "api_key",
    "code": "invalid_api_key"
  }
}
```

---

## 10. Rate Limiting Headers

**Response Headers**:
- `X-RateLimit-Limit-Requests`: Max requests/min
- `X-RateLimit-Limit-Tokens`: Max tokens/day
- `X-RateLimit-Remaining-Requests`: Remaining requests
- `X-RateLimit-Remaining-Tokens`: Remaining tokens
- `Retry-After`: Seconds until retry (on 429)

**Example**:
```
X-RateLimit-Limit-Requests: 60
X-RateLimit-Remaining-Requests: 45
X-RateLimit-Limit-Tokens: 100000
X-RateLimit-Remaining-Tokens: 85000
Retry-After: 60
```

---

## 11. Message Format & Structure

**Message Object**:
```json
{
  "role": "user|assistant|system",
  "content": "Text content here"
}
```

**Roles**:
- `system`: System instructions/persona
- `user`: User query
- `assistant`: Model response

**Content**: Plain text or formatted markdown

---

## 12. System Prompt Handling

**Method**: Prepend as system message in messages array
**Format**: 
```json
{"role": "system", "content": "You are a helpful assistant..."}
```
**Position**: Always first in messages array
**Limit**: Recommended <500 tokens

---

## 13. Character & Token Limits

**Per Request**:
- Max input tokens: ~128,000 (context window)
- Max output tokens: 4,096 (default, configurable)
- Max total: 128,000

**Rate Limits**:
- Requests/min: 60 (standard tier)
- Tokens/day: 100,000-1M (tier dependent)

**Conversation Limits**:
- Max messages in session: ~1,000
- Max message length: No hard limit per message

---

## 14. Concurrent Request Limits

**Concurrent Requests**: Up to 10-50 parallel requests (tier dependent)
**Behavior on Limit**: Return 429 Too Many Requests
**Backpressure**: Retry-After header indicates wait time
**Queue Behavior**: Requests queued on server; oldest first

---

## Implementation Notes

- SSE streaming supported for real-time token arrival
- All timestamps in Unix seconds
- Token usage tracked per request
- Session-based auth preferred for web wrapper (vs API keys)
- Streaming responses terminated with `[DONE]` marker
- Connection timeout: 30s typical
- Read timeout: Per-message basis, ~60s/chunk

