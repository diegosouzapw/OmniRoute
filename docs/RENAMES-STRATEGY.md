# Renames strategy — `ArgisMonitor` (this fork)

> **Status (Gate 1, additive-only):** publish-surface renamed; internals
> preserved verbatim; legacy shims active. This document is the binding
> reference for every identifier category and its migration order.
>
> Companion docs: [`FORK.md`](./FORK.md) (provenance, AI-DD notice),
> [`PUBLISHING.md`](./PUBLISHING.md) (registry matrix),
> [`UPDATE-STRATEGY.md`](./UPDATE-STRATEGY.md) (upgrade flow),
> [`DEV-CLI.md`](./DEV-CLI.md) (developer CLI).

---

## 1. Why additive, not hard

A hard `omniroute → argismonitor` find-replace across `src/` would
generate hundreds of merge conflicts on every upstream rebase from
`diegosouzapw/OmniRoute`. This fork stays mergeable by flipping only
the **publish surface** (package names, bins, repo URLs, workflow file
names) and keeping every internal identifier verbatim with shim
back-compat. Internal identifiers are migrated per the schedule in §6.

## 2. Identifier categories

| # | Category | Old name | New name | Mapped in gate | Status |
|---|----------|----------|----------|----------------|--------|
| 1 | npm package (root) | `omniroute` | `argismonitor` | Gate 1 | Done |
| 2 | npm package (opencode-plugin) | `@omniroute/opencode-plugin` | `@argismonitor/opencode-plugin` | Gate 1 | Done |
| 3 | npm package (opencode-provider) | `@omniroute/opencode-provider` | `@argismonitor/opencode-provider` | Gate 1 | Done |
| 4 | npm package (open-sse) | `@omniroute/open-sse` | `@argismonitor/open-sse` | Gate 1 | Done |
| 5 | npm package (electron / desktop) | `omniroute-desktop` / `@phenotype/desktop-shell` | `argismonitor-desktop` / `@argismonitor/desktop-shell` | Gate 1 | Done |
| 6 | npm package (management-console) | `omniroute-management-console` | `argismonitor-management-console` | Gate 1 | Done |
| 7 | npm package (GitHub Packages org) | `@diegosouzapw/omniroute` | `@kooshapari/argismonitor` | Gate 1 | Done |
| 8 | Bin / CLI command | `omniroute` | `argismonitor` | Gate 1 | Done (with legacy shim) |
| 9 | Default data dir | `~/.omniroute/` | `~/.argismonitor/` (legacy still honored) | Gate 1 | Done |
| 10 | Workflow file | `npm-publish.yml` | `argismonitor-publish.yml` | Gate 1 | Done (old kept) |
| 11 | Env vars (`OMNIROUTE_*`) | preserved | unchanged | Gate 1 | Done (legacy) |
| 12 | Class / type names in `src/` | preserved | unchanged | Future | Untouched |
| 13 | File paths under `src/` | preserved | unchanged | Future | Untouched |
| 14 | DB schema names | preserved | unchanged | Future | Untouched |
| 15 | Internal config keys | preserved | unchanged | Future | Untouched |
| 16 | Domain `omniroute.online` (upstream) | preserved | unchanged | n/a | Out of scope (upstream) |
| 17 | Domain `argismonitor.phenotype.space` (this fork) | new | added | Gate 6 | Pending |
| 18 | Domain `argismonitor.pheno.studio` (this fork) | new | added | Gate 6 | Pending |
| 19 | Cargo / crate name (none — Node-only) | n/a | n/a | n/a | n/a |
| 20 | NuGet package (future) | n/a | n/a | n/a | n/a |

## 3. Legacy shim layer (active from Gate 1)

### 3.1 Binary

- **Canonical**: `argismonitor` (in `bin/argismonitor.mjs`, exported
  via `package.json` `bin.argismonitor`).
- **Legacy**: `omniroute` (in `bin/omniroute.mjs`). On invocation:
  - Prints a one-time deprecation notice to stderr (silence with
    `OMNIROUTE_LEGACY=1`).
  - Forwards every argv to `argismonitor.mjs` via `node spawn`.
  - Honors `--mcp` and `reset-encrypted-columns` because the forwarded
    process runs the same entry point.

### 3.2 Data dir

- **Canonical**: `~/.argismonitor/`.
- **Legacy**: `~/.omniroute/` (still discovered and upgraded by
  `argismonitor` CLI; data is *not* migrated automatically — it remains
  readable in place to avoid risk on upgrade).
- **Migration**: a future `argismortex migrate data-dir` command will
  offer a one-shot move (Gate 7).

### 3.3 npm deprecation pointer

- The legacy `omniroute` npm package, when first publish-side-deploy
  happens, will be marked deprecated with a pointer to `argismonitor`:

  ```bash
  npm deprecate omniroute@* \
    "ArgisMonitor has been renamed; install argismonitor instead. See https://argismonitor.phenotype.space/migration."
  ```

## 4. New artifacts added in Gate 1

| Path | Purpose |
|------|---------|
| `bin/argismonitor.mjs` | Canonical CLI entry point (renamed clone of upstream). |
| `bin/omniroute.mjs` | Deprecation shim forwarding to `argismonitor.mjs`. |
| `package.json` `bin` | `{ "argismonitor": "bin/argismonitor.mjs", "omniroute": "bin/omniroute.mjs" }`. |
| `package.json` `name` | `argismonitor`. |
| `package.json` `homepage` | `https://argismonitor.phenotype.space`. |
| `package.json` `repository.url` | `git+https://github.com/KooshaPari/ArgisMonitor.git`. |
| `package.json` `author` | `KooshaPari / Phenotype.`. |
| `.github/workflows/argismonitor-publish.yml` | New publish workflow (additive; old `npm-publish.yml` kept). |
| `docs/FORK.md` | Provenance, AI-DD notice, fork differences. |
| `docs/NOTICE.md` | License + trademark attributions. |
| `docs/RENAMES-STRATEGY.md` | This document. |

## 5. Diff stats (Gate 1)

Counts of files modified / added in the `renames/argismonitor` branch
versus `origin/main`:

```
modified:  package.json                                    (publish surface)
modified:  open-sse/package.json                           (publish surface)
modified:  @omniroute/opencode-plugin/package.json         (publish surface)
modified:  @omniroute/opencode-provider/package.json       (publish surface)
modified:  electron/package.json                           (publish surface)
modified:  management-console/package.json                 (publish surface)
modified:  desktop-electrobun/package.json                 (publish surface)
modified:  bin/argismonitor.mjs                            (new entry point; was bin/omniroute.mjs)
modified:  bin/omniroute.mjs                               (deprecation shim, rewritten)
added:     .github/workflows/argismonitor-publish.yml      (publish workflow)
added:     docs/FORK.md                                    (provenance, AI-DD)
added:     docs/NOTICE.md                                  (license/trademark)
added:     docs/RENAMES-STRATEGY.md                        (this doc)
```

(Internal `src/` directories are intentionally NOT touched in Gate 1 —
this is the additive-rename policy.)

## 6. Future gates — internal-identifier migration plan

When this fork stops pulling from upstream (decision criterion: when the
AI-DD divergence produces >50% non-trivial fork surface), the internal
identifiers flip in this order:

1. **Internal config keys** (`OMNIROUTE_*` env vars → `ARGIS_*`). Add
   read-side aliases; emit warning when legacy value is set.
2. **File paths under `src/`** (e.g., `src/lib/omniroute/` →
   `src/lib/argismonitor/`). Path aliases for one minor.
3. **Class / type names** (`OmniRouteConfig` → `ArgisMonitorConfig`).
   Type aliases for one minor.
4. **DB schema names** (`omniroute_*` tables → `argismonitor_*`). New
   columns added; legacy columns mirrored; read-side decides which to
   prefer via feature flag.
5. **Internal package names** (`@omniroute/*` → `@argismonitor/*`)
   only after the deprecation window closes.

This sequence keeps every gate independently shippable and reversible.

## 7. End-of-life criteria for legacy aliases

The `omniroute` binary shim, the `~/.omniroute/` data-dir alias, and
the `OMNIROUTE_*` env-var read-aliase are removed when **all** of:

- 6 months have passed since the first `argismonitor@1.0.0` GA release,
  AND
- upstream `diegosouzapw/OmniRoute` has not received a meaningful
  rebase in that window (decision criterion: <5 merges from upstream
  per month), AND
- no open issue on `KooshaPari/ArgisMonitor` references a blocking
  legacy-identifier problem, AND
- telemetry shows <1% of invocations use legacy identifiers.

Tracked in [`TECH_DEBT.md`](./TECH_DEBT.md) § "Legacy aliases".

## 8. Reference

- Upstream: <https://github.com/diegosouzapw/OmniRoute>
- This fork: <https://github.com/KooshaPari/OmniRoute>
- Future canonical: <https://github.com/KooshaPari/ArgisMonitor>
- Domain: <https://argismonitor.phenotype.space>