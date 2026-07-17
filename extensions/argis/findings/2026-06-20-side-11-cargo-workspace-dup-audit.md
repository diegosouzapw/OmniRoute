# Audit — Duplicate Cargo.toml Workspace Members (side-11)

**Date:** 2026-06-20 10:30 UTC
**Task ID:** side-11
**Agent:** orch-v11-real-research-8
**Verdict:** 0 duplicates at the meta-repo root. Per-crate `[workspace]` blocks are all distinct.

## What I ran
Inspected the meta-repo top-level `Cargo.toml` `[workspace].members` list and the per-crate workspace definitions of 8 pheno-* substrate crates. Goal: find any crate that lists another crate in its workspace while also appearing as a member of a parent workspace — a classic Rust anti-pattern that causes "circular workspace" errors at `cargo metadata` time.

## Findings
- **Meta-repo root `Cargo.toml`** — no `[workspace]` block, so no members to dup against. Top-level repos are independent crates, not a cargo workspace.
- **`pheno-otel`** — workspace with 1 member (`phenotype-port-adapter-otel`). Not a duplicate of anything in the meta-repo root.
- **`pheno-port-adapter`** — no `[workspace]` block; it's a leaf crate.
- **`pheno-tracing`** — no `[workspace]` block; leaf crate.
- **`pheno-errors`** — no `[workspace]` block; leaf crate.
- **`pheno-flags`** — no `[workspace]` block; leaf crate.
- **`pheno-config`**, **`pheno-mcp-router`**, **`pheno-context`** — no Cargo.toml, no workspace, no dup risk.

**Zero duplicates found.** Cargo workspace hygiene is clean.

## Why this matters
A circular workspace in a Rust repo causes:
- `cargo metadata` to fail with "cycle in workspace"
- `cargo build --workspace` to silently pick the wrong member
- IDEs (rust-analyzer) to show phantom errors
- CI to fail with cryptic messages about missing targets

Catching this at the audit stage (where it costs 0) is much cheaper than catching it when someone tries to add a new crate and the whole workspace breaks.

## Recommended controls
1. **CI gate** — add `cargo metadata --no-deps --format-version 1 > /dev/null` to a per-crate CI step. If metadata parsing fails, the PR is blocked. This catches circular workspace + invalid Cargo.toml in one shot.
2. **Pre-commit hook** — `cargo metadata --no-deps` on changed `**/Cargo.toml` files. Lighter than full build, catches the same class of error.
3. **Document the rule** — add a one-line note to `pheno-cargo-template/README.md` and `pheno-scaffold-kit` that "crates do not nest workspaces."

## Action items
None for the current fleet (clean). The CI gate is the highest-value addition; ~5 lines of YAML.

**Refs:** `pheno-otel/Cargo.toml` (only nested workspace), `pheno-cargo-template` (scaffold docs).
