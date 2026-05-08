# Release Checklist

Use this checklist before tagging or publishing a new OmniRoute release.

## Version and Changelog

1. Bump `package.json` version (`x.y.z`) in the release branch.
2. Move release notes from `## [Unreleased]` in `CHANGELOG.md` to a dated section:
   - `## [x.y.z] — YYYY-MM-DD`
3. Keep `## [Unreleased]` as the first changelog section for upcoming work.
4. Ensure the latest semver section in `CHANGELOG.md` equals `package.json` version.

## API Docs

1. Update `docs/openapi.yaml`:
   - `info.version` must equal `package.json` version.
2. Validate endpoint examples if API contracts changed.

## Runtime Docs

1. Review `docs/ARCHITECTURE.md` for storage/runtime drift.
2. Review `docs/TROUBLESHOOTING.md` for env var and operational drift.
3. Verify the release/runtime Node.js version still satisfies the supported secure floor:
   - `>=20.20.2 <21`, `>=22.22.2 <23`, or `>=24.0.0 <25`
   - `npm run check:node-runtime`
4. Validate the npm publish artifact after building the standalone package:
   - `npm run build:cli`
   - `npm run check:pack-artifact`
   - confirm no `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, or other local residue
5. Update localized docs if source docs changed significantly.

## Automated Check

Run the sync guard locally before opening PR:

```bash
npm run check:docs-sync
```

CI also runs this check in `.github/workflows/ci.yml` (lint job).
