---
title: "Plugin Marketplace"
version: 3.8.24
lastUpdated: 2026-06-13
---

# Plugin Marketplace

> **Source of truth:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, and
> `src/app/(dashboard)/dashboard/plugins/`
> **Last updated:** 2026-06-13 — v3.8.24

OmniRoute ships a WordPress-style plugin system. Plugins are self-contained
directories — each with a `plugin.json` manifest and an entry file — that hook
into the request pipeline (`onRequest` / `onResponse` / `onError`) and into
lifecycle events (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

The **Plugin Marketplace** is the discovery layer on top of that system. It
exposes a browsable catalog of installable plugins. By default the catalog is a
small built-in seed registry; an operator can point it at a custom remote
registry URL, in which case the fetch is hardened by a DNS-resolving SSRF guard
(see [Security](#security)).

Every plugin route is **loopback-only** (Tier 1 — `LOCAL_ONLY`): plugins load
and execute code in child processes, so the routes are unreachable from a
non-loopback origin regardless of auth. See
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## How It Fits Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Registry layer** — `src/lib/plugins/marketplace.ts`: lists / searches the
  catalog, falling back to the seed registry on any failure.
- **Lifecycle layer** — `src/lib/plugins/manager.ts` (`pluginManager` singleton):
  install, upgrade, activate, deactivate, uninstall, scan, startup load.
- **Manifest layer** — `src/lib/plugins/manifest.ts`: Zod schema + defaults for
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: discovers plugins on disk under
  the plugin directory.
- **Loader** — `src/lib/plugins/loader.ts`: spawns each plugin in an isolated
  child process and brokers hook calls over IPC.

## Marketplace Catalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returns a list of
`MarketplaceEntry` objects:

| Field         | Type     | Notes                                |
| ------------- | -------- | ------------------------------------ |
| `name`        | string   | kebab-case plugin name               |
| `version`     | string   | semver                               |
| `description` | string   | Short summary                        |
| `author`      | string   | Author / org                         |
| `license`     | string   | SPDX-style license id                |
| `downloadUrl` | string   | Source download URL (may be empty)   |
| `repository`  | string?  | Optional repository URL              |
| `tags`        | string[] | Search/filter tags                   |
| `downloads`   | number   | Download count                       |
| `rating`      | number   | 0–5                                  |
| `verified`    | boolean  | Whether the entry is marked verified |
| `lastUpdated` | string   | ISO-ish date string                  |

When no custom registry URL is configured, the catalog is the built-in
`SEED_REGISTRY` (currently `request-logger`, `rate-limiter`, `cost-tracker`, and
`theme-manager`). The seed registry is always available — if a configured remote
registry is unreachable, returns a non-`200` status, or returns an unrecognized
body, `listMarketplacePlugins()` logs a warning and falls back to the seed list.

> Note: the marketplace **catalog** (browse/search) is wired end to end, but
> one-click marketplace **install** from the catalog is not yet implemented — the
> dashboard's "Install" button on a marketplace entry currently shows a
> "coming soon" notice. Installation today goes through the local-path install
> flow (`POST /api/plugins`) and on-disk discovery (`POST /api/plugins/scan`).

## REST API

All endpoints require management auth (`requireManagementAuth`) **and** are
loopback-only — `/api/plugins` and `/api/plugins/` are listed in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Method | Description                                         |
| -------------------------------- | ------ | --------------------------------------------------- |
| `/api/plugins`                   | GET    | List installed plugins (optional `?status=` filter) |
| `/api/plugins`                   | POST   | Install a plugin from an absolute local path        |
| `/api/plugins/scan`              | POST   | Scan the plugin directory and register new plugins  |
| `/api/plugins/marketplace`       | GET    | List marketplace catalog entries                    |
| `/api/plugins/[name]`            | GET    | Get installed plugin details                        |
| `/api/plugins/[name]`            | DELETE | Uninstall a plugin                                  |
| `/api/plugins/[name]/activate`   | POST   | Activate (load + register hooks)                    |
| `/api/plugins/[name]/deactivate` | POST   | Deactivate (fire `onDeactivate`, unregister hooks)  |
| `/api/plugins/[name]/config`     | GET    | Get plugin config + config schema                   |
| `/api/plugins/[name]/config`     | PUT    | Update plugin config (validated against schema)     |

The `GET /api/plugins` `status` filter accepts one of
`installed` / `active` / `inactive` / `error`. An invalid value returns `400`.

### List installed plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Install from a local path

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

The `path` must be **absolute** and may not contain `..` traversal segments or
null bytes (enforced by Zod). The source directory must contain a valid
`plugin.json` (or be a parent of one). On success the response is `201` with the
installed plugin row.

### Browse the marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Update plugin config

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validates each provided value against the plugin's
`configSchema` (declared in the manifest): `number` fields honor `min`/`max`,
`select` fields must match the declared `enum`. Keys not present in the schema
are allowed through.

## Configuration

### Plugin directory

Plugins live under the OmniRoute data directory:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (or whatever manifest.main points to)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) resolves this to
`<home>/.omniroute/plugins`, where `<home>` is taken from the `HOME` /
`USERPROFILE` environment variables. `POST /api/plugins/scan` discovers any
subdirectory there that holds a valid `plugin.json` and registers it.

### Custom marketplace registry URL

The marketplace catalog source is read from the `pluginMarketplaceUrl` setting
(`src/lib/plugins/marketplace.ts` reads `settings.pluginMarketplaceUrl`). When
set to an `http(s)` URL, `listMarketplacePlugins()` fetches that URL and accepts
either a top-level JSON array of entries or an object with a `plugins` array;
entries without a string `name` are filtered out. When unset (or when the fetch
fails the SSRF guard / returns a bad response), the built-in seed registry is
used.

The dashboard "Marketplace" tab exposes a field for this URL (read back from
`GET /api/settings`).

> Implementation note: the dashboard "Save" action sends
> `pluginMarketplaceUrl` to `PATCH /api/settings`. At the time of writing this
> key is not declared in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), so verify persistence in your
> release before relying on it — the **read** path (`getSettings()` →
> `listMarketplacePlugins()`) honors the key once it is present in the settings
> store.

## Security

### Route tier — loopback only

Plugins execute code in spawned child processes, so the entire `/api/plugins`
surface is classified `LOCAL_ONLY` (Tier 1). Loopback enforcement runs
unconditionally **before** any auth check, so a leaked management token reaching
the box over a tunnel still cannot install, activate, or uninstall a plugin.
See [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) and
Hard Rules #15 / #17.

### Marketplace registry SSRF guard

A custom registry URL is attacker-influenceable configuration, so before
fetching it `listMarketplacePlugins()` runs it through two layers:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejects anything that is not `http:` / `https:`.
   - Rejects literal private/loopback/link-local/ULA hosts (IPv4 **and** IPv6,
     including IPv4-mapped) via the canonical `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Resolves **both** `A` and `AAAA` records and rejects if **any** resolved
     address is private — closing the public-hostname → private-IP bypass.
   - **Fails closed**: a DNS resolution failure rejects the URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): re-applies the public-only URL
   guard at fetch time and **blocks redirects** (no public → private `30x`
   pivot).

A URL that fails either layer does not abort the request — the marketplace
silently falls back to the built-in seed registry and logs a warning.

> This guard was hardened in PR #3774 specifically to resolve A + AAAA and use
> the canonical `isPrivateHost` instead of an IPv4-only check.

### Plugin execution isolation

- **Process isolation** — `loadPlugin()` (`src/lib/plugins/loader.ts`) spawns
  each plugin in a separate Node.js child process and communicates over IPC.
  Hook calls have a timeout with `SIGTERM` → `SIGKILL` escalation.
- **Env allowlist** — the child receives only an allowlisted set of environment
  variables; the broader set is only granted when the manifest requests the
  `env` permission.
- **Path containment** — install/upgrade/uninstall assert that the plugin
  directory and `manifest.main` resolve **within** the managed plugin root
  before any copy or recursive delete (guards against tampered DB paths and
  `../` traversal in `manifest.main`). Activation resolves symlinks via
  `realpath` and refuses to load an entry point that escapes the plugin
  directory.
- **Optional integrity pin** — a manifest may declare an `integrity`
  (`sha256-<base64>`, SRI format) field. When present, the loader verifies the
  entry file hash at load time and refuses to activate on mismatch. It is
  opt-in tamper-detection, **not** a security boundary — loopback-only routing
  and the permission model are the real boundaries.

## Manifest (`plugin.json`)

Validated by `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Field              | Type      | Notes                                                       |
| ------------------ | --------- | ----------------------------------------------------------- |
| `name`             | string    | Required; kebab-case (`^[a-z0-9-]+$`), 1–100 chars          |
| `version`          | string    | Required; semver (`MAJOR.MINOR.PATCH`)                      |
| `description`      | string?   | ≤ 500 chars                                                 |
| `author`           | string?   | ≤ 200 chars                                                 |
| `license`          | string?   | Defaults to `MIT`                                           |
| `main`             | string?   | Entry file; defaults to `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace` (defaults to `local`)              |
| `tags`             | string[]? | Search tags                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                             |
| `hooks`            | object?   | Booleans declaring which hooks the plugin implements        |
| `skills`           | object[]? | Optional skill definitions                                  |
| `enabledByDefault` | boolean?  | Auto-activate on install                                    |
| `configSchema`     | object?   | Map of config fields (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Optional `sha256-<base64>` entry-file pin                   |

Permissions are drawn from the enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Lifecycle Flow

```
install (POST /api/plugins, path)
  → scan/validate manifest → copy to staging → assert main within dir
  → atomic rename into ~/.omniroute/plugins/<name> → insert DB row
  → fire onInstall → if enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → realpath containment check → loadPlugin() (spawn child process)
  → register declared hooks → status = "active" → fire onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → fire onDeactivate (BEFORE unregister) → unregister hooks
  → kill child process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate if active → fire onUninstall
  → containment-checked recursive delete of plugin dir → delete DB row
```

Re-running `install` against a directory whose manifest version is **strictly
newer** than the installed version auto-upgrades (clean reinstall; config resets
to defaults). A same-or-older version is rejected.

## Database

Table `plugins` (migration `076_create_plugins.sql`):

| Column          | Type    | Notes                                            |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | Unique                                           |
| `version`       | TEXT    | semver; default `1.0.0`                          |
| `description`   | TEXT    | Optional                                         |
| `author`        | TEXT    | Optional                                         |
| `license`       | TEXT    | Default `MIT`                                    |
| `main`          | TEXT    | Entry file; default `index.js`                   |
| `source`        | TEXT    | Default `local`                                  |
| `tags`          | TEXT    | JSON array; default `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; default 0                                   |
| `manifest`      | TEXT    | Full manifest JSON                               |
| `config`        | TEXT    | JSON; default `{}`                               |
| `config_schema` | TEXT    | JSON; default `{}`                               |
| `hooks`         | TEXT    | JSON array of declared hook names; default `[]`  |
| `permissions`   | TEXT    | JSON array; default `[]`                         |
| `plugin_dir`    | TEXT    | Absolute install directory                       |
| `error_message` | TEXT    | Set when `status = "error"`                      |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | Set on activation                                |

Plugin metrics/analytics are tracked in additional tables
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

The dashboard page at `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) provides two tabs:

- **Installed** — lists installed plugins with their declared hooks, an
  activate/deactivate toggle, an uninstall button, and a "Scan for plugins"
  action (`POST /api/plugins/scan`).
- **Marketplace** — shows the catalog from `GET /api/plugins/marketplace` with a
  field to set the custom registry URL.

A per-plugin config page lives at `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## See Also

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  why `/api/plugins` is loopback-only (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — the related skills framework
  (`src/lib/skills/`); plugins may declare skills in their manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — event-driven outbound
  integrations
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  the `buildErrorBody()` pattern every plugin route uses for error responses
