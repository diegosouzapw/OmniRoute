## Claude Web TLS Fix (2026-05-15)

### Root Cause
`verifyCookieValidity` and `getOrganizationId` used plain `fetch()` which doesn't spoof TLS fingerprints. Claude's Cloudflare rejects non-browser TLS handshakes with 404/challenge pages.

### Fix
- Replaced `fetch()` with `tlsFetchClaude()` in both functions
- Changed `verifyCookieValidity` to hit `/api/organizations` instead of `/api/auth/session`
- `getOrganizationId` uses `JSON.parse(response.text ?? "[]")` instead of `response.json()`
- Removed unused `CLAUDE_WEB_SESSION_URL` constant

### Key Finding
- `/api/auth/session` returns 404 (API-level, not Cloudflare)  
- `/api/organizations` returns 200 with valid cookie
- TlsFetchResult has `.text` (string|null), not `.json()` method
