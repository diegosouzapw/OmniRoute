---
title: "Kiro Setup Guide"
---

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

The isolation applies to the refresh-token import methods, and API-key auth avoids
OIDC refresh sessions entirely:

| Import method                                 | Isolation status                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| AWS Builder ID / IDC device-code flow         | Isolated since the device-code flow was introduced                                               |
| **Import Token** (manual refresh token paste) | Isolated from v3.8.0                                                                             |
| **Google / GitHub social login**              | Isolated from v3.8.0                                                                             |
| **Auto-Import** (kiro-cli SQLite)             | Isolated from v3.8.0 (SQLite path was already isolated; SSO-cache fallback is now also isolated) |
| **API Key** (long-lived CodeWhisperer key)    | No refresh session; the key is validated and stored as a bearer credential                       |

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
   - **API Key** — paste a long-lived Kiro / CodeWhisperer API key.
   - **Google / GitHub login** — complete the OAuth flow in the browser.
   - **Auto-Import** — click the button; OmniRoute reads credentials from the
     local kiro-cli database or `~/.aws/sso/cache`.
3. The connection is saved. Refresh-token flows automatically register a dedicated
   OIDC client. API-key flows validate the key with AWS and do not store a refresh token.

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

## API-Key Import Flow

API-key auth is for long-lived Kiro / AWS CodeWhisperer bearer credentials. It does
not use OAuth refresh, so it avoids shared OIDC session invalidation.

### Dashboard

1. Open **Dashboard -> Providers -> Kiro**.
2. Choose **API Key**.
3. Paste the API key and optional AWS region (`us-east-1` by default).
4. OmniRoute validates the key and saves the connection.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Internal Contract

The API route validates the key by calling `KiroService.validateApiKey()`, which
uses `ListAvailableProfiles` against the region-matched CodeWhisperer/Amazon Q
endpoint and resolves a `profileArn`.

The saved connection uses:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

At runtime, `KiroExecutor.buildHeaders()` sends the key as
`Authorization: Bearer <key>` and adds `tokentype: API_KEY`. Quota/profile calls
use the same marker so AWS treats the bearer as a long-lived API key rather than
an OIDC or social access token.

---

## OIDC Client Expiry

AWS SSO OIDC public clients typically expire after 90 days
(`clientSecretExpiresAt`). OmniRoute stores this timestamp in `providerSpecificData`
for observability. If a connection stops refreshing after ~90 days, re-import the
connection to obtain a fresh OIDC client registration. Automatic re-registration on
expiry is tracked as a future improvement.

API-key connections do not have OIDC client expiry because they do not refresh
through AWS SSO OIDC.

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

### API-key import fails

- Confirm the key is a Kiro / CodeWhisperer API key, not a refresh token.
- Confirm the AWS region matches the key/account. `us-east-1` is the default.
- The key must be able to call `ListAvailableProfiles`; otherwise OmniRoute cannot
  resolve the required `profileArn`.

For other issues, see the main [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
