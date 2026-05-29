# AUTH_FLOW.md - DeepSeek Web Authentication

## Session Lifecycle

### 1. Initial Authentication (Login)

**Flow**:
1. User navigates to `https://chat.deepseek.com`
2. Browser redirects to login page if no session
3. User enters credentials (email + password)
4. Server validates credentials
5. Server generates session cookie + stores in browser
6. Browser redirected to dashboard

**Cookies Set**:
```
Set-Cookie: _deepseek_session=XXXXX...; Path=/; HttpOnly; Secure; SameSite=Lax
Set-Cookie: __Secure-deepseek-id=YYYYY...; Path=/; Secure; SameSite=Strict
```

### 2. Session Persistence

**Storage Location**: Browser LocalStorage / SessionStorage
**Format**: HTTP cookies (automatic browser management)
**TTL**: 24h inactivity logout OR 7-30 day absolute TTL

**Verification Header**:
```
Cookie: _deepseek_session=XXXXX...; __Secure-deepseek-id=YYYYY...
```

### 3. Authenticated Requests

**Required Headers**:
```http
POST /api/v0/chat/completions HTTP/1.1
Host: api.deepseek.com
Cookie: _deepseek_session=XXXXX...; __Secure-deepseek-id=YYYYY...
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
```

**Cookie-Based Auth Flow**:
- Browser automatically sends cookies on every request
- Server validates session from cookie
- No explicit token header needed (unlike API key auth)
- Session renewed on activity

### 4. Session Expiration & Refresh

**Inactivity Timeout**: 24 hours
**Absolute Timeout**: 30 days
**Refresh Mechanism**: Automatic cookie renewal on successful request
**Logout**: DELETE cookies or explicit logout endpoint

**Expired Session Response**:
```json
{
  "error": {
    "message": "Session expired. Please log in again.",
    "type": "unauthorized",
    "code": "session_expired"
  }
}
HTTP Status: 401 Unauthorized
```

### 5. Multi-Session Handling

**Multi-Tab Behavior**: Shared session across all tabs
**Same Domain**: All tabs share the same cookie jar
**Concurrent Requests**: Allowed from multiple tabs
**Session Conflict**: Last request wins (no locking)

### 6. UUID/Conversation ID Format

**Conversation ID**:
- Format: UUID v4 (36 chars with hyphens)
- Example: `550e8400-e29b-41d4-a716-446655440000`
- Persistence: Stored in conversation metadata
- Creation: Client generates or server assigns

**Turn ID**:
- Format: Incrementing integer or UUID
- Example: `1`, `2`, `3` OR UUID
- Scope: Per-conversation unique
- Use: For ordering messages in conversation

### 7. Session Storage (Web Wrapper Context)

**For Node.js Wrapper**:
- Cookies stored in-memory or file-based cache
- Cookie jar library (e.g., `tough-cookie`)
- Persistent storage: `.cookies` file or DB

**Example In-Memory Storage**:
```typescript
private cookies: Map<string, string> = new Map();

// Store from Set-Cookie header
private storeCookie(setCookieHeader: string) {
  const [name, value] = setCookieHeader.split('=');
  this.cookies.set(name, value);
}

// Retrieve for requests
private getCookieHeader(): string {
  return Array.from(this.cookies.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
}
```

### 8. Authentication Error Handling

**401 Unauthorized**:
```json
{
  "error": {
    "message": "Invalid or expired session",
    "type": "unauthorized",
    "code": "invalid_session"
  }
}
```
**Action**: Re-authenticate (login again)

**403 Forbidden**:
```json
{
  "error": {
    "message": "Insufficient permissions",
    "type": "forbidden",
    "code": "forbidden"
  }
}
```
**Action**: Check account permissions

### 9. Session Validation Endpoints

**Check Session Status** (if available):
```http
GET /api/v0/auth/status HTTP/1.1
Cookie: _deepseek_session=XXXXX...
```

**Response**:
```json
{
  "authenticated": true,
  "user_id": "user_123",
  "email": "user@example.com",
  "session_expires_at": 1734654321
}
```

### 10. Logout & Session Termination

**Logout Request**:
```http
POST /api/v0/auth/logout HTTP/1.1
Cookie: _deepseek_session=XXXXX...
```

**Server Response**:
```http
HTTP/1.1 200 OK
Set-Cookie: _deepseek_session=; Path=/; Max-Age=0
Set-Cookie: __Secure-deepseek-id=; Path=/; Max-Age=0
```

**Client Action**:
- Clear stored cookies
- Clear authentication state
- Redirect to login page

---

## Implementation Guide for Web Wrapper

### Cookie Storage Pattern

```typescript
class DeepSeekWebClient {
  private cookies: Map<string, string> = new Map();

  async login(email: string, password: string): Promise<void> {
    // Send login request, capture Set-Cookie headers
    const response = await fetch('https://chat.deepseek.com/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies
    });

    // Extract and store cookies from response headers
    const setCookieHeaders = response.headers.getSetCookie?.();
    setCookieHeaders?.forEach(header => this.storeCookie(header));
  }

  async sendRequest(payload: any): Promise<Response> {
    return fetch('https://api.deepseek.com/api/v0/chat/completions', {
      method: 'POST',
      headers: {
        'Cookie': this.getCookieHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
  }

  private storeCookie(setCookieHeader: string): void {
    // Parse Set-Cookie format: name=value; Path=/; HttpOnly; Secure
    const cookieParts = setCookieHeader.split(';')[0];
    const [name, value] = cookieParts.split('=');
    this.cookies.set(name.trim(), value.trim());
  }

  private getCookieHeader(): string {
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }
}
```

### Refresh Token Strategy

```typescript
async ensureValidSession(): Promise<void> {
  // Check if session is about to expire
  const timeUntilExpiry = this.getSessionExpiryTime() - Date.now();
  
  if (timeUntilExpiry < 5 * 60 * 1000) { // < 5 min
    // Refresh by making a request to bump TTL
    await this.sendRequest({ /* minimal request */ });
  }
}
```

---

## Session Security Considerations

1. **HttpOnly Cookies**: Cannot be accessed by JavaScript (prevents XSS theft)
2. **Secure Flag**: Only transmitted over HTTPS
3. **SameSite=Lax**: CSRF protection
4. **No Session Fixation**: Server regenerates session ID on login
5. **Rate Limiting**: Protects against brute-force login attempts

