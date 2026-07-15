# ADR: Code Signing Strategy

**Status**: Draft
**Date**: 2026-07-10
**PR**: —

## Context

OmniRoute ships as:
1. **CLI** — `npm` package (omniroute), distributed via npm registry
2. **Desktop** — Electron app (Windows, macOS, Linux), distributed via GitHub Releases
3. **Docker** — Container image, distributed via GHCR

Each distribution channel requires platform-appropriate code signing for user trust and secure delivery.

## Decision

### npm package — no signing required
- npm packages are integrity-checked via `npm audit` + lockfile + `--require=key` signing for published maintainers
- Enable provenance attestation in npm (GitHub Actions + `--provenance` flag): `npm publish --provenance`

### Electron macOS — hardened runtime + notarization
- Use `@electron/notarize` to:
  - Sign the `.app` bundle with Apple Developer ID Application certificate
  - Submit to Apple Notary service for notarization
  - Staple the ticket to the executable
- CI: `electron-builder` with `mac.sign` and `mac.notarize` config (see `.github/workflows/release.yml`)

### Electron Windows — Authenticode
- Use `electron-builder` with `win.certificateSubjectName` or `win.certificateFile`
- Azure Key Vault for HSM-backed code signing key storage

### Electron Linux — no system-required signing
- Package as `.snap` (Snapcraft signing) and `.deb`/`.AppImage` (unsigned)
- Snap: `snapcraft sign` with Snap Store account

### Docker — Cosign
- Sign container image with Cosign keyless signing (`cosign sign --keyless`)
- Attach CycloneDX SBOM as attestation (`cosign attest`)
- Automate in release CI (`.github/workflows/release.yml`)

## Consequences

| Pro | Con |
|-----|-----|
| macOS users get Gatekeeper-trustworthy builds | Requires Apple Developer Program ($99/yr) |
| Docker users can verify image provenance | Additional CI build time (~2 min per platform) |
| npm provenance confirms maintainer identity | Windows certs require EV code signing ($250+/yr) |
| Users can verify build traceability | Key management overhead |

## Implementation Path

1. **Phase 1**: npm provenance `--provenance` flag — already supported by GitHub Actions OIDC
2. **Phase 2**: Cosign Docker signing — configure cosign in release CI
3. **Phase 3**: macOS notarization — add Apple Developer cert to GitHub secrets + electron-builder config
4. **Phase 4**: Windows EV signing — acquire cert, add to Azure Key Vault, wire electron-builder
