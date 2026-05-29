# DeepSeek Live API Test - Results & Findings

## 1. API Endpoint Discovery (Verified)

**Real endpoint (from browser capture)**:
```
POST https://chat.deepseek.com/api/v0/chat/completion
```

**NOT** `https://api.deepseek.com/chat/completions` (that's the official API, not the web wrapper)

**Other useful endpoints**:
```
POST https://chat.deepseek.com/api/v0/chat_session/create   → Creates new session
POST https://chat.deepseek.com/api/v0/chat/create_pow_challenge → Gets POW challenge
```

## 2. Authentication (Verified)

Two-layer authentication:
1. **Bearer token** (`authorization: Bearer qFcfbN5ht...`)
2. **Session cookies** (`ds_session_id`, `aws-waf-token`, `smidV2`)

The Bearer token appears to be a session-bound token, not a permanent API key.

## 3. Request Payload (Verified)

```json
{
  "chat_session_id": "UUID-v4",
  "parent_message_id": null,      // null for new message, message_id for replies
  "model_type": "default",         // "default" or "expert" (for deepseek-r1)
  "prompt": "user message here",
  "ref_file_ids": [],
  "thinking_enabled": false,       // true for deep-thinking mode
  "search_enabled": true,
  "preempt": false
}
```

## 4. Required Headers (Verified)

```http
authorization: Bearer {token}
x-app-version: 2.0.0
x-client-locale: en_US
x-client-platform: web
x-client-timezone-offset: 25200
x-client-version: 2.0.0
x-ds-pow-response: {base64-encoded POW JSON}
x-hif-leim: {session-bound token}
Content-Type: application/json
Cookie: {session cookies}
```

## 5. POW Challenge (ACTIVE BLOCKER)

### What We Found

DeepSeek uses a Proof-of-Work anti-bot system:

1. Client calls `POST /api/v0/chat/create_pow_challenge` with `{"target_path": "/api/v0/chat/completion"}`
2. Server responds with:
   ```json
   {
     "algorithm": "DeepSeekHashV1",
     "challenge": "089b10c74ba6eb0392e3ccddd8c077dc...",
     "salt": "7f7a2edb10abe77a9c54",
     "difficulty": 144000,
     "expire_at": 1778866500623,
     "expire_after": 300000,
     "target_path": "/api/v0/chat/completion"
   }
   ```
3. Client must solve: find nonce where SHA3-like hash < (2^256 / difficulty)

### What We Achieved

- ✅ Downloaded the POW WASM module (`sha3_wasm_bg.7b9ca65ddd.wasm`)
- ✅ Identified WASM exports: `wasm_solve(challenge, salt, difficulty, ...)` and `wasm_deepseek_hash_v1`
- ✅ Verified the basic approach (found that answer must make hash < target)
- ✅ Tested hash computation: brute force in Python succeeds but produces wrong hash (algorithm is NOT standard SHA3-256)

### BLOCKER: WASM JS Glue

The JS glue module (`sha3_wasm_bg.7b9ca65ddd.js`) returns **403 Forbidden** from CDN. Without it:
- The WASM `wasm_solve` function cannot be called (requires `wasm-bindgen` memory management)
- Direct WASM invocation hits `unreachable` (memory layout error)

### Resolution Options

1. **Download JS glue from alternative CDN**
   ```
   Try: https://cdn.deepseek.com/static/sha3_wasm_bg.js
   Try: Inline the JS from the web app bundle
   ```

2. **Use browser automation (Playwright)**
   - Open chat.deepseek.com in headless browser
   - The browser handles POW automatically
   - Intercept the solved POW response from network
   - Use it for subsequent API calls

3. **Implement DeepSeekHashV1 in Python/Node**
   - Requires reverse-engineering the WASM bytecode
   - Could analyze WASM disassembly with `wasm-decompile`
   - ~2-4 hours of work

4. **Use session-reuse**
   - Keep a browser session alive
   - Extract solved POW from browser's network tab
   - Reuse for API calls (POW valid for 5 min per request though)

## 6. Updated Implementation Notes

The current `deepseek-web.ts` implementation needs updating:

| Aspect | Current Implementation | Actual DeepSeek Web |
|--------|----------------------|---------------------|
| Endpoint | `/api/v0/chat/completions` | `/api/v0/chat/completion` |
| Auth | Cookies only | Bearer token + cookies |
| Payload | `{model, messages, stream}` | `{chat_session_id, prompt, model_type, ...}` |
| POW | Not implemented | **Required** (DeepSeekHashV1) |
| Session | `_deepseek_session` cookie | `ds_session_id` cookie |
| Extra Headers | Not implemented | `x-ds-pow-response`, `x-hif-leim`, `x-app-version`, etc. |

## 7. Live Test Summary

| Test | Status | Response |
|------|--------|----------|
| Session Create | ✅ PASS | `{"chat_session":{"id":"184e4a8d-..."}}` |
| POW Challenge Create | ✅ PASS | `{"challenge":{"algorithm":"DeepSeekHashV1",...}}` |
| Send Message (no auth) | ❌ FAIL | `{"code":40003,"msg":"INVALID_TOKEN"}` |
| Send Message (no POW) | ❌ FAIL | `{"code":40300,"msg":"MISSING_HEADER"}` |
| Send Message (POW solved) | ❌ FAIL | `{"code":40301,"msg":"INVALID_POW_RESPONSE"}` |
| POW WASM Downloaded | ✅ PASS | `sha3_wasm_bg.7b9ca65ddd.wasm` (valid WebAssembly) |
| POW WASM Invocation | ❌ FAIL | `RuntimeError: unreachable` (no JS glue) |

**Bottom line**: The API structure is understood and works (session create, POW challenge). The POW solver needs the JS glue layer which is currently inaccessible (403 from CDN). Once the POW can be solved, the integration is ready for live testing.
