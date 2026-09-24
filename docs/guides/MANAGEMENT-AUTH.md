---
title: "Management Authentication"
version: 3.8.50
lastUpdated: 2026-09-22
---

# Management Authentication

OmniRoute has **four credential families** that can authorize management routes.
They are not interchangeable. Inference API keys (`sk-…`) do **not** manage the
server unless they were explicitly granted `manage` or `admin` scope.

Canonical implementation: `src/lib/api/requireManagementAuth.ts`.

| Credential            | Typical form                        | Created where                                       | Intended use                  | Management capability                                                                  |
| --------------------- | ----------------------------------- | --------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| Dashboard JWT session | `auth_token` cookie                 | Dashboard login                                     | Browser UI                    | Full dashboard management, subject to CSRF, locality, and always-protected-route rules |
| CLI machine-id token  | internal / local                    | CLI bootstrap (`omniroute` on the same machine)     | Local CLI                     | Local management only                                                                  |
| Scoped Access Token   | `oma_live_…`                        | **Settings → Access Tokens** or `omniroute connect` | Remote CLI and management API | Must satisfy the route's required `read`, `write`, or `admin` scope                    |
| Inference API key     | `sk-…` (and other API-key prefixes) | **API Manager / API Keys**                          | `/v1/*` inference             | **None** unless the key metadata includes `manage` or `admin`                          |

`oma_` credentials are management/CLI credentials. They are **not** inference API keys.

If login/API-key auth is disabled for the server, some management routes may
accept unauthenticated calls. Local-only and always-protected routes still apply
their own rules. Presenting one of these credentials is therefore not universally
mandatory, and possessing one is not universally sufficient without the required
scope and route locality.

Related: [Remote Mode](./REMOTE-MODE.md) (how `oma_live_…` is minted for a remote CLI).

---

## Scope matrices

API-key management scopes and access-token scopes are different vocabularies.
MCP tool scopes are a third vocabulary, checked with `scopeMatches` rather than
either function in the tables below. Side-by-side:
[Three scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Access Token scopes (`oma_live_…`)

| Scope   | Typical operations                                                 |
| ------- | ------------------------------------------------------------------ |
| `read`  | List/status GETs that the token is allowed to see                  |
| `write` | Mutations (create/update/delete) below admin                       |
| `admin` | Full remote CLI / connect token (password bootstrap defaults here) |

A token with `read` cannot call a `write` route. Runtime message shape:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key management scopes

| Scope    | Meaning                                                              |
| -------- | -------------------------------------------------------------------- |
| (none)   | Inference only. Management routes return 403.                        |
| `manage` | Management API (same gate as `requireManagementAuth` API-key branch) |
| `admin`  | Also satisfies `hasManageScope` (treated as management-capable)      |

Enable `manage` on the key in the API Keys / API Manager UI. Do not reuse a
chat client key for automation unless you deliberately granted that scope.

---

## How to create and revoke

### Dashboard JWT session

1. Open `/login`, sign in with the management password (`INITIAL_PASSWORD` on first boot).
2. Cookie `auth_token` is HttpOnly. Browser dashboard uses it automatically.
3. Log out via `/api/auth/logout`. There is no long-lived secret to copy.

### CLI machine-id token

1. Run `omniroute` on the **same host** as the server (loopback).
2. The CLI bootstraps a machine-id token under `~/.omniroute/` (chmod 600).
3. This does **not** work from another machine. Use an Access Token for remote CLI.

### Scoped Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → create (name + scope). **The secret is shown once.**
2. Or CLI: `omniroute connect <host>` (password → token). See [Remote Mode](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Revoke from the same Access Tokens page (or delete the CLI context).
5. Server stores only a hash. Treat the plaintext like a password.

### Manage-scoped API key

1. Dashboard: **API Manager / API Keys** → create or edit a key → enable `manage` (or `admin`).
2. Header: `Authorization: Bearer sk-…` (the key's actual prefix).
3. Revoke or strip `manage` in the same UI.
4. Least privilege for automation that is not the CLI: prefer a `read` Access Token for GET-only jobs; use `manage` on an API key only when the caller must also speak `/v1` and management.

---

## Header format

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Do not put management credentials in the URL path or query string. Management
auth is header/cookie only.

---

## Copy-paste examples

Read-only (list providers). Use a `read` Access Token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modifying (create a provider connection). Use `write`/`admin` Access Token or a
manage-scoped API key:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (not management). Ordinary API key, no `manage` required:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Current runtime errors (do not echo secrets)

| Situation                                      | Typical status | Message (sanitized)                                                  |
| ---------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| No credential                                  | 401            | `Authentication required`                                            |
| Invalid/expired `oma_live_…`                   | 401            | `Invalid or expired access token`                                    |
| Valid API key without `manage`/`admin`         | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Invalid ordinary API key on a management route | 403            | `Invalid management token`                                           |
| Access Token scope too low                     | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" means the bearer was **not** accepted as a management
credential. It does **not** tell you which family to mint. Use the table above:
inference keys need `manage` scope; remote CLI needs `oma_live_…`; the dashboard
uses the session cookie.

---

## Recommended least-privilege choice

| Caller                                     | Use                                             |
| ------------------------------------------ | ----------------------------------------------- |
| Browser                                    | Dashboard session                               |
| CLI on the server host                     | Machine token                                   |
| CLI on a laptop talking to a remote server | `oma_live_…` from `omniroute connect`           |
| CI / scripts (management only)             | `oma_live_…` with the smallest scope that works |
| CI that must call both `/v1` and `/api`    | API key with `manage` **or** two credentials    |
