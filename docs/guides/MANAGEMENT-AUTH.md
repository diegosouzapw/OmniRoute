---
title: "Management Authentication"
version: 3.8.50
lastUpdated: 2026-08-05
---

# Management Authentication

OmniRoute uses four distinct credential families for management access. This guide
distinguishes them by purpose, scope, and locality.

| Credential              | Scope              | Locality      | Use Case                          |
|-------------------------|--------------------|---------------|-----------------------------------|
| Dashboard JWT session   | Full management    | Localhost      | Web dashboard login               |
| CLI machine-id token    | Full management    | Per-machine    | `omniroute` CLI commands          |
| Scoped `oma_` token     | Configurable scope | External       | Automation / CI / API access      |
| Manage-scope API key    | `manage` scope     | External       | Management API calls              |

## Dashboard JWT Session

Generated on dashboard login (`/api/auth/login`). Stored in HTTP-only cookie.
Valid for the session duration. Cannot be used from external hosts.

## CLI Machine-ID Token

Created by `omniroute auth login` on first use. Stored in `~/.omniroute/auth.json`.
Used by the CLI for all management operations. Tied to the machine identity.

## Scoped `oma_` Access Token

Created via dashboard or CLI with configurable scopes (e.g., `manage`, `read`).
Format: `oma_<random-hex>`. Used for programmatic access from external systems.

## Manage-Scope API Key

Standard API key with the `manage` scope enabled. Created in dashboard API Keys page.
Used for management API calls from external hosts.

## Header Examples

```
Authorization: Bearer oma_abc123def456
Authorization: Bearer <standard-api-key-with-manage-scope>
Cookie: omniroute_session=<jwt-token>
```

See `docs/reference/API_REFERENCE.md` for endpoint-specific auth requirements.
