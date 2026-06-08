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

The local seed registry ships with **3 verified plugins** maintained by the OmniRoute team:

| Plugin | Tags | Description |
|--------|------|-------------|
| `request-logger` | logging, debugging | Logs all requests and responses with timing |
| `rate-limiter` | rate-limit, security | Per-model rate limiting with sliding window |
| `cost-tracker` | analytics, cost | Track token costs per request and per model |

All three are `verified: true` and `license: MIT`.

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
  name: string;           // e.g. "request-logger"
  version: string;        // e.g. "1.0.0"
  description: string;    // human-readable summary
  author: string;         // e.g. "omniroute", "your-name"
  license: string;        // SPDX license ID, e.g. "MIT"
  downloadUrl: string;    // URL to download the package
  repository?: string;    // optional source repo URL
  tags: string[];         // search tags
  downloads: number;      // total install count
  rating: number;         // 0-5 star average
  verified: boolean;      // official verification flag
  lastUpdated: string;    // ISO date of last release
}
```

### Field Semantics

| Field | Required | Notes |
|-------|----------|-------|
| `name` | ✅ yes | Must be unique, kebab-case, match the plugin's `plugin.json` |
| `version` | ✅ yes | SemVer string |
| `description` | ✅ yes | One-line summary shown in lists |
| `author` | ✅ yes | Display name or org |
| `license` | ✅ yes | SPDX identifier (MIT, Apache-2.0, GPL-3.0, etc.) |
| `downloadUrl` | ✅ yes | URL to the package tarball/zip |
| `repository` | ❌ no | Source code URL (recommended) |
| `tags` | ✅ yes | At least 1 tag for search |
| `downloads` | ✅ yes | Cumulative install count |
| `rating` | ✅ yes | 0.0 to 5.0, one decimal place |
| `verified` | ✅ yes | True if published by OmniRoute team or signed by trusted author |
| `lastUpdated` | ✅ yes | ISO 8601 date string |

---

## CLI Commands

The marketplace is exposed through the `omniroute plugin` command group:

```bash
# List all available plugins in the marketplace
omniroute plugin search

# Search by query
omniroute plugin search logging
omniroute plugin search security
omniroute plugin search analytics

# Show details for a specific plugin
omniroute plugin info request-logger

# Install a plugin from the marketplace
omniroute plugin install request-logger
```

### Example Workflow

```bash
$ omniroute plugin search logging
NAME                VERSION  RATING  TAGS              VERIFIED
request-logger      1.0.0    5.0★    logging,debug     yes

$ omniroute plugin info request-logger
Name:        request-logger
Version:     1.0.0
Author:      omniroute
License:     MIT
Description: Logs all requests and responses with timing
Tags:        logging, debugging
Downloads:   1,234
Rating:      5.0 / 5
Verified:    yes
Last update: 2026-05-29
Repository:  https://github.com/diegosouzapw/OmniRoute-plugins

$ omniroute plugin install request-logger
Installing request-logger@1.0.0... done.
Plugin activated. Hooks: onRequest, onResponse
```

---

## Discovering Plugins

### Tag-Based Discovery

Common tags used in the registry:

| Tag | What it covers |
|-----|----------------|
| `logging` | Request/response logging, audit trails |
| `debugging` | Inspection, tracing, dev tools |
| `rate-limit` | Throttling, quota enforcement |
| `security` | Auth, IP filtering, PII masking |
| `analytics` | Usage tracking, cost monitoring |
| `cost` | Token pricing, budget guards |
| `transform` | Request/response rewriting |
| `cache` | Response caching, memoization |
| `provider` | Custom provider integrations |
| `combo` | Combo routing customizations |

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

```bash
# Once the remote registry is live
omniroute plugin publish \
  --tarball ./my-plugin-1.0.0.tar.gz \
  --signature ./my-plugin-1.0.0.sig \
  --public-key ./author-pubkey.der
```

The registry will:
1. Verify the signature against your public key
2. Run automated security scans (sandbox, no `eval`, no shell exec without permission)
3. Validate the manifest against the schema
4. Publish the entry with `verified: false` initially
5. Grant `verified: true` after a manual review window (typically 3-5 days)

### 4. Versioning and Updates

- Bump the version in `plugin.json` and `package.json`
- Update `CHANGELOG.md`
- Re-submit with the new tarball
- Users will be notified of available updates

### 5. Ratings and Trust

Users can rate installed plugins 1-5 stars. The aggregate rating is shown in the marketplace. Plugins with consistently low ratings may be flagged for review.

---

## Verified Plugins

The `verified: true` flag means the plugin is published by the **OmniRoute team** or by an author whose public key has been added to the trusted set.

| Plugin | Author | Verified | License | Description |
|--------|--------|----------|---------|-------------|
| `request-logger` | omniroute | ✅ | MIT | Logs all requests and responses with timing |
| `rate-limiter` | omniroute | ✅ | MIT | Per-model rate limiting with sliding window |
| `cost-tracker` | omniroute | ✅ | MIT | Track token costs per request and per model |

When the remote registry launches, third-party authors can apply for verification by:
1. Maintaining a public source repository
2. Signing all releases
3. Demonstrating active maintenance
4. Passing a security review

---

## Ratings and Trust

### Current State (Phase 1)

- All 3 seed plugins have `rating: 5` (set by the OmniRoute team)
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

| Field | Phase 1 (now) | Phase 2 (future) |
|-------|---------------|------------------|
| `downloadUrl` | Empty string for seed entries | Real tarball URLs |
| `downloads` | 0 for seed entries | Cumulative real count |
| `rating` | 5.0 for seed entries | Aggregated user ratings |
| `verified` | Always `true` for seed | Computed from signature + author |
| `lastUpdated` | Release date | Auto-updated on new version |

**No breaking changes** are planned for the public API. New fields may be added.

---

## Source Code Reference

| File | Lines | Purpose |
|------|-------|---------|
| `src/lib/plugins/marketplace.ts` | 107 | Marketplace data + API |
| `src/lib/plugins/manager.ts` | 410+ | Install/activate/deactivate lifecycle |
| `src/lib/plugins/loader.ts` | 280+ | Plugin loading and validation |
| `src/lib/plugins/manifest.ts` | 200+ | Manifest schema validation |
| `src/lib/plugins/signing.ts` | 34 | SHA-256 + Ed25519 verification |

---

## What's Next?

- **[Plugin SDK Reference](./PLUGIN_SDK.md)** — Full API surface, manifest schema, built-in events
- **[Plugin Development Guide](./PLUGIN_DEVELOPMENT.md)** — Dev mode, testing, doctor, lifecycle
- **[Phase 2 Roadmap](#)** — Remote registry with ratings, downloads, signing (coming soon)
