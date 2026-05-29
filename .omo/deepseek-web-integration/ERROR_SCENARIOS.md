# ERROR_SCENARIOS.md - DeepSeek Web Error Handling

## HTTP Status Codes & Responses

### 400 Bad Request

**Trigger**: Malformed JSON, invalid field values, missing required fields

**Response**:
```json
{
  "error": {
    "message": "Invalid request payload",
    "type": "invalid_request_error",
    "param": "messages",
    "code": "invalid_value"
  }
}
```

**Examples**:
```json
// Missing required field
{
  "error": {
    "message": "'model' is required",
    "type": "invalid_request_error",
    "code": "missing_field"
  }
}

// Invalid JSON
{
  "error": {
    "message": "Invalid JSON in request body",
    "type": "parse_error",
    "code": "invalid_json"
  }
}

// Unsupported model
{
  "error": {
    "message": "Model 'invalid-model' does not exist",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}
```

**Recovery Strategy**:
- Validate payload before sending
- Check required fields: `model`, `messages`
- Ensure JSON is valid (use JSON.stringify + JSON.parse for validation)
- Use supported models only

---

### 401 Unauthorized

**Trigger**: Invalid/expired session, missing cookies, authentication failed

**Response**:
```json
{
  "error": {
    "message": "Unauthorized. Please log in.",
    "type": "unauthorized",
    "code": "invalid_session"
  }
}
```

**Examples**:
```json
// Session expired
{
  "error": {
    "message": "Session has expired",
    "type": "unauthorized",
    "code": "session_expired"
  }
}

// Missing authentication
{
  "error": {
    "message": "Missing authentication token",
    "type": "unauthorized",
    "code": "missing_auth"
  }
}

// Invalid API key (if using API auth)
{
  "error": {
    "message": "Invalid API key provided",
    "type": "unauthorized",
    "code": "invalid_api_key"
  }
}
```

**Recovery Strategy**:
- Check if cookies are present and valid
- If expired: re-authenticate (login again)
- Refresh session before expiry
- Store cookies persistently

---

### 429 Too Many Requests

**Trigger**: Rate limit exceeded (requests/min or tokens/day)

**Response Headers**:
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit-Requests: 60
X-RateLimit-Remaining-Requests: 0
X-RateLimit-Limit-Tokens: 100000
X-RateLimit-Remaining-Tokens: 0
Retry-After: 60
```

**Response Body**:
```json
{
  "error": {
    "message": "Rate limit exceeded. Please retry after 60 seconds.",
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded"
  }
}
```

**Examples**:
```json
// Requests limit
{
  "error": {
    "message": "You have exceeded the 60 requests per minute limit",
    "type": "rate_limit_error",
    "code": "requests_limit_exceeded"
  }
}

// Token limit (daily)
{
  "error": {
    "message": "You have exceeded the 100000 tokens per day limit",
    "type": "rate_limit_error",
    "code": "tokens_limit_exceeded"
  }
}
```

**Recovery Strategy**:
- Read `Retry-After` header
- Wait specified seconds before retrying
- Implement exponential backoff: 1s, 2s, 4s, 8s...
- Queue requests locally for batch processing
- Monitor usage with `X-RateLimit-Remaining-*` headers

---

### 500 Internal Server Error

**Trigger**: Server-side error, unexpected exception

**Response**:
```json
{
  "error": {
    "message": "Internal server error",
    "type": "internal_error",
    "code": "internal_server_error"
  }
}
```

**Examples**:
```json
// Database error
{
  "error": {
    "message": "Database connection failed",
    "type": "internal_error",
    "code": "db_error"
  }
}

// Processing error
{
  "error": {
    "message": "Failed to process completion request",
    "type": "internal_error",
    "code": "processing_error"
  }
}
```

**Recovery Strategy**:
- Retry with exponential backoff (1s, 2s, 4s, 8s, 16s)
- Max retries: 3-5
- Log error for debugging
- Inform user: "Temporary service issue, retrying..."

---

### 503 Service Unavailable

**Trigger**: Server overloaded, maintenance, temporarily down

**Response Headers**:
```http
HTTP/1.1 503 Service Unavailable
Retry-After: 120
```

**Response Body**:
```json
{
  "error": {
    "message": "Service temporarily unavailable due to high traffic",
    "type": "service_unavailable",
    "code": "service_overloaded"
  }
}
```

**Recovery Strategy**:
- Read `Retry-After` header (retry after 120s)
- Implement exponential backoff
- Queue request for later retry
- Show user: "Service temporarily unavailable, please try again in a few minutes"

---

## SSE Stream Errors

### Mid-Stream Error (Within SSE)

**Pattern**: Error JSON sent as `data:` line within stream

```
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"error":{"message":"Connection lost","code":"stream_error"}}
```

**Recovery**:
- Detect error in stream parsing
- Close connection gracefully
- Retry from last known checkpoint
- Store partial messages for recovery

### Stream Connection Timeout

**Trigger**: No data received for 30+ seconds

**Error**:
```
TIMEOUT: No data received for 30 seconds
```

**Recovery**:
- Close connection
- Retry request with exponential backoff
- Inform user about timeout

### Incomplete Stream (Premature Termination)

**Pattern**: Stream ends without `[DONE]` marker

**Example**:
```
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"choices":[{"delta":{"content":" world"}}]}
# Connection dropped here - no [DONE]
```

**Recovery**:
- Detect missing `[DONE]`
- Treat as incomplete response
- Retry or use partial response
- Log for debugging

---

## Network & Connection Errors

### Connection Refused

**Cause**: Server not reachable, firewall blocking

**Recovery**:
- Check network connectivity: `ping api.deepseek.com`
- Check firewall rules
- Retry with backoff
- Use proxy if behind corporate firewall

### DNS Resolution Failed

**Cause**: Cannot resolve `api.deepseek.com`

**Recovery**:
- Check DNS: `nslookup api.deepseek.com`
- Try alternative DNS (8.8.8.8, 1.1.1.1)
- Retry later

### SSL/TLS Certificate Error

**Cause**: Certificate validation failed

**Error**:
```
SSL_ERROR_BAD_CERT_DOMAIN
```

**Recovery** (Production: Never Skip):
- Use Node.js with proper CA bundle
- Do NOT use `NODE_TLS_REJECT_UNAUTHORIZED=0` (except dev)
- Update system certificates

---

## Validation Errors

### Invalid Model Parameter

**Request**:
```json
{"model": "invalid-model-name"}
```

**Response**:
```json
{
  "error": {
    "message": "Model 'invalid-model-name' does not exist",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}
```

**Valid Models**:
- `deepseek-v4-flash`
- `deepseek-v4-pro`
- `deepseek-r1`
- `deepseek-v3`

### Invalid Message Format

**Request**:
```json
{"messages": [{"role": "invalid-role", "content": "test"}]}
```

**Response**:
```json
{
  "error": {
    "message": "Invalid role 'invalid-role'. Valid roles: 'user', 'assistant', 'system'",
    "type": "invalid_request_error",
    "code": "invalid_role"
  }
}
```

### Missing Required Field

**Request**:
```json
{"model": "deepseek-v4-flash"}
```

**Response**:
```json
{
  "error": {
    "message": "'messages' field is required",
    "type": "invalid_request_error",
    "code": "missing_field"
  }
}
```

---

## Concurrent Request Handling

### Too Many Concurrent Requests

**Limit**: ~10-50 concurrent per account (tier-dependent)

**Response**:
```json
{
  "error": {
    "message": "Too many concurrent requests. Please retry after a brief delay.",
    "type": "resource_limit_error",
    "code": "concurrency_limit_exceeded"
  }
}
```

**Recovery**:
- Queue requests locally
- Limit concurrent: `Promise.all([...]).then(...)` → max 5-10 parallel
- Implement semaphore pattern

---

## Testing Error Scenarios

### Test 400 Error
```bash
curl -X POST https://api.deepseek.com/api/v0/chat/completions \
  -H "Content-Type: application/json" \
  -d '{}'  # Invalid - missing fields
```

### Test 401 Error
```bash
curl -X POST https://api.deepseek.com/api/v0/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4","messages":[]}' 
  # No auth header
```

### Test 429 Error
```bash
# Make 61+ requests in 60 seconds
for i in {1..65}; do
  curl -X POST https://api.deepseek.com/api/v0/chat/completions ...
done
```

### Test 503 Error
```bash
# Simulate during maintenance window or high traffic
# Expected: 503 with Retry-After header
```

---

## Error Recovery Checklist

- [ ] Validate request payload before sending
- [ ] Handle 401: Re-authenticate
- [ ] Handle 429: Exponential backoff + Retry-After
- [ ] Handle 500: Exponential backoff (1s, 2s, 4s, 8s, 16s)
- [ ] Handle 503: Exponential backoff with Retry-After
- [ ] Parse SSE stream for errors
- [ ] Detect stream timeouts (>30s no data)
- [ ] Detect incomplete streams (no [DONE])
- [ ] Queue requests on rate limit
- [ ] Log all errors with context

