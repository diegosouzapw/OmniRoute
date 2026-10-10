- **fix(security):** four independent security-audit fixes. The DNS-rebinding guard (GHSA-cmhj-wh2f-9cgx) now also covers the provider dispatch path: for operator-supplied
  base URLs (`providerSpecificData.baseUrl`, including `openai-compatible-*` nodes) the connection
  is validated at connect time against the same guard mode as the URL check
  (`dispatchGuarded()` in `open-sse/executors/dispatchPin.ts`), closing the classic TOCTOU window
  on the highest-risk override path; it rides on the ambient patched `fetch` as a dispatcher and is
  skipped whenever an outbound proxy, TLS impersonation or the direct sentinel applies, so
  configured proxies and request logging are never bypassed. The rate limiter no longer fails fully open when Redis errors — it falls
  back to the in-memory limiter instead of allowing every request unconditionally. Boot warns
  loudly in production when `STORAGE_ENCRYPTION_KEY` is missing and keeps serving: an empty key is
  the documented encryption-disabled contract, so production must not exit. Persisted `JWT_SECRET`/`API_KEY_SECRET`
  are encrypted at rest. And the MCP scope-enforcement gap is closed:
  `withScopeEnforcement()` now forces scope checks for any caller resolved from a real HTTP
  `Authorization` header that does not already hold `manage`/`admin` scope, even when
  `OMNIROUTE_MCP_ENFORCE_SCOPES` is off by default — so a key granted only the narrow
  `mcp:connect` bypass scope can no longer invoke arbitrary MCP tools once remote access is
  enabled ([#13330](https://github.com/diegosouzapw/OmniRoute/pull/13330)) — thanks @JJAbrams-eng
