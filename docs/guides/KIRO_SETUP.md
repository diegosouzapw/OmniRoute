# Kiro Setup Guide

This guide covers adding Kiro (AWS-hosted AI coding assistant) accounts to OmniRoute,
with a focus on running multiple accounts simultaneously without session conflicts.

---

## Background: Why Kiro Accounts Can Conflict

Kiro's backend uses AWS SSO OIDC client registrations to track active sessions.
The critical constraint: **each OIDC client registration supports only one active
session at a time**. When a second device or user authenticates using the same
registered client, the backend invalidates the first account's refresh token.

This is the same mechanism that causes problems when running `kiro-cli login` on a
machine where another Kiro account is already signed in — the new login revokes the
first account's token.

---

## How OmniRoute Solves This (v3.8.0+)

Starting with v3.8.0, OmniRoute calls `registerClient()` (AWS SSO OIDC) during every
Kiro connection import. This gives each OmniRoute connection its own dedicated OIDC
client registration. Because each client registration is independent, refreshing or
re-authenticating one account does not affect any other account's refresh token.

The isolation applies to all three import methods:

| Import method                                 | Isolation status                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| AWS Builder ID / IDC device-code flow         | Isolated since the device-code flow was introduced                                               |
| **Import Token** (manual refresh token paste) | Isolated from v3.8.0                                                                             |
| **Google / GitHub social login**              | Isolated from v3.8.0                                                                             |
| **Auto-Import** (kiro-cli SQLite)             | Isolated from v3.8.0 (SQLite path was already isolated; SSO-cache fallback is now also isolated) |

---

## Migration Note for Connections Created Before v3.8.0

Connections imported before v3.8.0 do not have a dedicated OIDC client registration
stored in `providerSpecificData`. These connections continue to work but use the shared
social-auth refresh endpoint, which means two such connections can still invalidate each
other.

**To gain isolation:** delete the old connection from **Dashboard → Providers** and
re-import it using any of the supported import flows. All newly created connections will
receive their own client registration automatically.

---

## Adding Two Kiro Accounts Side by Side

### Prerequisites

- OmniRoute v3.8.0 or later.
- A working Kiro account (email + password, Google, or GitHub login).
- Optionally a second Kiro account.

### Step 1: Import the first account

1. Open **Dashboard → Providers → Add Provider → Kiro**.
2. Choose one of:
   - **Import Token** — paste a refresh token starting with `aorAAAAAG`.
   - **Google / GitHub login** — complete the OAuth flow in the browser.
   - **Auto-Import** — click the button; OmniRoute reads credentials from the
     local kiro-cli database or `~/.aws/sso/cache`.
3. The connection is saved. OmniRoute automatically registers a dedicated OIDC client for it.

### Step 2: Import the second account

Repeat step 1 for the second account. Because each import creates a separate OIDC
client registration, the two connections are fully isolated.

### Step 3: Verify both connections are active

1. **Dashboard → Providers** — both Kiro connections should show **Active** status.
2. **Dashboard → Health** — both connections should pass their token health check.

### Step 4: Use a combo to route between accounts

Create a combo with both connections as targets to load-balance or fall back between them:

```
kiro/kiro-dev → kiro/kiro-pro
```

See [FEATURES.md](./FEATURES.md) and the routing documentation for combo configuration.

---

## Enterprise / IDC Users

For AWS IAM Identity Center (IDC) accounts, use the **AWS Builder ID / IDC device-code**
flow from **Dashboard → Providers → Kiro → Device Code**. The device-code flow has
always been fully isolated. No re-import is needed for these connections.

Enterprise users who operate in a non-default AWS region can specify the region when
importing via the Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

The `region` field defaults to `us-east-1` when omitted.

---

## OIDC Client Expiry

AWS SSO OIDC public clients typically expire after 90 days
(`clientSecretExpiresAt`). OmniRoute stores this timestamp in `providerSpecificData`
for observability. If a connection stops refreshing after ~90 days, re-import the
connection to obtain a fresh OIDC client registration. Automatic re-registration on
expiry is tracked as a future improvement.

---

## Troubleshooting

### Second account keeps getting logged out

- Check both connections in **Dashboard → Providers** and confirm each shows a non-null
  `clientId` in its raw JSON (visible via the info icon). If either connection is missing
  `clientId`, it was imported before v3.8.0 — re-import it.

### Import fails with "Token validation failed"

- Ensure the refresh token starts with `aorAAAAAG`.
- Ensure OmniRoute can reach `https://oidc.us-east-1.amazonaws.com` (or the configured
  region). If you are behind a corporate proxy, set a provider-level proxy in
  **Dashboard → Settings → Proxies**.

For other issues, see the main [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
