# Vendored Bifrost (Tier-1 router)

**Canonical source:** https://github.com/KooshaPari/bifrost
**Upstream:** https://github.com/maximhq/bifrost (KP fork is +4 commits ahead)
**Status (2026-06-18):** KP/bifrost @ main → `KooshaPari/bifrost` mirrors maximhq/bifrost @ dev + 4 KP commits
**License:** MIT (matches upstream)

## What this directory is

This directory hosts a *shallow clone* of KP/bifrost used as the Tier-1
router for OmniRoute per [ADR-031](../../docs/adr/0031-bifrost-tier1-router.md)
and the v8.1 Bifrost track in [PLAN.md § 2.5](../../PLAN.md).

The 340 MB source tree is **not** committed to OmniRoute (see `.gitignore`).
Only this `VENDOR.md` and `.gitkeep` are tracked. The full tree is populated
on demand by `scripts/build-bifrost.sh` (or `just bifrost-build`).

## Why a vendored copy, not a git submodule

We considered three patterns:

1. **git submodule** — cleanest, but requires contributors to `git submodule
   update --init --recursive` on every clone, and a 340 MB checkout. CI
   already takes 6+ min; the extra submodule init step + the shallow
   tarball download are roughly equivalent in time. We rejected this because
   submodules fail silently when contributors forget `--init`, and we
   prefer *fail-loud* setups.

2. **npm-style postinstall script** — `package.json` `postinstall` runs
   `scripts/build-bifrost.sh`. We rejected this because OmniRoute runs in
   Deno (see `deno.json`) for some sub-paths, and Node `postinstall` is
   not invoked for Deno. A standalone `just` recipe is the lowest common
   denominator.

3. **Standalone build script + gitignored vendor tree** *(chosen)*. The
   340 MB tree lives in `vendor/bifrost/` after the build script runs.
   CI calls `just bifrost-build` before `pnpm test`; contributors run it
   once on first checkout and again when KP/bifrost advances.

## Update procedure

When KP/bifrost advances (operator workflow):

```bash
# 1. Wipe the local checkout
rm -rf vendor/bifrost
mkdir -p vendor/bifrost
touch vendor/bifrost/.gitkeep

# 2. Re-clone shallowly and rebuild
just bifrost-build

# 3. (Optional) Verify the BIFROST_REF pin in scripts/build-bifrost.sh
#    still matches what you want (default: KP/bifrost @ main)
```

The `BIFROST_REF` env var controls the branch/tag to pin. Default `main`.
CI pins to a specific SHA via the `BIFROST_REF` GitHub Actions variable
(see `.github/workflows/ci.yml`).

## Decision review

Per ADR-031 § Decision Review:

- 30 days post-B6 (traffic shadow at 100%): compare p99 latency, error
  rate, and cost between Bifrost and the legacy `chatCore` path. Revert
  to chatCore if any axis regresses by >20%.
- 90 days post-B6: commit long-term (1-year SLT agreement with maximhq)
  or fork-and-modify.

See:

- [ADR-031](../../docs/adr/0031-bifrost-tier1-router.md)
- [BIFROST-BACKEND.md](../frameworks/BIFROST-BACKEND.md) (operator guide)
- [worklogs/2026-06-18-L5-110-bifrost-tier1-router.md](../../worklogs/2026-06-18-L5-110-bifrost-tier1-router.md)
