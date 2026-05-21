---
issue: 1881
last_synced_at: 2026-05-19T00:00:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  commenters: 0
  age_days: 17
  labels: []
  state: open
  classified_at: 2026-05-19T00:00:00Z
---

# Feature: Generic API key rotation CLI command

> GitHub Issue: #1881 — opened by @apoapostolov on 2026-05-02
> Status: Cataloged | Priority: TBD

## Original Request

## What

A CLI command to rotate API keys across all configured providers:

- `omniroute keys rotate` — Rotate all expired/soon-to-expire keys
- `omniroute keys rotate <provider>` — Rotate keys for a specific provider
- `omniroute keys status` — Show key health (age, expiry, last used)

## Why

- `api/settings/oneproxy/rotate` and MCP tool `omniroute_oneproxy_rotate` exist, but only for the OneProxy feature.
- Many providers (especially Google Cloud, Azure, AWS) use rotating/temporary credentials. There's no generic rotation mechanism.
- The `token-health` route and `api/providers/expiration` route already track expiration — a CLI command would make this actionable.
- Key lifecycle management is a security best practice for any proxy handling multiple API keys.

## Implementation

- Extend the existing `api/keys/` and `api/providers/expiration` logic.
- For OAuth-based providers (Google), trigger the OAuth flow or prompt for a refresh token.
- Support env var fallback: `omniroute keys rotate OpenRouter --from-env OPENROUTER_API_KEY`.

## Community Discussion

No comments at time of cataloging.

### Participants

- @apoapostolov — Original requester

### Key Points

- Request is scoped exclusively to upstream provider API keys/credentials (not OmniRoute client registered keys)
- Current `keys rotate <id>` in `bin/cli/commands/keys.mjs` rotates OmniRoute-issued client API keys via `/api/v1/registered-keys/:id/rotate` — a fundamentally different operation
- The author correctly identifies that OneProxy rotation exists in isolation and desires a generic equivalent
- The `--from-env` flag for sourcing the new key from an environment variable is a clean pipeline-friendly addition

## Refined Feature Description

This issue requests a **provider credential rotation** facility — the ability to update an upstream API key (or refresh an OAuth token) for a configured provider connection, from the command line. This is distinct from the existing `omniroute keys rotate` which rotates OmniRoute-issued client keys.

OmniRoute currently stores provider credentials (API keys, OAuth tokens, refresh tokens) as encrypted `provider_connections` rows. When a provider key expires or needs rolling (e.g., a key was compromised, a free-tier key is being replaced, a cloud provider's short-lived token expired), the only current path is the dashboard UI or direct SQLite manipulation.

### What it solves

- No CLI path to update expired or compromised upstream provider API keys
- Operators running headless/server deployments cannot rotate provider keys without a GUI
- No aggregate health view showing key age, last-used, and expiry across all providers at once
- CI/CD pipelines cannot automate key rotation from env vars or secrets managers

### How it should work (high level)

1. `omniroute providers rotate <connectionId|providerName> --new-key <key>` — replace the API key for one provider connection in the DB (with `--yes` to skip confirmation)
2. `omniroute providers rotate <connectionId|providerName> --from-env <VAR>` — read new key from env var (CI-friendly, avoids key in shell history)
3. `omniroute providers rotate --all --dry-run` — report which connections have expired/soon-to-expire keys; update nothing yet (uses `providerExpiration` domain)
4. `omniroute providers status` — tabular view of all provider connections with: key age, expiry date (from `providerExpiration`), `testStatus`, `rateLimitedUntil`, last-used timestamp
5. For OAuth-based providers: `omniroute providers rotate <id> --oauth` triggers the existing OAuth re-auth flow (links to the browser or prints auth URL)

### Affected areas

- `bin/cli/commands/providers.mjs` — new `rotate` and `status` subcommands
- `bin/cli/provider-store.mjs` — `updateProviderApiKey()` helper (writes encrypted key)
- `src/domain/providerExpiration.ts` — already tracks expiry; needs no changes, just consumed via API
- `src/app/api/providers/expiration/route.ts` — consumed by CLI `providers status`
- `src/app/api/providers/[id]/route.ts` — existing PATCH endpoint can accept the key update
- `open-sse/services/auth.ts` — `clearAccountError()` should be called after successful rotation to lift any cooldown
- No new DB schema needed — `provider_connections.apiKey` already holds the encrypted key

## Attachments & References

No images or mockups in the original issue.

## Related Ideas

- Relates to `_ideia/viable/1733-combo-provider-level-exhaustion-tracking...` (both touch provider connection health state)
- See `docs/architecture/RESILIENCE_GUIDE.md` — connection cooldown section — rotation should call `clearAccountError()` post-rotate to reset `rateLimitedUntil` and `backoffLevel`
