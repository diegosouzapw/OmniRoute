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
class ([GHSA-fhh6-4qxv-rpqj](https://github.com/advisories/GHSA-fhh6-4qxv-rpqj)).

**What GHSA-fhh6-4qxv-rpqj is (the attack class):** a management/agent server
exposes an endpoint that launches a subprocess (`npm install`, `node`, a browser,
a proxy, `git`, `tar`, …). If that endpoint is reachable from off-host — because
the operator put OmniRoute behind an nginx/Cloudflare/Tailscale tunnel and a JWT
leaked, or auth was misconfigured — the attacker turns "call an API" into "run a
command on the host" (remote code execution). OmniRoute closes this by enforcing a
**loopback host check unconditionally, before any auth check**, on every
spawn-capable route: a leaked token over a tunnel still can't reach the spawn.

**The full LOCAL_ONLY set.** The authoritative source is
`LOCAL_ONLY_API_PREFIXES` / `LOCAL_ONLY_API_PATTERNS` in
`src/server/authz/routeGuard.ts`; the table below mirrors the current state. The
`check-route-guard-membership` gate enumerates every `route.ts` under the
spawn-capable prefixes and fails CI if any is not classified local-only.

| Prefix / pattern                    | Why it's local-only                                                                      | Manage-scope bypassable?      |
| ----------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------- |
| `/api/mcp/`                         | MCP server — spawns stdio bridges + SSE handlers                                         | **Yes** (only one)            |
| `/api/cli-tools/runtime/`           | CLI tool runtime — executes arbitrary plugin code                                        | No — spawn-capable            |
| `/api/services/`                    | Embedded services (9router/CLIProxy) — `npm install` + spawn                             | No — spawn-capable            |
| `/dashboard/providers/services/`    | Reverse proxy to embedded-service UIs                                                    | No                            |
| `/api/copilot/`                     | Unauthenticated LLM driver — CLI-only by default                                         | Operator opt-in: manage/admin |
| `/api/tools/agent-bridge/`          | AgentBridge — spawns MITM server + DNS edits                                             | No — spawn-capable            |
| `/api/tools/traffic-inspector/`     | Traffic Inspector — http-proxy listener + system proxy                                   | No — spawn-capable            |
| `/api/plugins/`, `/api/plugins`     | Plugins — load/execute via `worker_threads` + `child_process`                            | No — spawn-capable            |
| `/api/system/version`               | Auto-update (POST only; GET/HEAD/OPTIONS exempt) — spawns `git checkout` + `npm install` | No                            |
| `/api/db-backups/exportAll`         | Spawns `tar` for the export archive                                                      | No                            |
| `/api/local/`                       | 1-click local launchers (Redis today) — spawns podman/docker                             | No — spawn-capable            |
| `/api/headroom/start`, `/stop`      | Headroom proxy lifecycle — spawns python CLI / signals PID                               | No — spawn-capable            |
| `/api/oauth/cursor/auto-import`     | `execFile("which", ["cursor"])` before importing creds                                   | No                            |
| `/api/providers/{id}/login` (regex) | Launches a headful Playwright Chromium for web-cookie login                              | No                            |

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

#### Operator guidance & auditing

If you run OmniRoute behind a reverse proxy or tunnel (nginx, Caddy, Cloudflare
Tunnel, Tailscale, Ngrok), the loopback check still protects the spawn-capable
routes above — a request whose client address is non-loopback is rejected with
`403 LOCAL_ONLY` **before auth runs**, so a leaked JWT can't reach a spawn. Two
operator responsibilities remain:

- **Do not "fix" a 403 by forging the client IP as loopback.** Setting
  `X-Forwarded-For: 127.0.0.1`, or a proxy that rewrites the source address to
  loopback, re-opens exactly the RCE class this tier closes. Expose the
  dashboard/API through the proxy — never the spawn-capable routes.
- **Keep the manage-scope bypass minimal.** Only `/api/mcp/` is bypassable, and
  only with a `manage`-scoped API key. The `SPAWN_CAPABLE_PREFIXES` can never be
  added to the bypass list — the zod schema rejects them and
  `isLocalOnlyBypassableByManageScope` denies them at runtime (defence-in-depth),
  which is what the dashboard means by "cannot be made bypassable".

**Auditing access** — to verify nothing off-host is reaching these routes:

- Open the **Authorization Inventory** on `/dashboard/settings/security`: it renders the
  live LOCAL_ONLY prefix list, which prefixes are bypassable, and the compile-time
  spawn-capable ("cannot be made bypassable") set.
- Grep your reverse-proxy / access logs for the prefixes above paired with a
  non-loopback client address. Any such hit that returned `200` instead of
  `403 LOCAL_ONLY` means the proxy is masking the real client IP — fix the proxy.
- A `403 LOCAL_ONLY` in OmniRoute's logs for one of these paths is the guard
  working as intended, not an error to suppress.

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

- `docs/security/CLI_TOKEN.md` — CLI machine-ID token
- `docs/architecture/AUTHZ_GUIDE.md` — full authorization pipeline
- `docs/frameworks/MCP-SERVER.md` — MCP server transports and scopes
