---
title: "API-key connection preference"
description: "Per-API-key ordered provider account preference with automatic fallback"
---

# API-key connection preference

OmniRoute can route different projects to different **primary accounts** while preserving automatic account fallback.

Each API key may define `preferredConnections`, an ordered list of provider connection IDs. The first currently eligible connection is selected. If it is unavailable because of quota exhaustion, cooldown, terminal account state, model restrictions, an explicit request exclusion, or another health gate, OmniRoute tries the next preferred connection. After the primary becomes eligible again, new requests prefer it again.

`preferredConnections` is deliberately separate from `allowedConnections`:

- `allowedConnections` is an access-control allowlist.
- `preferredConnections` is routing order only and never grants access.
- an empty preference list preserves the existing global connection strategy and priority behavior.
- forced connection routing and an already-active exclusive lease remain authoritative.

## Example

Two projects can share the same two AntiGravity accounts but choose opposite primaries:

```json
// Project A API key
{
  "allowedConnections": ["ACCOUNT_A", "ACCOUNT_B"],
  "preferredConnections": ["ACCOUNT_A", "ACCOUNT_B"]
}

// Project B API key
{
  "allowedConnections": ["ACCOUNT_A", "ACCOUNT_B"],
  "preferredConnections": ["ACCOUNT_B", "ACCOUNT_A"]
}
```

This is useful for quota isolation, workload ownership, subscription/account balancing, and keeping one project from draining another project's preferred account while retaining OmniRoute's resilience when that account is temporarily unavailable.

## Configure

Create or update an API key through the API-key management endpoints and include `preferredConnections` as an ordered array of connection UUIDs. When `allowedConnections` is also supplied in the same request, preferred IDs must be a subset of it.
