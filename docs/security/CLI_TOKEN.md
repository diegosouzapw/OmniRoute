---
title: "CLI Machine-ID Token"
---

# CLI Machine-ID Token

## Overview

OmniRoute CLI commands authenticate against the local management API using a
`HMAC-SHA256(machine-id, salt)` token sent via the `x-omniroute-cli-token`
request header.

This allows CLI subcommands (`omniroute status`, `omniroute providers`, etc.)
to call management endpoints without requiring the user to supply a JWT or
password on every invocation.

## How it works

1. `getMachineTokenSync()` reads the hardware machine ID via `node-machine-id`
   (falls back to an empty string on failure, disabling CLI auth).
2. It computes `HMAC-SHA256(machine_id, salt)` and returns the full 64-char
   hex digest — a deterministic, non-reversible token tied to this machine.
3. The CLI sends the token as `x-omniroute-cli-token` only when the resolved
   destination is an explicit loopback URL (`localhost`, `127.0.0.0/8`, or
   loopback IPv6). Requests carrying the token use `redirect: error`, so a local
   redirect cannot forward it to another origin. Remote contexts use scoped
   access tokens instead. If derivation is unavailable, the CLI omits the header
   and `omniroute doctor` reports the failure instead of treating an empty token
   as valid.
4. The server (`src/server/authz/policies/management.ts`) recomputes the
   expected token with the same salt and compares via `timingSafeEqual` to
   prevent timing-based extraction.

## Security properties

| Property                         | Detail                                                                                                                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback-only**                | Accepted only when the server's trusted peer-locality stamp (derived from the real TCP peer address) says loopback. The client-controlled `Host` header is never trusted for locality. |
| **Constant-time compare**        | `crypto.timingSafeEqual` prevents timing attacks.                                                                                                                                      |
| **Non-reversible**               | HMAC output cannot recover the machine-id.                                                                                                                                             |
| **No `always`-protected bypass** | `isAlwaysProtectedPath()` is evaluated before the CLI token check. `/api/shutdown` and `/api/settings/database` always require JWT.                                                    |
| **Non-exportable**               | Token is never written to disk or logged.                                                                                                                                              |

## Default salt (random per install)

When `OMNIROUTE_CLI_SALT` is not set, the salt is a random 64-char hex string
generated once and persisted at `<DATA_DIR>/cli-token-salt.json` (mode `0600`) —
not the checked-in literal `omniroute-cli-auth-v1`. Both `getActiveSalt()` in
`src/lib/machineToken.ts` and its mirror in `bin/cli/utils/cliToken.mjs` read the
same file, so the server and every CLI invocation on this install converge on the
same value; the checked-in literal is used only as a last-resort fallback when no
persisted or env salt can be established yet (for example a fresh CLI-only install
before the server has ever run). This closes a weakness of the old fixed literal
default: `/etc/machine-id` is commonly world-readable, so any local user could
otherwise derive the same token for every install that never set
`OMNIROUTE_CLI_SALT`.

## Salt rotation

Set `OMNIROUTE_CLI_SALT` to rotate the derived token without code changes — it
always takes priority over the persisted per-install salt. After rotation, all CLI
processes on this machine will use the new token automatically. Useful after a
process-list leak that may have exposed the previous derived value.

```bash
# Persistent rotation (add to shell profile)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verify new token is in use
omniroute status
```

## Legacy format (SHA-256, 32-char) — still accepted

Before the HMAC format above, the CLI derived its token as
`SHA-256(machineId + salt).hex[0..32]` (a 32-char prefix) in
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` in `src/lib/machineToken.ts`).

For backwards compatibility the server accepts **both** formats: the verifier builds
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` and compares the
incoming header against each with `timingSafeEqual`
(`src/server/authz/policies/management.ts` and `src/lib/middleware/cliTokenAuth.ts`).
So a token is valid if it matches **either** the 64-char HMAC digest or the 32-char
legacy SHA-256 prefix.

**Opt-out:** set `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env or `.env`) to disable the CLI
token mechanism entirely; all access then requires an explicit API key. On multi-user
hosts this is recommended, since `machine-id` is per-device (not per-user) and another
user on the same host could compute the same token.

## Files

| File                                      | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `src/lib/machineToken.ts`                 | Token derivation (`getMachineTokenSync`) |
| `bin/cli/utils/cliToken.mjs`              | CLI-side mirror of the same derivation   |
| `<DATA_DIR>/cli-token-salt.json`          | Persisted random per-install salt        |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` constant              |
| `src/server/authz/policies/management.ts` | Server-side verification                 |
| `src/server/authz/routeGuard.ts`          | Loopback host check (`isLoopbackHost`)   |

## See also

- `docs/security/ROUTE_GUARD_TIERS.md` — route protection tiers
- `docs/architecture/AUTHZ_GUIDE.md` — full authorization pipeline
