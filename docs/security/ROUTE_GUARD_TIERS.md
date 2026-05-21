# Route Guard Tiers

## Overview

All OmniRoute management API routes are classified into one of three protection
tiers. Classification is static, defined in `src/server/authz/routeGuard.ts`,
and evaluated unconditionally on every request before any auth logic runs.

## Tiers

### Tier 1 — LOCAL_ONLY

**Enforced by:** `isLocalOnlyPath(path)` → loopback host check  
**Bypass:** None — not overridable by JWT, CLI token, or `requireLogin=false`

These routes spawn child processes or execute runtime code. Exposing them to
non-loopback traffic would allow an attacker who obtained a valid JWT (e.g.,
via a Cloudflared/Ngrok tunnel) to trigger process spawning — a known CVE
class (GHSA-fhh6-4qxv-rpqj).

| Prefix                    | Reason                                             |
| ------------------------- | -------------------------------------------------- |
| `/api/mcp/`               | MCP server — spawns stdio bridges and SSE handlers |
| `/api/cli-tools/runtime/` | CLI tool runtime — executes plugin code            |

**Response on violation:** `403 LOCAL_ONLY`

### Tier 2 — ALWAYS_PROTECTED

**Enforced by:** `isAlwaysProtectedPath(path)` → skip `requireLogin=false` bypass  
**Bypass:** None when `requireLogin=false`; JWT always required

These routes are destructive or irreversible. Allowing them in a "no-password"
install would mean anyone on the same LAN could wipe the database or kill the
server process.

| Path                     | Reason                            |
| ------------------------ | --------------------------------- |
| `/api/shutdown`          | Terminates the server process     |
| `/api/settings/database` | Database export, import, and wipe |

**Response on violation:** `401 Authentication required`

### Tier 3 — MANAGEMENT (default)

All other management routes. Auth required unless `requireLogin=false` is
configured. CLI tokens can authenticate these routes (loopback + valid HMAC).

## Evaluation order

```
managementPolicy.evaluate(ctx)
  1. isLocalOnlyPath(path)?
     → not loopback → reject 403 LOCAL_ONLY
  2. isInternalModelSyncRequest(ctx)?
     → allow (system)
  3. hasValidCliToken(headers)?
     → allow (cli) [loopback + timingSafeEqual HMAC check]
  4. isAlwaysProtectedPath(path) or requireLogin=true?
     → isDashboardSessionAuthenticated?
        → allow (dashboard_session)
     → reject 401/403
  5. requireLogin=false?
     → allow (anonymous)
```

## Adding a new spawn-capable route

1. Add the path prefix to `LOCAL_ONLY_API_PREFIXES` in
   `src/server/authz/routeGuard.ts`
2. Add a test in `tests/unit/authz/routeGuard.test.ts` asserting that
   `isLocalOnlyPath()` returns true for the new prefix
3. **Never skip this step** — see Hard Rule #15 in `CLAUDE.md`

## Files

| File                                      | Purpose                        |
| ----------------------------------------- | ------------------------------ |
| `src/server/authz/routeGuard.ts`          | Constants and helper functions |
| `src/server/authz/policies/management.ts` | Evaluation logic               |
| `tests/unit/authz/routeGuard.test.ts`     | Unit tests                     |

## See also

- `docs/security/CLI_TOKEN.md` — CLI machine-ID token
- `docs/architecture/AUTHZ_GUIDE.md` — full authorization pipeline
