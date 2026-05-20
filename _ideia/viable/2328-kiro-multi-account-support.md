# Feature: Kiro multi-account support: independent OAuth sessions per connection

> GitHub Issue: #2328 — opened by @disonjer on 2026-05-17T10:44:47Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Feature Description

When using multiple Kiro accounts (e.g., one Google-authenticated and one GitHub-authenticated Pro account), OmniRoute cannot keep both alive simultaneously. The refresh token of one account gets invalidated when the user logs into the other account via `kiro-cli`, because Kiro backend enforces a single-session policy per account.

### Problem

1. User imports refresh_token for Account A (Google Pro) into OmniRoute via "Import Token"
2. User needs to log into Account B (GitHub Pro) via `kiro-cli` to get its refresh_token
3. After logging into Account B, Kiro backend invalidates Account A's refresh_token
4. OmniRoute can no longer refresh Account A — connection dies within ~1 hour
5. The workaround (never touching CLI for one account) is fragile and breaks on any re-auth

### Proposed Solution

**Register an independent OIDC client per connection during import.**

The code in `src/lib/oauth/services/kiro.ts` already has `registerClient()` which creates a unique `clientId`/`clientSecret` pair via AWS SSO OIDC. Currently this is only used for the AWS Builder ID device flow.

Proposal:
1. When a user imports a refresh_token (social auth), OmniRoute calls `registerClient()` to obtain its own `clientId`/`clientSecret` pair
2. Store this pair in `providerSpecificData` for the connection
3. Use this dedicated client registration for all subsequent token refreshes
4. Since each connection has its own registered client, refreshing one account does not invalidate another
5. CLI logins no longer conflict with OmniRoute sessions because they use different client registrations

This would make OmniRoute's refresh cycle fully independent from kiro-cli sessions.

### Alternative Approaches

- **Stable social OAuth device flow in dashboard** — allow users to authenticate directly through OmniRoute without CLI (currently hidden per #2112)
- **Per-connection isolation via separate KIRO_HOME** — hacky, requires multiple CLI profiles
- **Cron-based token rotation** — periodically re-import from CLI, unreliable

### Context

- Related: #2112 (social login buttons hidden), #2114 (AWS Builder ID scope limitation)
- Current refresh logic: `src/lib/oauth/services/kiro.ts` lines 184-239
- Token health check correctly saves new refresh_token after refresh (line 417-418 in `tokenHealthCheck.ts`)
- The issue is upstream (Kiro backend single-session), but OmniRoute can work around it with independent client registration

### Environment

- OmniRoute 3.8.0
- Two Kiro Pro accounts (one Google auth, one GitHub auth)
- Linux server, headless

## 💬 Community Discussion

No comments yet.

## 🎯 Refined Feature Description

Currently, when users import a Kiro refresh token, OmniRoute might reuse a global client or the CLI's client to refresh tokens. Because Kiro backend enforces a single-session policy per OIDC client for a given account, logging into a different account via `kiro-cli` (or refreshing) invalidates the other token.

By registering an independent OIDC client per connection (calling `registerClient()` when a new refresh_token is imported or when setting up the provider), OmniRoute can maintain an isolated session. We need to store this `clientId`/`clientSecret` pair in the provider's `providerSpecificData` in the database and use it during `refreshToken` calls.

### What it solves
- Fixes Kiro token invalidation when using multiple accounts.
- Stops conflicts between `kiro-cli` and OmniRoute.

### How it should work (high level)
1. On token import, if it's a Kiro token, call `registerClient()` to get a new pair.
2. Save `clientId` and `clientSecret` in `providerSpecificData`.
3. Update `src/lib/oauth/services/kiro.ts` token refresh logic to use the stored client pair if available, falling back to default.

### Affected areas
- `src/lib/oauth/services/kiro.ts`
- Token import logic for Kiro.
- Provider database schema (`providerSpecificData` JSON field).

## 📎 Attachments & References
- None

## 🔗 Related Ideas
- None
