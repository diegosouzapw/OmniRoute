# Air-Gapped (Offline) Build Guide

> **Last updated**: 2026-07-09
> **Purpose**: Build and deploy OmniRoute in environments without direct internet access

## Overview

Air-gapped deployments are required for:
- Security-controlled environments (gov, finance, defense)
- Air-gapped data centers
- Build-time dependency verification
- Reproducible offline CI/CD pipelines

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js 24+ | `>=22.0.0 <23 \|\| >=24.0.0 <27` | Runtime |
| npm 10+ | — | Package manager |
| `tarball` cache | — | Offline package storage |

## Phase 1: Seed the Package Cache (online)

From an internet-connected machine with the same OS/arch:

```bash
# 1. Clone and install
git clone https://github.com/KooshaPari/OmniRoute.git
cd OmniRoute
npm ci --prefer-offline

# 2. Populate npm cache (downloads everything)
npm cache ls 2>/dev/null || npm cache verify
# This ensures all tarballs are cached

# 3. Export the cache
tar czf npm-cache-offline.tar.gz -C ~/.npm/_cacache .

# 4. Export node_modules for reference
tar czf node_modules-reference.tar.gz node_modules

# 5. Export the package-lock.json and .npmrc
cp package-lock.json .npmrc package-lock-offline-backup/
```

## Phase 2: Transfer to Air-Gapped Environment

Use whatever secure transfer method is available:

```bash
# Examples:
# - USB drive (encrypted)
# - Secure FTP
# - Optical media
# - Hardware data diode

# Transfer these files:
# ├── omniroute-source.tar.gz        (repo source + git history)
# ├── npm-cache-offline.tar.gz       (full npm cache)
# ├── node_modules-reference.tar.gz  (optional, for comparison)
# └── package-lock-offline-backup/   (lock file + .npmrc)
```

## Phase 3: Build Offline

```bash
# 1. Extract source
tar xzf omniroute-source.tar.gz
cd OmniRoute

# 2. Restore npm cache
tar xzf npm-cache-offline.tar.gz -C ~/.npm/_cacache

# 3. Install from cache only
npm ci --offline --prefer-offline --no-audit --no-fund

# 4. Verify integrity
npm audit --offline || true  # Report known vulns (no internet = no fresh data)
npm ls --depth=0              # Verify expected tree

# 5. Build
npm run build:release

# 6. Verify build output
ls dist/
cat dist/BUILD_SHA  # Confirm build sentinel present
```

## Verification

After offline build, verify:

```bash
# Check no network calls were attempted
npm config get registry  # Should be file:// or offline-compatible

# Verify the build runs without network
./bin/omniroute.mjs --version

# Run tests that don't require network
npm run typecheck:core
npm run lint
```

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `ERR_INVALID_PACKAGE` | Cache miss | Re-seed cache online for missing package(s) |
| `ETIMEDOUT` during build | Process attempting network | Check for postinstall scripts with network calls |
| Missing optional dep | Platform-specific dep not cached | Seed cache on matching OS/arch |
| `BUILD_SHA` mismatch | Different source | Re-package source from the same commit |

## CI/CD Integration

Add a nightly workflow to verify offline builds:

```yaml
# .github/workflows/nightly.yml already includes offline-build job
# It runs: npm ci --offline --prefer-offline && npm run build:release
```

## Related Documents

- `docs/ops/CAPACITY_PLANNING.md` — Infrastructure scaling
- `docs/security/THREAT_MODEL.md` — Security considerations for air-gapped deploy
- `SPEC.md` § Build — Build system specification
