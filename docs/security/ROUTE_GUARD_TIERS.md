---
title: "Route Guard Tiers"
---

# Route Guard Tiers

## Overview

All OmniRoute management API routes are classified into one of three protection
tiers. Classification is static, defined in `src/server/authz/routeGuard.ts`,
and evaluated before any other auth branch runs.

## Tiers

### Tier 1 — LOCAL_ONLY

**Enforced by:** `isLocalOnlyPath(path)` → loopback host check
**Bypass:** None by default. Narrow carve-out for paths in
`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` when the request carries a valid
API key with the `manage` scope (see [Manage-scope carve-out](#manage-scope-carve-out)).

These routes spawn child processes or execute runtime code. Exposing them to
non-loopback traffic would allow an attacker who obtained a valid JWT (e.g.,
via a Cloudflared/Ngrok tunnel) to trigger process spawning — a known CVE
class (GHSA-fhh6-4qxv-rpqj).

| Prefix                    | Reason                                                    | Bypassable by `manage`? |
| ------------------------- | --------------------------------------------------------- | ----------------------- |
| `/api/mcp/`               | MCP server — spawns stdio bridges and SSE handlers        | Yes                     |
| `/api/cli-tools/runtime/` | CLI tool runtime — executes arbitrary plugin code         | No (strict-loopback)    |
| `/api/services/`          | Embedded services (9router, CLIProxy) — npm install+spawn | No (strict-loopback)    |

**Response on violation:** `403 LOCAL_ONLY`

#### Manage-scope carve-out

A subset of LOCAL_ONLY paths MAY also be accessed from non-loopback if and
only if the request carries an `Authorization: Bearer <api-key>` whose
metadata includes the `manage` scope (or `admin`). The carve-out is gated
explicitly per-path via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` so the
default for any new LOCAL_ONLY path remains strict-loopback. Unauthenticated
requests and requests with non-manage keys are still rejected with
`403 LOCAL_ONLY`.

Today the only bypassable prefix is `/api/mcp/`. `/api/cli-tools/runtime/` and
`/api/services/` are intentionally excluded because they can spawn arbitrary
subprocesses (`npm install`, `node`), which is the exact CVE class the
LOCAL_ONLY tier exists to prevent.

| Request                                     | Path                       | Result              |
| ------------------------------------------- | -------------------------- | ------------------- |
| Non-loopback, no Bearer                     | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer with `manage` scope    | `/api/mcp/*`               | Allow               |
| Non-loopback, Bearer without `manage` scope | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer with `manage` scope    | `/api/cli-tools/runtime/*` | 403 LOCAL_ONLY      |
| Loopback, any/no Bearer                     | any LOCAL_ONLY             | Allow (gate passes) |

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
     → loopback                                  → fall through
     → non-loopback, manage-scope Bearer
        AND isLocalOnlyBypassableByManageScope   → allow (management_key)
     → otherwise                                  → reject 403 LOCAL_ONLY
  2. isInternalModelSyncRequest(ctx)?
     → allow (system)
  3. hasValidCliToken(headers)?
     → allow (cli) [loopback + timingSafeEqual HMAC check]
  4. isAlwaysProtectedPath(path) or requireLogin=true?
     → isDashboardSessionAuthenticated?
        → allow (dashboard_session)
     → manage-scope Bearer on a non-bypassable path?
        → allow (management_key)
     → reject 401/403
  5. requireLogin=false?
     → allow (anonymous)
```

Step 1's manage-scope branch is the only authenticated path that can satisfy a
LOCAL_ONLY route; the auth-backend failure mode returns 503 (not 403) so an
expired DB doesn't silently downgrade to "deny".

## Adding a new spawn-capable route

1. Add the path prefix to `LOCAL_ONLY_API_PREFIXES` in
   `src/server/authz/routeGuard.ts`
2. Add a test in `tests/unit/authz/routeGuard.test.ts` asserting that
   `isLocalOnlyPath()` returns true for the new prefix
3. **Never skip this step** — see Hard Rule #15 in `CLAUDE.md`
4. Decide: does this route ALSO belong in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`?
   Default answer is **no**. Only opt-in when the route is safe to expose to a
   manage-scope holder (i.e. does NOT spawn arbitrary user-controlled code).

## Adding a manage-scope-bypassable path

1. Confirm the route does not execute user-supplied code or commands. If it
   does, stop — this carve-out is the wrong tool.
2. Append the prefix to `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in
   `src/server/authz/routeGuard.ts`
3. Add coverage in `tests/unit/authz/management-policy.test.ts` for all four
   request shapes: no Bearer (403), manage Bearer (allow), non-manage Bearer
   (403), and the per-prefix regression that `/api/cli-tools/runtime/*` stays
   strict-loopback even with a manage Bearer.

## Files

| File                                         | Purpose                        |
| -------------------------------------------- | ------------------------------ |
| `src/server/authz/routeGuard.ts`             | Constants and helper functions |
| `src/server/authz/policies/management.ts`    | Evaluation logic               |
| `tests/unit/authz/routeGuard.test.ts`        | Unit tests for tier helpers    |
| `tests/unit/authz/management-policy.test.ts` | Unit tests for evaluate()      |

## Documenting Security Tiers in OpenAPI

When adding a new route to `docs/openapi.yaml`, apply the corresponding
vendor extension if the route is classified by `routeGuard.ts`:

| routeGuard.ts classification  | YAML annotation            | Enforcement                                     |
| ----------------------------- | -------------------------- | ----------------------------------------------- |
| `LOCAL_ONLY_API_PREFIXES`     | `x-loopback-only: true`    | Blocked from non-loopback unconditionally       |
| `ALWAYS_PROTECTED_API_PATHS`  | `x-always-protected: true` | Auth required even with `requireLogin=false`    |
| Internal admin/debug route    | `x-internal: true`         | Hidden from /dashboard/api-endpoints by default |
| None (public / standard auth) | (no annotation needed)     | Standard `requireLogin`-controlled access       |

### Validation

Two scripts enforce consistency between YAML annotations and `routeGuard.ts`:

- `scripts/check/check-openapi-coverage.mjs` — fails if coverage < 99%
- `scripts/check/check-openapi-security-tiers.mjs` — fails if `x-loopback-only` or
  `x-always-protected` annotations diverge from the compile-time constants

Both scripts run in the pre-commit hook and in CI.

### False Positive Rule

If `x-always-protected` or `x-loopback-only` is annotated on a route that is NOT in
the `routeGuard.ts` constant, the coverage script fails. The fix is always to align the
YAML to what `routeGuard.ts` actually enforces — not to add routes to `routeGuard.ts`
without also implementing the enforcement logic.

---

## See also

- `docs/security/CORS.md` — browser-origin allowlist (a separate, complementary control)
- `docs/security/CLI_TOKEN.md` — CLI machine-ID token
- `docs/architecture/AUTHZ_GUIDE.md` — full authorization pipeline
- `docs/frameworks/MCP-SERVER.md` — MCP server transports and scopes
