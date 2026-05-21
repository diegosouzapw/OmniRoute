# Requirements: Generic API key rotation CLI command

> Feature Idea: [#1881](./1881-generic-api-key-rotation-cli.md)
> Research Date: 2026-05-19
> Verdict: VIABLE

## Research Summary

The request is for upstream provider credential rotation via CLI. Key findings from codebase analysis:

1. **The existing `keys rotate` command is NOT the target** — `bin/cli/commands/keys.mjs::runKeysRotateCommand` calls `/api/v1/registered-keys/:id/rotate`, which rotates OmniRoute-issued client API keys. The author wants to rotate upstream provider API keys stored in `provider_connections`.

2. **The `providers.mjs` command already has the right shape** — it registers `providers available`, `providers list`, `providers test`, `providers test-all`, `providers validate`, and `providers metrics`. Two new subcommands fit cleanly: `providers rotate` and `providers status`.

3. **Backend endpoints already exist** — `PATCH /api/providers/:id` can update connection fields including `apiKey`. The `provider_store.mjs` helper `upsertApiKeyProviderConnection()` writes encrypted keys. The PATCH path just needs to be confirmed to accept `apiKey` field updates.

4. **Expiration tracking is in-place** — `src/domain/providerExpiration.ts` + `GET /api/providers/expiration` returns `{ list[], summary }` with `status: active|expiring_soon|expired|unknown` per connection. `providers status` can consume this directly.

5. **Cooldown reset hook** — `open-sse/services/auth.ts::clearAccountError()` must be called (or triggered via an API call that clears it) after successful rotation so the connection exits cooldown immediately.

6. **OAuth providers** — `token-health` endpoint tracks OAuth connection health. For OAuth providers, rotation means re-running the OAuth flow. The CLI already has `omniroute oauth` commands. A `--oauth` flag on `providers rotate` should delegate to the existing oauth flow.

7. **`--from-env` flag** — no precedent in CLI today, but it is a safe, common CLI pattern. The key is read from `process.env[VAR]` and never logged/echoed.

## Reference Implementations

| # | Repository | Stars | Last Updated | Approach | Relevance |
|---|-----------|-------|-------------|---------|-----------|
| 1 | [hashicorp/vault](https://github.com/hashicorp/vault) | 32k+ | 2026 | Dynamic secrets, lease renewal via CLI (`vault lease renew`) | High — gold standard for credential lifecycle |
| 2 | [aws/aws-cli](https://github.com/aws/aws-cli) | 15k+ | 2026 | `aws iam update-access-key` + `aws configure set` for rotation | High — env var sourcing pattern |
| 3 | [cli/cli (gh)](https://github.com/cli/cli) | 38k+ | 2026 | `gh auth refresh` for OAuth token rotation | High — OAuth re-auth CLI pattern |
| 4 | [dopplerhq/cli](https://github.com/DopplerHQ/cli) | 400+ | 2025 | `doppler secrets set KEY=VALUE` with env-var sourcing | Medium — secrets manager CLI UX |

### Key Patterns Found

- **Confirmation gate**: `--yes` flag to skip interactive confirmation (already used in `keys remove`, `keys revoke`)
- **Env-var sourcing**: `--from-env VAR` reads `process.env[VAR]`; guard against empty string; never log the value
- **Dry-run / status-only**: `--dry-run` flag inspects expiry without writing; surface `providerExpiration.status` per connection
- **Grace-period / zero-downtime**: brief overlap period where old key is still accepted; out of scope for CLI since provider-side, but `--grace-period` flag in existing `keys rotate` sets a precedent
- **Post-rotate validation**: after writing the new key, immediately call the test endpoint (`providers test <id>`) to verify the new key works; report pass/fail

## Proposed Solution Architecture

### Approach

Add two new subcommands to the existing `providers` command in `bin/cli/commands/providers.mjs`:

1. `omniroute providers rotate <connectionId> [--new-key <key>] [--from-env <VAR>] [--oauth] [--yes] [--skip-test]`
2. `omniroute providers status [--provider <name>] [--output table|json]`

Both commands follow the dual-path pattern already established in `keys.mjs`: try server API first (if server is up), fall back to direct SQLite write if offline (for `rotate` only — `status` requires the server for expiration data).

The `rotate` command flow:
1. Resolve connection by ID or provider name (partial match allowed, error if ambiguous)
2. Source new key: `--new-key` > `--from-env VAR` > interactive prompt (unless `--yes`)
3. Confirm unless `--yes`
4. `PATCH /api/providers/:id` with `{ apiKey: newKey }` — or direct `upsertApiKeyProviderConnection` if offline
5. POST to clear account error / cooldown (call `/api/providers/:id/clear-error` or the equivalent)
6. Unless `--skip-test`: run `providers test <id>` and report pass/fail
7. Report result

### New Files

| File | Purpose |
|------|---------|
| No new files required | All changes fit in existing modules |

### Modified Files

| File | Changes |
|------|---------|
| `bin/cli/commands/providers.mjs` | Add `providers rotate` and `providers status` subcommands + action implementations |
| `bin/cli/provider-store.mjs` | Add `updateProviderApiKey(db, connectionId, newEncryptedKey)` helper if not already present; reuse `upsertApiKeyProviderConnection` |
| `bin/cli/locales/en.json` (or equivalent) | New i18n keys for new subcommand output strings |

### Database Changes

None. `provider_connections.apiKey` already stores encrypted API keys; the PATCH route and existing store helpers handle encryption.

### API Changes

- Verify `PATCH /api/providers/:id` accepts `apiKey` field — if not, a minimal addition to the handler is needed
- Optional: `POST /api/providers/:id/clear-error` (may already exist; verify via `src/app/api/providers/[id]/route.ts`)

### UI Changes

None required.

## Implementation Effort

- **Estimated complexity**: Low-Medium
- **Estimated files changed**: ~3 (providers.mjs, provider-store.mjs, locales)
- **Dependencies needed**: None
- **Breaking changes**: No — additive only
- **i18n impact**: ~12 new translation keys (rotate prompt, confirm, success, error, status table headers, dry-run output)
- **Test coverage needed**: Unit tests for `runProvidersRotateCommand` and `runProvidersStatusCommand`; mock `apiFetch` + `openOmniRouteDb`; assert `--from-env` reads from `process.env`; assert `--yes` skips confirmation; assert cooldown-clear call is made

## Open Questions

1. Does `PATCH /api/providers/:id` currently accept `apiKey` as a writable field? If not, it needs a targeted addition (with the usual Zod validation + encryption).
2. Is there a `POST /api/providers/:id/clear-error` route, or does cooldown clear happen implicitly on next successful request? If the latter, no explicit clear-call is needed from the CLI.
3. Should `providers status` also surface `testStatus` and `rateLimitedUntil` (from `provider_connections`) in addition to expiration data? Recommended yes — gives operators a single-command health overview.
4. For `--oauth`, should `providers rotate` trigger the full browser-based OAuth flow inline, or should it just print the auth URL and instruct the user to run `omniroute oauth <provider>`? The latter is safer and avoids duplicating OAuth flow logic.
5. `--from-env` with an unset variable: should it error loudly (recommended) or fall through to interactive prompt?

## External References

- `src/domain/providerExpiration.ts` — in-memory expiration store, consumed via `/api/providers/expiration`
- `src/app/api/providers/expiration/route.ts` — GET endpoint returning expiration list + summary
- `src/app/api/token-health/route.ts` — OAuth token health aggregate
- `open-sse/services/auth.ts` — `clearAccountError()` and `markAccountUnavailable()`
- `bin/cli/commands/providers.mjs` — existing provider subcommand structure
- `bin/cli/commands/keys.mjs` — precedent for `--yes`, `--from-env` (not yet), `rotate` UX
- `bin/cli/CONVENTIONS.md` — normative CLI conventions (must follow)
- `docs/architecture/RESILIENCE_GUIDE.md` — connection cooldown section
