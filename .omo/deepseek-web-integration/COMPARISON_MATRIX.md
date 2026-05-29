# COMPARISON_MATRIX.md - DeepSeek vs Claude vs ChatGPT Web APIs

## Comparison Overview

| Dimension | DeepSeek | Claude.ai | ChatGPT |
|-----------|----------|-----------|---------|
| **Base URL** | `api.deepseek.com` | `claude.ai` | `chat.openai.com` |
| **Streaming** | SSE | SSE | SSE |
| **Auth Method** | Cookie-based | Cookie-based | Cookie-based |
| **Session TTL** | 24h-30d | ~7d | ~24h |
| **Rate Limit** | 60 req/min, 100K tokens/day | 40 conv/day | Unknown (strict) |
| **Concurrent Limit** | 10-50 req | 1-2 concurrent | 1 concurrent |
| **Error Handling** | JSON errors + SSE errors | JSON errors | JSON errors |
| **Model Selection** | Parameter: `model` | Auto-selected | Auto-selected |
| **Conversation Model** | UUID per conversation | UUID per conversation | UUID per conversation |

---

## API Endpoint Comparison

### DeepSeek
```
POST /api/v0/chat/completions
Headers: Cookie, Content-Type
Body: {"model": "deepseek-v4-flash", "messages": [...], "stream": true}
```

### Claude.ai
```
POST /api/organizations/{org_id}/chat_conversations/{conv_id}/completion
Headers: Cookie, anthropic-device-id, anthropic-client-platform: web_claude_ai
Body: {"prompt": "...", "attachments": [...], "organization_id": "..."}
```

### ChatGPT
```
POST /backend-api/conversation
Headers: Cookie, authorization
Body: {"action": "next", "messages": [...], "model": "text-davinci-004-code"}
```

---

## Authentication Mechanisms

### DeepSeek
- **Method**: Browser cookies (`_deepseek_session`, `__Secure-deepseek-id`)
- **Persistence**: File-based or in-memory cookie jar
- **Refresh**: Automatic via activity
- **Expiry**: 24-30 days inactivity
- **Challenge**: Sessions may rotate or refresh unpredictably

### Claude.ai
- **Method**: Browser cookies (`sessionKey`) + Device ID (UUID)
- **Persistence**: File-based or in-memory
- **Refresh**: Requires periodictouches (requests)
- **Expiry**: ~7 days absolute
- **Challenge**: Cloudflare cf_clearance cookie required

### ChatGPT
- **Method**: Browser cookies + Bearer token in header
- **Persistence**: File-based
- **Refresh**: Via `/auth/session` endpoint
- **Expiry**: Varies (1-30 days)
- **Challenge**: Token rotation, Cloudflare protection, strictest rate limiting

---

## Streaming Format Comparison

### DeepSeek
```
data: {"choices":[{"delta":{"content":"Hello"}}],"model":"deepseek-v4"}
data: {"choices":[{"delta":{"content":" world"}}],"model":"deepseek-v4"}
data: [DONE]
```
- **Protocol**: SSE (text/event-stream)
- **Format**: `data: {JSON}`
- **End Marker**: `data: [DONE]`

### Claude.ai
```
event: message_delta
data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"Hello"}}

event: message_stop
data: {"type":"message_delta_stop"}
```
- **Protocol**: SSE with named events
- **Format**: `event: {name}` + `data: {JSON}`
- **End Marker**: `event: message_stop`

### ChatGPT
```
data: {"message":{"content":[{"content_type":"text","parts":["Hello"]}]}}
data: [DONE]
```
- **Protocol**: SSE
- **Format**: `data: {JSON}` (full message state each time)
- **End Marker**: `data: [DONE]`

---

## Error Handling Patterns

### DeepSeek
**HTTP Errors**:
- 400: Invalid request
- 401: Unauthorized
- 429: Rate limited
- 500: Server error
- 503: Service unavailable

**SSE Errors**: JSON error objects within stream

**Recovery**: Exponential backoff, retry with limits

### Claude.ai
**HTTP Errors**:
- 400: Invalid request
- 401: Session expired
- 429: Rate limited
- 500: Server error

**SSE Errors**: Error events (e.g., `event: error`)

**Recovery**: Longer backoff times (Claude is stricter)

### ChatGPT
**HTTP Errors**:
- 401: Unauthorized
- 429: Rate limited (very strict)
- 500: Server error

**SSE Errors**: JSON objects with `error` field

**Recovery**: Very long backoffs required (1min+)

---

## Session Management Comparison

### DeepSeek
- **Multi-Tab**: Shared session
- **Concurrent Requests**: 10-50 allowed
- **Conversation Limit**: Many per session
- **Session Refresh**: Automatic on activity
- **Logout**: Explicit endpoint or cookie delete

### Claude.ai
- **Multi-Tab**: Shared session
- **Concurrent Requests**: 1-2 allowed (strict)
- **Conversation Limit**: ~40 per day (usage-based)
- **Session Refresh**: Periodic touches required
- **Logout**: Via API endpoint

### ChatGPT
- **Multi-Tab**: Shared session
- **Concurrent Requests**: 1 only (strictest)
- **Conversation Limit**: Unlimited per day (rate limited)
- **Session Refresh**: Via /auth/session endpoint
- **Logout**: Via logout endpoint

---

## Message & Conversation Format

### DeepSeek
```json
{
  "role": "user|assistant|system",
  "content": "Text content"
}
```
- Simple text messages
- No attachment support
- No image support (in web wrapper)
- System prompt as role: "system"

### Claude.ai
```json
{
  "type": "text",
  "text": "Message content",
  "attachments": [
    {"id": "file-123", "name": "document.pdf"}
  ]
}
```
- Complex objects
- Attachment support
- Image/file support
- Organization ID required

### ChatGPT
```json
{
  "id": "msg-123",
  "author": {"role": "user|assistant"},
  "content": [
    {"content_type": "text", "parts": ["Hello"]}
  ]
}
```
- Nested content blocks
- Multiple content types
- Complex metadata
- Model parameter required

---

## Rate Limiting Comparison

### DeepSeek
- **Requests/Min**: 60
- **Tokens/Day**: 100,000-1M (tier-dependent)
- **Concurrent**: 10-50
- **Headers**: X-RateLimit-Limit-Requests, X-RateLimit-Remaining-Requests, Retry-After
- **Behavior**: 429 with Retry-After

### Claude.ai
- **Requests/Min**: ~40
- **Conversations/Day**: ~40
- **Concurrent**: 1-2
- **Headers**: Not standard
- **Behavior**: 429 with very long backoff

### ChatGPT
- **Requests/Min**: Unknown (very strict)
- **Daily Limit**: Message count + model tier
- **Concurrent**: 1 only
- **Headers**: Not standard
- **Behavior**: 429 with long backoff (1min+)

---

## Model & Parameter Comparison

### DeepSeek
**Models**: deepseek-v4-flash, deepseek-v4-pro, deepseek-r1, deepseek-v3
**Parameters**:
- `model` (required)
- `messages` (required)
- `stream` (optional, default: false)
- `temperature` (0-2, default: 1)
- `max_tokens` (optional)
- `reasoning_effort` (low, medium, high)
- `top_p` (0-1, default: 1)

### Claude.ai
**Models**: Auto-selected by Claude.ai (no parameter)
**Parameters**:
- `prompt` (required)
- `model` (hidden, auto-selected)
- `attachments` (optional)
- `temperature` (0-1, default: 1)
- `system` (system prompt, optional)

### ChatGPT
**Models**: text-davinci-004-code (hidden from web UI)
**Parameters**:
- `model` (hidden, auto-selected)
- `messages` (required)
- `temperature` (0-2, default: 1)
- `max_tokens` (optional)
- `top_p` (0-1, default: 1)

---

## Implementation Difficulty Ranking

### Easiest to Hardest

1. **DeepSeek** ⭐⭐ (Easiest)
   - Clear API structure
   - Standard SSE format
   - Reasonable rate limits
   - Good concurrency support

2. **Claude.ai** ⭐⭐⭐ (Medium)
   - Strict concurrency (1-2)
   - Cloudflare protection
   - Complex attachment handling
   - Session rotation

3. **ChatGPT** ⭐⭐⭐⭐⭐ (Hardest)
   - Strictest rate limiting (1 concurrent)
   - Token rotation required
   - No official API exposed
   - Cloudflare + additional protections
   - Very long backoffs needed

---

## Unique Challenges by Provider

### DeepSeek
- Session cookie format changes
- Reasoning effort parameter (new)
- Token usage tracking

### Claude.ai
- Cloudflare cf_clearance cookie required
- Device ID must persist
- Conversation limit enforcement
- Attachment upload handling

### ChatGPT
- Strictest concurrency (1 only)
- Longest rate limit backoffs
- Token expiration & refresh
- Most aggressive bot detection
- No streaming response for initial request

---

## Recommended Web Wrapper Approach

### For DeepSeek
1. Use cookie jar (tough-cookie)
2. Parse SSE stream line-by-line
3. Implement backoff for 429/500
4. Queue concurrent requests (limit to 5-10)
5. Refresh session every 24h

### For Claude.ai
1. Use cookie jar + device ID persistence
2. Handle Cloudflare challenge
3. Limit to 1-2 concurrent requests
4. Parse named SSE events
5. Handle attachment uploads

### For ChatGPT
1. Strict 1 concurrent request limit
2. Implement 1-5min backoff for 429
3. Parse SSE with full message state
4. Refresh token regularly
5. Expect bot detection responses

---

## Shared Patterns Across All Three

✅ All use SSE for streaming  
✅ All use cookie-based authentication  
✅ All have session TTL (1-30 days)  
✅ All support `messages` array format  
✅ All have rate limiting  
✅ All require User-Agent header  
✅ All use 401 for auth failure  

❌ All have different concurrent limits  
❌ All have different rate limits  
❌ All have different streaming formats  
❌ All have different error recovery strategies  

