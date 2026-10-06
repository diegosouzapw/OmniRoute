---
title: "Providers — Microsoft 365 Copilot (BizChat)"
version: 3.8.51
lastUpdated: 2026-09-11
---

# Providers — Microsoft 365 Copilot (BizChat)

`copilot-m365-web` (alias `m365copilot`) sends OpenAI-format chat requests through an
authenticated Microsoft 365 Copilot BizChat browser session at
`m365.cloud.microsoft/chat`. This is an unofficial integration.

> **New to Web Cookie providers?**
>
> Read **`docs/getting-started/WEB-COOKIE-GUIDE.md`** for the general setup process, authentication guidance, limitations, and troubleshooting before following this provider-specific guide.
>
> **Important:** The credential for this provider is **not a cookie**. Do not copy
> cookies from `m365.cloud.microsoft`. The credential is a WebSocket URL query
> parameter and path segment, both read from the DevTools Network tab.

## Prerequisites

- A Microsoft 365 account with access to BizChat at `m365.cloud.microsoft/chat`
- A Chromium-based browser (Chrome, Edge) for DevTools WebSocket inspection
- A M365 Copilot license (included with many Microsoft 365 Business/Enterprise plans)

## Credential capture (WebSocket method)

1. Sign in at `https://m365.cloud.microsoft/chat` and start a conversation.
2. Open **DevTools → Network**.
3. Filter by **WS** (WebSocket).
4. Click the Chathub WebSocket connection. Look for a URL beginning with
   `wss://substrate.office.com/m365Copilot/Chathub/`.
5. From its **Request URL**, copy:
   - The `access_token` query parameter value (a short-lived JWT).
   - The Chathub path segment after `/Chathub/` (e.g. `<oid>@<tenant>`).

The full URL has the form:

```
wss://substrate.office.com/m365Copilot/Chathub/<oid>@<tenant>?...&access_token=<jwt>
```

6. In OmniRoute, go to **Providers → Add Provider**, select **Microsoft 365 Copilot
   (BizChat)**, and paste the credential in the format:

```
access_token=<jwt>; chathubPath=<oid>@<tenant>
```

7. Click **Test Connection** and **Save**.

## Credential capture (HAR import)

Instead of manually copying values from the WebSocket URL, you can export a DevTools HAR
file:

1. Open **DevTools → Network**.
2. Start or continue a BizChat conversation (this triggers the WebSocket connection).
3. Right-click in the Network panel and select **Save all as HAR with content**.
4. In OmniRoute, use the **Import .har file** button on the provider connection dialog.

OmniRoute scans the HAR for the Chathub WebSocket URL, extracts the
`access_token` and `chathubPath`, and populates the credential fields automatically. The
HAR import decodes the JWT expiry and shows the remaining token lifetime.

> **Never commit a real HAR export, access token, or refresh token.** Test and
> documentation values must always be placeholders.

## Token lifetime and refresh

The `access_token` is short-lived (typically **~75 minutes**). After expiry, the provider
reports a connection error and you must re-capture the credential.

### Automatic refresh with `refreshToken`

To avoid manual re-capture, you can store a Microsoft refresh token in the connection's
**Advanced Settings → providerSpecificData**:

| Field          | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `refreshToken` | Microsoft OAuth refresh token for `substrate.office.com/sydney` scope      |
| `tier`         | `individual` (default), `edu`, or `enterprise`                             |

Obtain the refresh token from a Microsoft device-code or authorization-code flow
scoped to `substrate.office.com/sydney`. With `refreshToken` set, OmniRoute
pre-flight-refreshes the `access_token` before each request, so you do not need to
re-capture after every ~75-minute expiry.

If `refreshToken` is not set, you must re-capture the WebSocket credential manually
after each expiry.

### Tier selection

| Tier          | Alias        | Surface                         |
| ------------- | ------------ | ------------------------------- |
| `individual`  | _(default)_  | Consumer M365 Copilot           |
| `edu`         | `included`   | Education M365 Copilot          |
| `enterprise`  | `work`       | M365 Copilot for Work           |

Set the tier in **Advanced Settings → providerSpecificData → tier**. The tier affects
the BizChat routing and model access.

## Security model

- **Unofficial integration.** This provider reverse-engineers the BizChat WebSocket
  protocol. It may break without notice when Microsoft changes the endpoint.
- The `subscriptionRisk: true` flag reflects that the integration relies on an
  undocumented endpoint. Account restrictions are possible but not confirmed.
- The access token is a short-lived JWT. Treat it like a password: do not commit,
  log, or share it.
- The refresh token grants长期 access to the BizChat surface. Store it with the
  same care as an API key.

## Troubleshooting

### Authentication fails immediately

- Verify you copied from the **WebSocket URL**, not from an XHR/Fetch request. The
  credential is in the `access_token` query parameter of the Chathub WebSocket
  connection — not in an `Authorization: Bearer` header.
- Ensure the `chathubPath` includes the full `<oid>@<tenant>` segment from the URL
  path.

### Token expires after ~75 minutes

This is expected. Without a `refreshToken`, the access token is short-lived. Either:

- Re-capture the credential from DevTools, or
- Configure a `refreshToken` in Advanced Settings for automatic refresh.

### Test Connection passes but chat returns 401

The token may have expired between validation and the first request. Re-capture a
fresh credential.

### Copilot does not appear in the provider list

Ensure `copilot-m365-web` is enabled in **Dashboard → Providers**. The provider may
be hidden by default in some tiers.

## References

- Issue: [#12779](https://github.com/diegosouzapw/OmniRoute/issues/12779)
- Discussion: [#12756](https://github.com/diegosouzapw/OmniRoute/discussions/12756)
- Source: `src/shared/constants/providers/web-cookie.ts` (provider definition)
- HAR import: `src/shared/utils/m365HarImport.ts`
- Credential fields: `src/shared/providers/webSessionCredentials.ts`
- Tier modal: `src/app/(dashboard)/dashboard/providers/[id]/components/modals/m365Tier.ts`
