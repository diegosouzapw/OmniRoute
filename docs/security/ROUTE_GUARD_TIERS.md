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

| Prefix / pattern                                                                                         | Why it's local-only                                                                      |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `/api/mcp/`                                                                                              | MCP server — spawns stdio bridges + SSE handlers                                         |
| `/api/cli-tools/runtime/`                                                                                | CLI tool runtime — executes arbitrary plugin code                                        |
| `/api/cli-tools/{omp,letta,grok-build,forge,jcode,qwen}-settings`                                        | Per-tool settings writers that can touch tool binaries/config on the host                |
| `/api/cli-tools/{claude,cline,codewhale,codex,crush,deepseek-tui,droid,kilo,openclaw,pi,smelt}-settings` | Same `getCliRuntimeStatus()` spawn as the six siblings above (GHSA-35fw-cv32-2373)       |
| `/api/cli-tools/{all-statuses,status,detect}`                                                            | CLI inventory probes — spawn `command -v` / `--version` per tool (GHSA-35fw-cv32-2373)   |
| `/api/cli-tools/antigravity-mitm`                                                                        | Antigravity MITM proxy control (spawns/points system proxy)                              |
| `/api/modality-bridge/video/`                                                                            | Strict trusted-loopback Video Bridge runtime probe and internal extraction bridge        |
| `/api/services/`                                                                                         | Embedded services (9Router / CLIProxy / Bifrost / Mux / Dario) — `npm install` + spawn   |
| `/dashboard/providers/services/`                                                                         | Reverse proxy to embedded-service UIs                                                    |
| `/api/tunnels/cloudflared`                                                                               | Installs/spawns the cloudflared binary                                                   |
| `/api/tunnels/tailscale/{install,enable,disable,login,start-daemon}`                                     | Installs/controls tailscaled on the host                                                 |
| `/api/copilot/`                                                                                          | Unauthenticated LLM driver — CLI-only by default                                         |
| `/api/tools/agent-bridge/`                                                                               | AgentBridge — spawns MITM server + DNS edits                                             |
| `/api/tools/traffic-inspector/`                                                                          | Traffic Inspector — http-proxy listener + system proxy                                   |
| `/api/settings/mitm`                                                                                     | Enables MITM interception (system-level proxy state)                                     |
| `/api/issue-agent/`                                                                                      | Issue agent — spawns local tooling against the repo                                      |
| `/api/plugins/`, `/api/plugins`                                                                          | Plugins — load/execute via `worker_threads` + `child_process`                            |
| `/api/middleware/`                                                                                       | User middleware — loads/executes operator code in-process                                |
| `/api/system/version`                                                                                    | Auto-update (POST only; GET/HEAD/OPTIONS exempt) — spawns `git checkout` + `npm install` |
| `/api/db-backups/exportAll`                                                                              | Spawns `tar` for the export archive                                                      |
| `/api/local/`                                                                                            | 1-click local launchers (Redis today) — spawns podman/docker                             |
| `/api/headroom/start`, `/api/headroom/stop`                                                              | Headroom proxy lifecycle — spawns python CLI / signals PID                               |
| `/api/jobs`, `/api/jobs/`                                                                                | Job runner control — executes scheduled host-side work                                   |
| `/api/oauth/cursor/auto-import`                                                                          | `execFile("which", ["cursor"])` before importing creds                                   |
| `/api/oauth/kiro/auto-import`                                                                            | Reads Kiro CLI credential files from the host                                            |
| `/api/skills/collect/`                                                                                   | Skill collection — detects/installs local tooling                                        |
| `/api/skills/install`, `/api/skills/executions`                                                          | Skill handler registration + execution — reach the sandbox container spawn (GHSA-jx89)   |
| `/api/discovery/`                                                                                        | Local network/provider discovery probes                                                  |
| `/api/vnc-session` (`VNC_ROUTE_PREFIX`)                                                                  | Spawns a headful browser + VNC session for interactive logins                            |
| `/api/acp/agents`                                                                                        | ACP — discovers and spawns local CLI agent binaries                                      |
| `/api/resilience/connections`                                                                            | Per-account resilience JSON (cooldown, breaker, lockout). The dashboard HTML is not local-only. |
| `/api/providers/cursor/agent-availability`                                                               | Dashboard install-nudge check — spawns `cursor-agent status --format json`               |
| `/api/providers/{id}/login` (regex)                                                                      | Launches a headful Playwright Chromium for web-cookie login                              |
| `/api/providers/volcengine-plan/connect` (regex)                                                         | Manual headful flow + session-based phone/SMS auto-login (spawns Playwright)             |
| `/api/providers/{id}/refresh-cursor` (regex)                                                             | Manual Cursor session renewal — nudges `cursor-agent`                                    |
| `/api/providers/{id}/chatgpt-web-codex-doctor` (regex)                                                   | Diagnoses the local Codex CLI install (spawns the binary)                                |

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

**#7895 — `mcp:connect` narrow scope:** the `/api/mcp/` carve-out ALSO accepts
a Bearer key holding the narrow `mcp:connect` scope
(`src/shared/constants/managementScopes.ts::MCP_CONNECT_SCOPE`), checked via
`hasMcpConnectOrManageScope()` in `src/server/authz/policies/management.ts`.
This is scoped to `/api/mcp/` ONLY — `mcp:connect` grants nothing on any other
management route (including every other LOCAL_ONLY bypass prefix, should one
ever be added), and it is deliberately excluded from
`MANAGEMENT_API_KEY_SCOPES`. A key holding `manage`/`admin` still passes the
carve-out exactly as before; `mcp:connect` is a lower-privilege alternative
for remote MCP-only callers who should not need broad management access.

| Request                                             | Path                       | Result              |
| --------------------------------------------------- | -------------------------- | ------------------- |
| Non-loopback, no Bearer                             | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer with `manage` scope            | `/api/mcp/*`               | Allow               |
| Non-loopback, Bearer with `mcp:connect` scope       | `/api/mcp/*`               | Allow               |
| Non-loopback, Bearer without `manage`/`mcp:connect` | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer with `mcp:connect` scope       | `/api/cli-tools/runtime/*` | 403 LOCAL_ONLY      |
| Non-loopback, Bearer with `manage` scope            | `/api/cli-tools/runtime/*` | 403 LOCAL_ONLY      |
| Loopback, any/no Bearer                             | any LOCAL_ONLY             | Allow (gate passes) |

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
  which is what the dashboard means by "cannot be made bypassable". Dynamic-segment
  and static-path spawn-capable routes under `/api/providers/` (e.g. `/login`,
  `/refresh-cursor`) are covered by the regex-based `SPAWN_CAPABLE_PATTERNS` /
  `SPAWN_CAPABLE_PATTERN_ANCESTORS` companion in
  `src/shared/constants/spawnCapablePrefixes.ts`, not by the flat
  `SPAWN_CAPABLE_PREFIXES` array — the flat array would have to cover the
  entire `/api/providers/` prefix to catch them, over-broadening a route tree
  remote dashboards legitimately use for provider CRUD.

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

| Path                                      | Reason                                         |
| ----------------------------------------- | ---------------------------------------------- |
| `/api/shutdown`                           | Terminates the server process                  |
| `/api/settings/database`                  | Database export, import, and wipe              |
| `/api/db-backups`                         | Full database backup archive access            |
| `/api/settings/export-json`               | Exports the full settings blob (incl. secrets) |
| `/api/settings/import-json`               | Replaces the full settings blob                |
| `/api/providers/health-autopilot/actions` | Executes autopilot remediation actions         |
| `/api/settings/obsidian`                  | Mints reusable WebDAV creds for any vault root |

**Response on violation:** `401 Authentication required`

`/api/settings/obsidian` covers its `/webdav` child: `POST` points the WebDAV file service —
served by the custom Node layer before Next.js, outside this pipeline — at a caller-chosen root
and echoes freshly minted Basic credentials, `DELETE` rotates them, and the parent `POST` stores
the Obsidian REST API token. GHSA-62vw only masked the `GET` password reveal; the issuance was
still on the fail-open tier (GHSA-7pq4-8pvv-rx7r). `enableObsidianVaultSync()` additionally
refuses a vault that is, sits inside, or contains the data directory.

### Fresh-install bootstrap is loopback-only — by real peer, not `Host`

With no management password configured (and no `INITIAL_PASSWORD`), `isAuthRequired()` in
`src/shared/utils/apiAuth.ts` keeps the anonymous bootstrap open **only for loopback peers**.
Loopback is decided from the trusted peer signals, in order: the token-stamped real TCP peer
(`PEER_IP_HEADER` + `VIA_PROXY_HEADER`, what the policy sees), the pipeline's own
`AUTHZ_HEADER_PEER_LOCALITY` verdict (what route handlers see, trusted only while
`OMNIROUTE_PEER_STAMP_TOKEN` is set), or a real socket peer for direct callers. `Host` /
`nextUrl.hostname` are never consulted, and the first-password write
(`POST /api/settings/require-login`) is under the same constraint rather than open to every
network peer (GHSA-7pq4-8pvv-rx7r). `managementPolicy` passes its own `peerContext` verdict
down explicitly, so the ORIGINAL (pre-strip) request's headers never decide it.

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
