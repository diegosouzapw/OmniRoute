# Apple OCI Caddy Verification

## Goal

Prove `deploy/Caddyfile` with Apple `container` first and Docker or Podman as portable
fallbacks. Evidence is emitted under `artifacts/` by `scripts/verify-caddy-oci.sh`.

## Success criteria

- Recommended arm64 kernel boots a Linux container.
- Caddy validates its real repository configuration.
- Two mock upstreams serve health, API, and UI traffic through Caddy.
- Cleanup runs on success, failure, interruption, and timeout termination.
