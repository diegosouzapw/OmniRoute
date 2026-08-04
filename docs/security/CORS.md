---
title: CORS Configuration & Security
---

# CORS Configuration & Security

OmniRoute controls which **browser origins** may read cross-origin responses
from a single, centralized allowlist. The model is **fail-closed by default**:
no origin is allowed until you opt one in. This page documents how the allowlist
resolves, what `CORS_ALLOW_ALL=true` actually exposes (and, importantly, what it
does **not**), how to configure dev vs production safely, and the runtime warning
the dashboard shows when a wildcard is live.

**Source of truth:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). The allowlist is applied once, in the
middleware (`src/server/authz/pipeline.ts`) — per-route handlers do not set
`Access-Control-Allow-Origin` themselves.

## How an origin is resolved

For each request the middleware computes the `Access-Control-Allow-Origin` value
in this order:

1. **`CORS_ALLOW_ALL=true`** (or the legacy `CORS_ORIGIN=*`) → echo the caller's
   `Origin` back (or `*` when there is no `Origin` header), with `Vary: Origin`
   so caches stay correct. The same `applyCorsHeaders()` chokepoint also appends
   `Vary: Accept-Encoding` to every 2xx-with-body response on the token-authenticated
   `/v1*`/`/v1beta*` surface (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), so
   downstream/shared caches can correctly distinguish compressed vs uncompressed
   variants.
2. Otherwise, the request `Origin` is normalized (lower-cased, trailing slash
   stripped) and matched against the **merged allowlist**:
   - env **`CORS_ALLOWED_ORIGINS`** — comma-separated list, and
   - the runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_), injected via `setRuntimeAllowedOrigins()` from
     `src/lib/config/runtimeSettings.ts`.
3. No match → **no `Access-Control-Allow-Origin` header is emitted**. The browser
   blocks the cross-origin read. This is the intended fail-closed default.

| Env var                | Meaning                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV of exact origins to allow (recommended).                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → echo any origin (wildcard). Dev only.                                   |
| `CORS_ORIGIN`          | Legacy. `*` behaves like `CORS_ALLOW_ALL`; a single value is added to the allowlist. |

## Threat model — what `CORS_ALLOW_ALL=true` really exposes

The generic OWASP warning ("wildcard CORS = any site can call your API") is worth
taking seriously, but OmniRoute's exposure is **narrower than the generic case**,
because of one concrete implementation fact:

> **The central `applyCorsHeaders()` never emits
> `Access-Control-Allow-Credentials`.** A browser will not expose a _credentialed_
> (cookie-bearing) cross-origin response unless the server sends
> `Access-Control-Allow-Credentials: true`. OmniRoute's shared CORS path never
> does.

What that means per surface, even with `CORS_ALLOW_ALL=true`:

| Surface                             | Auth mechanism              | Effect of wildcard CORS                                                                                                                                                                                                          |
| ----------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin is echoed, but **without `Allow-Credentials`** the browser **blocks** the credentialed read. A malicious cross-origin site **cannot read** your authenticated dashboard responses, and the session cookie is not exposed. |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | Already permissive **by design** (`relaxForTokenAuth`): browsers never auto-attach `Authorization`/`x-api-key`, so an attacker's page cannot supply your key. `CORS_ALLOW_ALL` does not widen this.                              |
| Public read-only (`/api/health`, …) | None                        | Non-sensitive; wildcard is harmless.                                                                                                                                                                                             |

So the **residual** exposure of `CORS_ALLOW_ALL=true` is limited to: (a)
non-credentialed cross-origin **reads** of already-unauthenticated data, and (b)
letting CORS **preflight pass** on management routes — which still require auth
that a cross-origin page cannot provide. It is **not** a session-hijack or
credential-theft vector on the shared CORS path.

### One genuine exception — `/api/v1/agents/`

The Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) set
their **own** CORS headers
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) and **do** emit
`Access-Control-Allow-Origin: <origin>|*` together with
`Access-Control-Allow-Credentials: true`. This is the single surface where
origin-echo and credentials coexist, and it is **independent of
`CORS_ALLOW_ALL`**. These routes are management-authenticated
(`requireManagementAuth`); operators who expose the dashboard off-host should be
aware that this is the one place a cross-origin credentialed read is permitted by
the response headers. Tightening it to an explicit allowlist is tracked
separately from this CORS guidance.

## Production checklist

- **Never set `CORS_ALLOW_ALL=true` in production.** Leave it unset.
- Set an **explicit** origin list — either the env var or the Security-tab field:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- If OmniRoute runs behind a reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS is **not** your only control — the loopback route
  guard still protects spawn-capable routes (see
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Do not forge
  `X-Forwarded-For: 127.0.0.1` to "fix" a 403; that re-opens the RCE class the
  route guard closes.
- Confirm the runtime state: the dashboard shows a **persistent amber banner**
  under Dashboard → Security → Authorization Inventory whenever
  `CORS_ALLOW_ALL=true` is live, and `/api/settings/authz-inventory` returns a
  `cors: { allowAll, allowedOrigins }` envelope monitoring tools can poll.

## Development convenience — allow specific local origins

You rarely need the wildcard even in dev. Allow just the dev servers you use:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins are matched case-insensitively with the trailing slash ignored, so
`http://localhost:3000` and `http://localhost:3000/` are equivalent. The same CSV
can be set at runtime in **Dashboard → Security → CORS Allowed Origins** without a
restart.

## API keys vs cookie sessions

- **Bearer / `x-api-key` (the `/v1/*` inference surface):** browsers never attach
  these automatically. CORS is not a meaningful barrier here — the API key is the
  barrier — which is why that surface is intentionally permissive so browser and
  Electron clients can read responses they are already entitled to.
- **Cookie session (the dashboard):** protected by the fail-closed default **and**
  by the absence of `Access-Control-Allow-Credentials` on the shared path. Keep
  management/dashboard origins out of any permissive config; they must stay exactly
  fail-closed.

## Example: reverse proxy in front of OmniRoute

CORS is enforced by OmniRoute itself, so the proxy generally should **not** add or
rewrite `Access-Control-*` headers (double headers break browsers). Terminate TLS
and forward — let OmniRoute answer preflight:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Do NOT set X-Forwarded-For to 127.0.0.1 — it defeats the loopback route guard.
}
```

Set the allowed browser origins in OmniRoute (`CORS_ALLOWED_ORIGINS` or the
Security tab), not in the proxy.

## Source files

| Concern                                         | File                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Middleware application (single source of truth) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection             | `src/lib/config/runtimeSettings.ts`                                  |
| Runtime status for the dashboard                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard warning banner                        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins field                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per-route CORS (the exception)      | `src/lib/cloudAgent/api.ts`                                          |

## See also

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement for
  spawn-capable routes (a separate, complementary control).
- [Authorization Guide](../architecture/AUTHZ_GUIDE.md) — the full auth pipeline.
