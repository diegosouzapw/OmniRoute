# Specifications

`scripts/verify-caddy-oci.sh` supports `--static` and `--runtime`.

- Engine order: healthy Apple `container`, Docker daemon, Podman service.
- Exit `0`: verified; exit `1`: assertion failure; exit `2`: environment blocked.
- Runtime acceptance: health, API, UI, and both named mock upstreams are observed.
- No OmniRoute application image or credentials are required.
