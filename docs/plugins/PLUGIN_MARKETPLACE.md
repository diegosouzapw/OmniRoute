---
title: "Plugin Marketplace"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Plugin Marketplace

> **TL;DR**: The marketplace is a curated registry of OmniRoute plugins. In **Phase 1** (current), it's a local seed registry. **Phase 2** will introduce a remote registry with ratings, downloads, and signature verification.

**Source:** `src/lib/plugins/marketplace.ts`

---

## Architecture

```
┌────────────────────────────────────────────┐
│            Marketplace API                 │
│  (listMarketplacePlugins, searchMarketplace│
│   getMarketplaceEntry)                     │
└────────────────┬───────────────────────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
   Phase 1              Phase 2 (planned)
   ───────              ───────────────
   Local seed           Remote registry
   registry             with ratings,
   (3 entries)          downloads, signed
                        packages
```

### Phase 1: Local Seed Registry (v3.8.16+)

The local seed registry ships with **4 verified plugins** maintained by the OmniRoute team:

| Plugin           | Tags                          | Description                                            |
| ---------------- | ----------------------------- | ------------------------------------------------------ |
| `request-logger` | logging, debugging            | Logs all requests and responses with timing            |
| `rate-limiter`   | rate-limit, security          | Per-model rate limiting with sliding window            |
| `cost-tracker`   | analytics, cost               | Track token costs per request and per model            |
| `theme-manager`  | theme, ui, css, customization | Dynamic UI theme management via CSS variable injection |

All four are `verified: true` and `license: MIT`.

### Phase 2: Remote Registry (Planned)

The remote registry will add:

- **Author submissions** — anyone can publish a plugin
- **Ratings** — 0-5 stars from user reviews
- **Downloads** — install count
- **Signature verification** — Ed25519 signatures ensure authenticity
- **Search by tag, author, license**

---

## API Reference

All marketplace functions are exported from `omniroute/plugins/marketplace`.

### `listMarketplacePlugins()`

List all available plugins in the marketplace.

```ts
import { listMarketplacePlugins } from "omniroute/plugins/marketplace";

const plugins = listMarketplacePlugins();
for (const p of plugins) {
  console.log(`${p.name}@${p.version} — ${p.description} (${p.rating}★)`);
}
```

**Returns:** `MarketplaceEntry[]`

### `searchMarketplace(query)`

Search marketplace plugins by name, description, or tags.

```ts
import { searchMarketplace } from "omniroute/plugins/marketplace";

const loggingPlugins = searchMarketplace("logging");
const securityPlugins = searchMarketplace("security");
```

**Parameters:**

- `query` (string) — case-insensitive search string

**Returns:** `MarketplaceEntry[]` — matches where `name`, `description`, or any `tag` contains the query

### `getMarketplaceEntry(name)`

Get a specific marketplace entry by name.

```ts
import { getMarketplaceEntry } from "omniroute/plugins/marketplace";

const entry = getMarketplaceEntry("request-logger");
if (entry) {
  console.log(`Found: ${entry.name}@${entry.version}`);
}
```

**Parameters:**

- `name` (string) — exact plugin name

**Returns:** `MarketplaceEntry | undefined`

### `isMarketplaceAvailable()`

Check if the marketplace is reachable.

```ts
import { isMarketplaceAvailable } from "omniroute/plugins/marketplace";

if (isMarketplaceAvailable()) {
  console.log("Marketplace is online");
}
```

**Returns:** `boolean` — currently always `true` (local seed always available). Will reflect remote registry health in Phase 2.

---

## Data Model

### `MarketplaceEntry`

```ts
interface MarketplaceEntry {
  name: string; // e.g. "request-logger"
  version: string; // e.g. "1.0.0"
  description: string; // human-readable summary
  author: string; // e.g. "omniroute", "your-name"
  license: string; // SPDX license ID, e.g. "MIT"
  downloadUrl: string; // URL to download the package
  repository?: string; // optional source repo URL
  tags: string[]; // search tags
  downloads: number; // total install count
  rating: number; // 0-5 star average
  verified: boolean; // official verification flag
  lastUpdated: string; // ISO date of last release
}
```

### Field Semantics

| Field         | Required | Notes                                                           |
| ------------- | -------- | --------------------------------------------------------------- |
| `name`        | ✅ yes   | Must be unique, kebab-case, match the plugin's `plugin.json`    |
| `version`     | ✅ yes   | SemVer string                                                   |
| `description` | ✅ yes   | One-line summary shown in lists                                 |
| `author`      | ✅ yes   | Display name or org                                             |
| `license`     | ✅ yes   | SPDX identifier (MIT, Apache-2.0, GPL-3.0, etc.)                |
| `downloadUrl` | ✅ yes   | URL to the package tarball/zip                                  |
| `repository`  | ❌ no    | Source code URL (recommended)                                   |
| `tags`        | ✅ yes   | At least 1 tag for search                                       |
| `downloads`   | ✅ yes   | Cumulative install count                                        |
| `rating`      | ✅ yes   | 0.0 to 5.0, one decimal place                                   |
| `verified`    | ✅ yes   | True if published by OmniRoute team or signed by trusted author |
| `lastUpdated` | ✅ yes   | ISO 8601 date string                                            |

---

## Accessing the Marketplace

The SDK marketplace is accessible **programmatically** via the marketplace API (`src/lib/plugins/marketplace.ts`), not through the CLI.

### Programmatic Access

```ts
import { listMarketplacePlugins, searchMarketplace } from "omniroute/plugins/marketplace";

// List all seed plugins
const allPlugins = await listMarketplacePlugins();
console.log(allPlugins); // [request-logger, rate-limiter, cost-tracker, theme-manager]

// Search by tag
const loggingPlugins = await searchMarketplace({ tags: ["logging"] });
console.log(loggingPlugins); // [request-logger]

// Search by name
const tracker = await searchMarketplace({ query: "cost" });
console.log(tracker); // [cost-tracker]
```

### Note: CLI Plugin System is Separate

The CLI command `omniroute plugin search` searches npm for **CLI plugins** (packages named `omniroute-cmd-*`), not the SDK marketplace. These are two separate plugin systems:

- **SDK plugins** (this doc): Hook-based request/response interception. Managed via the marketplace API.
- **CLI plugins** (separate system): Command-line extensions. Searched and installed via npm.

---

## Discovering Plugins

### Tag-Based Discovery

Common tags used in the registry:

| Tag          | What it covers                         |
| ------------ | -------------------------------------- |
| `logging`    | Request/response logging, audit trails |
| `debugging`  | Inspection, tracing, dev tools         |
| `rate-limit` | Throttling, quota enforcement          |
| `security`   | Auth, IP filtering, PII masking        |
| `analytics`  | Usage tracking, cost monitoring        |
| `cost`       | Token pricing, budget guards           |
| `transform`  | Request/response rewriting             |
| `cache`      | Response caching, memoization          |
| `provider`   | Custom provider integrations           |
| `combo`      | Combo routing customizations           |

### Search Tips

- **Multi-word queries**: `search("rate limit")` matches `rate-limit` in tags (hyphen-normalized)
- **Tag-only search**: `search("analytics")` returns plugins tagged `analytics` OR `cost` (loose match)
- **Author search**: not supported in Phase 1; will be added in Phase 2

---

## Publishing a Plugin (Phase 2)

When the remote registry goes live, the publishing flow will be:

### 1. Prepare Your Plugin

- `plugin.json` manifest with all required fields
- Source code under `lib/` or `src/`
- Compiled entry point (`index.js` or `index.mjs`)
- `README.md` with usage examples
- `LICENSE` file
- `CHANGELOG.md` with version history

### 2. Generate a Signature (Optional but Recommended)

See [Plugin Signing & Verification](./PLUGIN_DEVELOPMENT.md#plugin-signing--verification) for the full signing workflow.

### 3. Submit to the Registry

> **⚠️ `omniroute plugin publish` does not exist.** `bin/cli/commands/plugin.mjs` exports the subcommands `list`, `install`, `remove` (alias `uninstall`), `info`, `search`, `update`, and `scaffold` — there is no `publish` command (`grep -n "publish" bin/cli/commands/plugin.mjs` returns nothing). The marketplace registry seeds are bundled with OmniRoute and have empty `downloadUrl`; a remote publishing flow is planned but not yet implemented. Plugin authors should distribute plugins through npm (the `omniroute plugin search` CLI queries the npm registry for `omniroute-cmd-*` packages) or via direct `git+https` URLs.

The current submission path is therefore:

```bash
# 1. Distribute as an npm package (the only registry wired into the CLI)
npm publish

# 2. Or, distribute via a git URL and install it locally:
omniroute plugin install git+https://github.com/<you>/<your-plugin>.git
```

### 4. Versioning and Updates

- Bump the version in `plugin.json` and `package.json`
- Update `CHANGELOG.md`
- Re-publish to npm (or push a new git tag)
- Users will pick up updates via `omniroute plugin update [name]`

### 5. Ratings and Trust

Users can rate installed plugins 1-5 stars. The aggregate rating is shown in the marketplace. Plugins with consistently low ratings may be flagged for review.

---

## Verified Plugins

The `verified: true` flag means the plugin is published by the **OmniRoute team** or by an author whose public key has been added to the trusted set.

| Plugin           | Author    | Verified | License | Description                                            |
| ---------------- | --------- | -------- | ------- | ------------------------------------------------------ |
| `request-logger` | omniroute | ✅       | MIT     | Logs all requests and responses with timing            |
| `rate-limiter`   | omniroute | ✅       | MIT     | Per-model rate limiting with sliding window            |
| `cost-tracker`   | omniroute | ✅       | MIT     | Track token costs per request and per model            |
| `theme-manager`  | omniroute | ✅       | MIT     | Dynamic UI theme management via CSS variable injection |

When the remote registry launches, third-party authors can apply for verification by:

1. Maintaining a public source repository
2. Signing all releases
3. Demonstrating active maintenance
4. Passing a security review

---

## Ratings and Trust

### Current State (Phase 1)

- Seed plugins have initial ratings set by the OmniRoute team: `request-logger: 5`, `rate-limiter: 5`, `cost-tracker: 4`, `theme-manager: 5`
- No user ratings yet
- All plugins are `verified: true` by definition

### Phase 2 Plan

- 1-5 star ratings from any user who installed the plugin
- Aggregate rating shown as `4.7★ (123 ratings)` style
- Trust tiers:
  - **`verified: true`** — published by OmniRoute team OR signature verified
  - **`verified: false`** — third-party plugin, not yet reviewed
  - **`flagged`** — under security review, not installable

### Quality Signals

The marketplace UI will surface:

- Star rating with count
- Download count
- Last update date
- "Verified" badge
- Author reputation (Phase 2)
- Compatibility with current OmniRoute version

---

## Migration Plan (Phase 1 → Phase 2)

The current `MarketplaceEntry` shape is designed to be forward-compatible:

| Field         | Phase 1 (now)                 | Phase 2 (future)                 |
| ------------- | ----------------------------- | -------------------------------- |
| `downloadUrl` | Empty string for seed entries | Real tarball URLs                |
| `downloads`   | 0 for seed entries            | Cumulative real count            |
| `rating`      | 5.0 for seed entries          | Aggregated user ratings          |
| `verified`    | Always `true` for seed        | Computed from signature + author |
| `lastUpdated` | Release date                  | Auto-updated on new version      |

**No breaking changes** are planned for the public API. New fields may be added.

---

## Source Code Reference

| File                             | Lines | Purpose                               |
| -------------------------------- | ----- | ------------------------------------- |
| `src/lib/plugins/marketplace.ts` | 107   | Marketplace data + API                |
| `src/lib/plugins/manager.ts`     | 410+  | Install/activate/deactivate lifecycle |
| `src/lib/plugins/loader.ts`      | 280+  | Plugin loading and validation         |
| `src/lib/plugins/manifest.ts`    | 200+  | Manifest schema validation            |
| `src/lib/plugins/signing.ts`     | 34    | SHA-256 + Ed25519 verification        |

---

## What's Next?

- **[Plugin SDK Reference](./PLUGIN_SDK.md)** — Full API surface, manifest schema, built-in events
- **[Plugin Development Guide](./PLUGIN_DEVELOPMENT.md)** — Dev mode, testing, doctor, lifecycle
- **[Phase 2 Roadmap](#)** — Remote registry with ratings, downloads, signing (coming soon)
