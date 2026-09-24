---
title: "Entra ID SSO for the Client API"
version: 3.8.51
lastUpdated: 2026-09-23
---

# Entra ID SSO for the Client API

> **Source of truth:** `src/server/authz/entra/`, `src/lib/db/ssoIdentities.ts`
> **Client helper:** `scripts/cli/omniroute-sso.mjs`
> **Tests:** `tests/unit/entra-sso-auth.test.ts`, `tests/unit/entra-sso-client-script.test.ts`
> **Audience:** Administrators rolling OmniRoute out to a Microsoft Entra ID tenant, and the developers signing in to it.

Developers authenticate to `/v1/*` with a short-lived Microsoft Entra ID token
instead of a static OmniRoute API key. Their Entra security groups map onto
OmniRoute key groups, so the rate limits, model allowlists, budgets and combo
permissions an operator already configures apply per person, and usage is
attributed per person in the call log.

Static API keys keep working. Enabling SSO only adds a way to authenticate.

---

## How it fits together

```
Claude Code ──apiKeyHelper──► omniroute-sso.mjs token ──► Entra access token
                                                              │
                                    Authorization: Bearer <token>
                                                              ▼
                                            clientApiPolicy (CLIENT_API)
                                              │ looksLikeEntraJwt?
                                              ▼
                             verifyToken → resolveGroups → provisionSsoIdentity
                                                              │
                                              shadow api_keys row + key groups
                                                              ▼
                                        the existing policy engine, unchanged
```

A user's first authenticated request provisions a **shadow `api_keys` row**
bound to their Entra `oid`. The row exists because `key_group_members` has a
foreign key to `api_keys(id)` — routing SSO users through a real key row means
group policy, budgets and call-log attribution work with no SSO-specific
branches anywhere downstream.

The shadow key's secret is never issued to anyone. `getApiKeys()` and
`getApiKeyById()` blank it for `source='sso'` rows: exposing it would create a
permanent static credential that bypasses SSO and survives offboarding.

---

## 1. Register the application in Entra

Create one app registration. It serves both the CLI (a public client) and the
API (the audience tokens are minted for).

1. **Entra admin center → App registrations → New registration.**
   - Name: `OmniRoute`
   - Supported account types: **Accounts in this organizational directory only**
2. **Authentication → Add a platform → Mobile and desktop applications.**
   - Redirect URI: `http://localhost` — the helper binds an ephemeral loopback
     port, so register the loopback redirect Entra reserves for public clients.
   - **Allow public client flows: Yes.** The helper ships to developer machines
     and therefore holds no client secret; it uses PKCE instead.
3. **Expose an API → Set the Application ID URI.** Use `api://omniroute` (or
   accept the generated `api://<client-id>`). This value is `entraApiAudience`.
   - **Add a scope**, e.g. `access_as_user`, admin-consent enabled.
4. **API permissions → Add a permission → My APIs →** your own app → the scope
   from step 3. **Grant admin consent** so developers see no consent prompt.
5. **Token configuration → Add groups claim → Security groups.** Emit **Group
   ID** in the **Access** token.

Note the **Directory (tenant) ID** and **Application (client) ID**.

### If you need the Graph fallback

Entra omits the `groups` claim entirely for a user in more than 150 groups,
sending `_claim_names`/`_claim_sources` instead. In an established tenant
somebody will hit this. Two options:

- **Leave the fallback off.** Those users are denied with a clear message
  (`AUTH_SSO_GROUP_OVERAGE`) rather than silently resolving to "no groups".
- **Enable it.** Add the **Application** permission `GroupMember.Read.All`,
  grant admin consent, create a client secret, and set it as
  `entraGraphClientSecret` (stored encrypted at rest).

---

## 2. Configure OmniRoute

Create the key groups you want to map to first (they carry the actual policy),
then `PATCH /api/settings`. Enabling SSO is a security-impacting change, so the
request must include `currentPassword`.

```bash
curl -X PATCH https://omniroute.corp/api/settings \
  -H 'Content-Type: application/json' \
  -H "Cookie: auth_token=$TOKEN" \
  -d '{
    "currentPassword": "…",
    "entraSsoEnabled": true,
    "entraTenantId": "<directory-tenant-id>",
    "entraClientId": "<application-client-id>",
    "entraApiAudience": "api://omniroute",
    "entraGroupMappings": [
      { "groupId": "<entra-group-object-id>", "keyGroupId": "<omniroute-key-group-id>" }
    ],
    "entraDefaultKeyGroupId": null,
    "entraGraphFallbackEnabled": false
  }'
```

| Setting                     | Meaning                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `entraSsoEnabled`           | Master switch. Default `false`.                                                                  |
| `entraAuthorityHost`        | Authority origin. Defaults to `https://login.microsoftonline.com`; set it for a sovereign cloud. |
| `entraTenantId`             | Directory (tenant) ID. Asserted against the token's `tid`.                                       |
| `entraClientId`             | Application (client) ID the helper uses.                                                         |
| `entraApiAudience`          | Application ID URI. Asserted against the token's `aud`.                                          |
| `entraGroupMappings`        | Entra group objectId → `key_groups.id`. A user gets the union of every match.                    |
| `entraDefaultKeyGroupId`    | Key group for users matching no mapping. `null` denies them.                                     |
| `entraGraphFallbackEnabled` | Resolve group-claim overage through Microsoft Graph.                                             |
| `entraGraphClientSecret`    | Client secret for the Graph fallback. Encrypted at rest.                                         |

The endpoint rejects a configuration that cannot authenticate anyone: tenant and
audience are required, and so is at least one group mapping or a default key
group (otherwise every user would get a 403 that reads like a broken server).

Changes take effect on each user's next token refresh — at most one
`CLAUDE_CODE_API_KEY_HELPER_TTL_MS` window.

### Sovereign clouds

`entraAuthorityHost` selects the Entra instance. Leave it unset for the
commercial cloud; set it to `https://login.microsoftonline.us` (US Gov) or
`https://login.partner.microsoftonline.cn` (China). The value is published
through `/api/auth/sso/config`, so the sign-in helper follows it with no
per-machine configuration.

Plaintext `http` is rejected and falls back to the commercial cloud unless the
host is loopback. The authority determines which keys sign the tokens this
gateway trusts, so accepting an http authority over the network would let anyone
on the path mint identities it accepts. The loopback exception is what lets the
end-to-end test stand up a stub authority — see
`tests/integration/entra-sso-e2e.test.ts`.

---

## 3. Developer setup

Distribute `scripts/cli/omniroute-sso.mjs`. It needs nothing but Node 18+.

```bash
export OMNIROUTE_URL=https://omniroute.corp

node omniroute-sso.mjs login     # opens the browser, stores a refresh token
node omniroute-sso.mjs install   # writes the apiKeyHelper block
claude                           # /status shows the helper is active
```

`install` merges into `~/.claude/settings.json` without disturbing other keys:

```jsonc
{
  "apiKeyHelper": "node \"/path/to/omniroute-sso.mjs\" token --url https://omniroute.corp",
  "env": {
    "ANTHROPIC_BASE_URL": "https://omniroute.corp",
    "CLAUDE_CODE_API_KEY_HELPER_TTL_MS": "900000",
  },
}
```

For a zero-touch rollout, distribute that same block through
[managed settings](https://code.claude.com/docs/en/managed-settings) instead;
developers then run only `login`.

Tokens are cached in `~/.omniroute-sso/<host>.json` with mode `0600`, matching
what `gh` and `aws` do. A standalone script cannot reach the OS keychain without
native dependencies.

### Commands

| Command   | Behavior                                                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `login`   | Authorization code + PKCE (S256) on an ephemeral `127.0.0.1` port.                                                                                 |
| `token`   | Prints the access token to stdout and nothing else. Refreshes silently; exits non-zero with instructions on stderr when a fresh `login` is needed. |
| `install` | Merges the `apiKeyHelper` + `env` block into `~/.claude/settings.json`.                                                                            |
| `logout`  | Deletes the stored tokens for one host.                                                                                                            |

`token` prints the credential alone by design — Claude Code v2.1.227+ fails an
`apiKeyHelper` that emits a banner or log line alongside the key. Every
diagnostic in the script goes to stderr.

---

## Revocation

Understand this before relying on SSO for offboarding.

Disabling a user in Entra stops **new** tokens but does not invalidate one
already issued; it stays valid until `exp` (one hour by default, tunable in
Entra). OmniRoute's instant kill-switch is the shadow key: set it inactive and
the user stops authenticating on their very next request, even inside the
resolution-cache window.

```sql
UPDATE api_keys SET is_active = 0
WHERE id = (SELECT api_key_id FROM sso_identities WHERE oid = '<entra-oid>');
```

Removing a user from every mapped Entra group has the same effect on their next
token refresh.

---

## Failure reference

| Code                         | Status | Cause                                                                              |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `AUTH_SSO_DISABLED`          | 401    | SSO is off or incompletely configured.                                             |
| `AUTH_SSO_EXPIRED`           | 401    | Token past `exp`. Re-run `login` if refresh also failed.                           |
| `AUTH_SSO_INVALID`           | 401    | Signature did not verify against the tenant JWKS.                                  |
| `AUTH_SSO_CLAIM`             | 401    | Wrong `iss` or `aud` — usually a mismatched `entraApiAudience`.                    |
| `AUTH_SSO_TENANT`            | 401    | Token's `tid` is not the configured tenant.                                        |
| `AUTH_SSO_NO_SUBJECT`        | 401    | Token carries no `oid`.                                                            |
| `AUTH_SSO_NO_GROUP`          | 403    | No mapped group matched and no default is set.                                     |
| `AUTH_SSO_GROUP_OVERAGE`     | 403    | User is in >150 groups and the Graph fallback is off.                              |
| `AUTH_SSO_GRAPH_UNAVAILABLE` | 503    | Graph lookup failed.                                                               |
| `AUTH_SSO_DEACTIVATED`       | 403    | Shadow key was deactivated on the gateway.                                         |
| `AUTH_SSO_UNAVAILABLE`       | 503    | JWKS fetch failed — OmniRoute could not verify, so this is deliberately not a 401. |
| `AUTH_SSO_PROVISION_FAILED`  | 503    | Shadow key could not be created.                                                   |

An Entra outage never degrades to anonymous access, and never falls through to
the API-key path: a bearer that presents itself as an Entra token gets a final
verdict from the SSO branch.

---

## Design notes

**Why `tid` is checked separately from `aud`.** A multi-tenant app registration
mints tokens carrying our audience for other tenants' users too. Pinning `tid`
is what makes this a single-tenant gate.

**Why the SSO branch must resolve before `x-api-key`.** Claude Code sends the
`apiKeyHelper` value in _both_ `Authorization: Bearer` and `x-api-key`. If
`extractUngatedClientApiKey()` won, the policy layer would receive the raw JWT,
resolve it to no key, and silently drop every limit the user is under — the same
auth-vs-policy divergence as GHSA-2phc-xp22-9f56. `resolveSsoApiKeySecret()`
therefore comes first in the chain in `src/shared/utils/apiKeyPolicy.ts`.

**Why verdicts are cached.** Verifying a signature is cheap once jose holds the
JWKS, but re-resolving groups and reconciling `key_group_members` per request
would mean a SQLite write per prompt per user. The cache in
`src/server/authz/entra/evaluate.ts` collapses that to roughly once per user per
helper refresh, and never outlives the token's own `exp`.
