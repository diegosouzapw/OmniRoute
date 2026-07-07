# Code signing + notarization

Production Tauri 2 builds must be signed + notarized for distribution. This
document is the source of truth for the cert lifecycle, the bundle matrix,
and the release pipeline.

## Cert matrix

| Platform | Cert source | Naming | Storage |
|---|---|---|---|
| macOS | Apple Developer ID Application (.p12) | `Developer ID Application: <Team> (<id>)` | Keychain + repo secret `APPLE_CERTIFICATE` + `APPLE_CERTIFICATE_PASSWORD` |
| macOS notarization | App-specific password | n/a | repo secret `APPLE_PASSWORD` |
| macOS team | Apple Developer Team ID | n/a | repo secret `APPLE_TEAM_ID` |
| Windows | Azure Trusted Signing (.pfx) | n/a | repo secrets `WINDOWS_CERTIFICATE` + `WINDOWS_CERTIFICATE_PASSWORD` + Azure service principal |
| Tauri updater | self-generated RSA key (per release train) | `~/.tauri/argismonitor.key` | repo secret `TAURI_SIGNING_PRIVATE_KEY` |
| Tauri updater pubkey | derived from above | n/a | baked into `tauri.conf.json` -> `plugins.updater.pubkey` |

## macOS pipeline

1. Sign with `codesign --deep --force --options runtime --timestamp --sign "$APPLE_SIGNING_IDENTITY" argismonitor.app`
2. Build DMG
3. `xcrun notarytool submit` to Apple notary service (via `scripts/notarize.sh`)
4. `xcrun stapler staple` to embed the ticket
5. Verify with `xcrun stapler validate`

## Windows pipeline

1. Tauri builder invokes `signtool.exe` with the Azure Trusted Signing endpoint
2. NSIS produces a signed `.exe` installer
3. Code signature embedded in PE header
4. SmartScreen reputation builds with usage (no EV cert required with Trusted Signing)

## Linux pipeline

- `.deb` (Debian/Ubuntu): `dpkg-deb` packages the AppDir
- `.rpm` (Fedora/RHEL): `rpmbuild`
- `.AppImage`: AppImageKit with bundled GLibC for portability
- GPG signature on the .deb/.rpm (we'll set up a release key in Phase 5)

## Tauri updater

- Generate release keypair once: `cargo install tauri-cli --version '^2' && tauri signer generate -w ~/.tauri/argismonitor.key`
- Store the **private** key in `TAURI_SIGNING_PRIVATE_KEY` (CI secret)
- Store the **public** key in `tauri.conf.json` -> `plugins.updater.pubkey`
- Auto-update channel: `https://github.com/KooshaPari/OmniRoute/releases/latest/download/{{target}}/{{current_version}}`
- Windows: `installMode: passive` (no UAC prompt for users)

## Release flow

1. Bump version in `apps/desktop/package.json` + `apps/desktop/tauri.conf.json` + `Cargo.toml`
2. `git tag v0.x.y && git push --tags`
3. GitHub Actions release job runs:
   - macOS arm64 + x86_64 builds, signs, notarizes, uploads DMG + ZIP
   - Windows x64 build, signs, uploads MSIX + NSIS .exe
   - Linux x64 build, uploads .deb + .rpm + .AppImage
   - Tauri updater artifacts (.tar.gz for Linux, .sig files)
4. Generated artifacts: see `.github/workflows/release.yml`
5. Users auto-updated on next launch (Tauri updater pulls from `releases/latest/...`)

## Bundle matrix

| Platform | Targets | Bundle output |
|---|---|---|
| macOS | arm64, x86_64 | `.dmg`, `.app` (unsigned), `.app.tar.gz` (Tauri updater) |
| Windows | x86_64, arm64 | `.msi`/`.exe` (NSIS), `.msix`, `.app.tar.gz` |
| Linux | x86_64, arm64 | `.deb`, `.rpm`, `.AppImage`, `.app.tar.gz` |

## Skip-signing builds

`bun run dev` and the `feat/v4-svelte-hono-monorepo` CI builds do NOT
sign. Only release-tag builds invoke `signingIdentity` and `certificateThumbprint`.
