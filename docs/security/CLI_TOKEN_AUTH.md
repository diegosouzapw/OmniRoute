# CLI Machine-ID Token Authentication

OmniRoute's CLI uses a **machine-derived token** to authenticate to the local server without requiring an explicit API key. This enables zero-config local use while preserving security for remote access.

## How it works

1. **CLI side** (`bin/cli/utils/cliToken.mjs`): computes `SHA-256(machineId + salt).hex[0..32]` using [`node-machine-id`](https://github.com/automation-stack/node-machine-id) and injects the result as the `x-omniroute-cli-token` header on every `apiFetch` call.

2. **Server side** (`src/lib/middleware/cliTokenAuth.ts`): `isCliTokenAuthValid(request)` accepts the token only if:
   - `OMNIROUTE_DISABLE_CLI_TOKEN` is not `"true"`
   - The header is present and exactly 32 hex characters
   - The originating IP is loopback (`127.0.0.1`, `::1`, `::ffff:127.0.0.1`)
   - The token matches the server's own machine-derived hash (timing-safe compare)

3. `requireManagementAuth` and other route guards call `isCliTokenAuthValid` before checking API keys — so the CLI gets transparent localhost access without storing any credential.

## Threat model

| Scenario                  | Risk                         | Mitigation                                                                                                                           |
| ------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Another user on same host | Could compute the same token | `machine-id` is per-device; on single-user desktops this is acceptable. Use `OMNIROUTE_DISABLE_CLI_TOKEN=true` in multi-user setups. |
| Token leak via logs       | Logs may reveal the token    | The header value is masked in audit logs (`x-omniroute-cli-token: ***`).                                                             |
| Replay attack             | Token is static              | Only accepted from `127.0.0.1`/`::1`. Rejected for any other `x-forwarded-for` IP.                                                   |
| Reuse on another machine  | Machine-bound by design      | `node-machine-id` reads `/etc/machine-id` (Linux), `IOPlatformUUID` (macOS), `MachineGuid` (Windows). Different per host.            |

## Opt-out

Set `OMNIROUTE_DISABLE_CLI_TOKEN=true` in `.env` or the server environment to disable this mechanism entirely. All access then requires an explicit API key.

## Audit logging

Every request authenticated via CLI token is logged with `event: "cli_token_auth"`, the source IP, user-agent, path, and the first 8 characters of the machine-id hash (non-reversible).

## API key precedence

An explicit `Authorization: Bearer <key>` header (from `--api-key` or `OMNIROUTE_API_KEY`) always takes precedence over the CLI token and is evaluated first.

## Related files

- `bin/cli/utils/cliToken.mjs` — CLI token generation
- `src/lib/middleware/cliTokenAuth.ts` — server validation
- `src/lib/api/requireManagementAuth.ts` — integration into auth pipeline
- `tests/unit/cli-machine-token.test.ts` — unit tests
