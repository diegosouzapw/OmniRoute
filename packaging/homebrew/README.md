# Homebrew

This directory hosts the Homebrew formula for OmniRoute, kept in-tree so the
formula travels with the release it describes.

## Install

Once the formula is published to a tap (e.g. `KooshaPari/homebrew-omniroute`),
users install with:

```bash
brew tap KooshaPari/omniroute https://github.com/KooshaPari/homebrew-omniroute.git
brew install omniroute
```

## Layout

- `Formula/omniroute.rb` — the formula. Version + sha256 must be bumped in
  lockstep with the corresponding npm release of `@kooshapari/omniroute`.

## Maintenance

- Bump `version` and `sha256` when cutting a new npm release.
- Bump `url` if the package name or registry path changes.
- Do **not** edit `homepage` away from `KooshaPari/OmniRoute` — that is the
  canonical source.

## Provenance

Migrated from the standalone `KooshaPari/homebrew-omniroute` tap on
2026-09-03 as part of monorepo consolidation. See
`koosha-phenotype/docs/omniroute-integration/INTEGRATION_MANIFEST.md` for
the decision and `repos/zz-archive/2026-09-03-monorepo-consolidation/` for
the archive.
