# Tauri 2 Certificate Provisioning Runbook

This is the **one-pager** the sponsor runs to obtain + wire the real certs
that the production bundle pipeline (`apps/desktop/CODESIGNING.md`) expects
to be present in CI secrets.

## 1. Apple Developer ID (macOS)

**Required for:** `cargo tauri build --target aarch64-apple-darwin` notarized DMG
**Signs:** `OmniRoute.app` + the `.dmg` bundle
**Notarization:** Apple's notary service via `xcrun notarytool`

### Steps

```bash
# 1. Enroll in Apple Developer Program ($99/yr)
#    https://developer.apple.com/programs/enroll/

# 2. On your Mac, generate a Developer ID Application certificate
#    Xcode -> Settings -> Accounts -> Apple ID -> Manage Certificates
#    -> + -> Developer ID Application
#    (or use the legacy `security` + `openssl` flow)
#
# 3. Export the cert as .p12 (with a strong password)
#    Keychain Access -> My Certificates -> right-click the cert -> Export
#    Format: Personal Information Exchange (.p12)

# 4. Base64-encode the .p12 for CI secret storage
base64 -i Certificates.p12 | pbcopy

# 5. Create an app-specific password for notarytool
#    https://appleid.apple.com/account/manage
#    App-Specific Passwords -> Generate

# 6. Find your Team ID
#    https://developer.apple.com/account/#/membership
#    Format: 10 alphanumeric chars (e.g. ABCDE12345)
```

### CI secrets to set on `KooshaPari/OmniRoute` repo

| Secret | Value |
|---|---|
| `APPLE_CERTIFICATE` | base64 string from step 4 |
| `APPLE_CERTIFICATE_PASSWORD` | the .p12 password from step 3 |
| `APPLE_SIGNING_IDENTITY` | `Developer ID Application: <Team Name> (<TeamID>)` |
| `APPLE_ID` | your Apple ID email |
| `APPLE_PASSWORD` | app-specific password from step 5 |
| `APPLE_TEAM_ID` | 10-char Team ID from step 6 |

## 2. Windows code signing (Azure Trusted Signing)

**Required for:** `cargo tauri build --target x86_64-pc-windows-msvc` signed NSIS .exe + MSIX
**Signs:** the PE header on `OmniRoute_x.y.z_x64-setup.exe` and the MSIX
**Trust model:** Azure Trusted Signing is the modern EV-equivalent. No USB token needed.

### Steps

```bash
# 1. Create a Trusted Signing account in Azure Portal
#    https://portal.azure.com -> search "Trusted Signing"
#    -> Create a Trusted Signing Account
#    Region: pick one close to your CI region
#    Pricing tier: Standard (~$10/mo) for prod
#
# 2. Create a code-signing certificate profile
#    Trusted Signing Account -> Certificate profiles -> Create
#    Profile type: Public trust (Code Signing)
#    Subject: CN=Phenotype Contributors, O=Phenotype, C=US
#    Validity: 3 years
#
# 3. Grant CI's service principal access to the signing profile
#    - In Azure Portal, register an app (Entra ID app registration)
#    - Generate a client secret
#    - Grant it the "Trusted Signing Certificate Profile Signer" role
#      on the signing profile's resource group
#
# 4. Validate the profile by signing a test binary locally
#    - Install Azure.CodeSigning tools
#    - Sign once to confirm reputation establishes
```

### CI secrets to set

| Secret | Value |
|---|---|
| `AZURE_TENANT_ID` | Entra ID tenant GUID |
| `AZURE_CLIENT_ID` | service principal application (client) ID |
| `AZURE_CLIENT_SECRET` | the secret you generated in step 3 |
| `AZURE_ENDPOINT` | e.g. `https://wus2.trustedsignrs.us.attest.azure.net` (matches the account region) |
| `WINDOWS_CERTIFICATE` | (optional) base64 of a .pfx export if you want offline signtool flow |

## 3. Tauri updater release key

**Required for:** the auto-update channel wired in `tauri.conf.json`
**Trust model:** the `pubkey` is baked into the build; the `private key` signs the `.tar.gz` updater artifacts.

### One-time setup (per release train)

```bash
# On your dev machine, with the Tauri CLI installed
cargo install tauri-cli --version '^2' --locked
mkdir -p ~/.tauri
tauri signer generate -w ~/.tauri/argismonitor.key
# -> creates argismonitor.key (private) + argismonitor.key.pub (public)

# Bake the PUBLIC key into apps/desktop/tauri.conf.json
#   plugins.updater.pubkey = "<contents of argismonitor.key.pub>"
# (or in apps/desktop/src-tauri/tauri.conf.json for the src-tauri subtree)
```

### Per-release CI secret

| Secret | Value |
|---|---|
| `TAURI_SIGNING_PRIVATE_KEY` | the contents of `argismonitor.key` (PEM) |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | the password you set when generating |

**Important:** rotate the keypair if a developer leaves the team. Bumping the `pubkey` in `tauri.conf.json` invalidates all prior releases; users will need a manual one-time update.

## 4. First-time verification (sponsor-driven)

```bash
# 1. Apple notarization dry-run
./scripts/cutover.sh health   # confirms BFF + Next.js are up
cd apps/desktop
./scripts/notarize.sh /path/to/test.dmg   # uses APPLE_* secrets
# expect: "OK: ... is signed, notarized, and stapled."

# 2. Windows signing dry-run (requires az cli)
az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
# then run a windows build from a windows runner

# 3. Tauri updater signature dry-run
# (requires building a release first; see apps/desktop/CODESIGNING.md)
```

## 5. Cost

- Apple Developer Program: $99/yr
- Azure Trusted Signing (Standard): ~$10/mo
- Tauri updater keypair: $0 (self-generated)

Total: ~$220/yr + ~$10/mo. A pittance vs. a single enterprise support ticket.

## 6. Failure modes

- **`APPLE_CERTIFICATE_PASSWORD` is wrong** -> `notarytool` exits with `Invalid credentials`
- **`APPLE_TEAM_ID` is wrong** -> `xcrun stapler` returns `Service Not Available`
- **`AZURE_*` wrong** -> Tauri build exits with `Failed to sign: 401`
- **`TAURI_SIGNING_PRIVATE_KEY` is wrong** -> client receives an "invalid signature" error and refuses the update
- **Cert expires mid-rollout** -> revert the rollout (`./scripts/cutover.sh 0`), renew, re-release

If a failure happens mid-cutover, the existing rollback path (`OMNI_WEB_STACK_ROLLOUT=0`) reverts in seconds. Build pipeline failures are caught by CI before any user is affected.
