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
3. The CLI sends the token as `x-omniroute-cli-token` on every request to
   `http://localhost:<port>/api/...`.
4. The server (`src/server/authz/policies/management.ts`) recomputes the
   expected token with the same salt and compares via `timingSafeEqual` to
   prevent timing-based extraction.

## Security properties

| Property                         | Detail                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback-only**                | Accepted only when `Host` is `localhost`, `127.0.0.1`, or `::1`.                                                                    |
| **Constant-time compare**        | `crypto.timingSafeEqual` prevents timing attacks.                                                                                   |
| **Non-reversible**               | HMAC output cannot recover the machine-id.                                                                                          |
| **No `always`-protected bypass** | `isAlwaysProtectedPath()` is evaluated before the CLI token check. `/api/shutdown` and `/api/settings/database` always require JWT. |
| **Non-exportable**               | Token is never written to disk or logged.                                                                                           |

## Salt rotation

Set `OMNIROUTE_CLI_SALT` to rotate the derived token without code changes.
After rotation, all CLI processes on this machine will use the new token
automatically. Useful after a process-list leak that may have exposed the
previous derived value.

```bash
# Persistent rotation (add to shell profile)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verify new token is in use
omniroute status
```

Default salt: `omniroute-cli-auth-v1`

## Files

| File                                      | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `src/lib/machineToken.ts`                 | Token derivation (`getMachineTokenSync`) |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` constant              |
| `src/server/authz/policies/management.ts` | Server-side verification                 |
| `src/server/authz/routeGuard.ts`          | Loopback host check (`isLoopbackHost`)   |

## See also

- `docs/security/ROUTE_GUARD_TIERS.md` — route protection tiers
- `docs/architecture/AUTHZ_GUIDE.md` — full authorization pipeline
