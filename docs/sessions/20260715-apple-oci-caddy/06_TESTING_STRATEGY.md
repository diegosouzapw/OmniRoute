# Testing Strategy

```bash
./scripts/verify-caddy-oci.sh --static
./scripts/verify-caddy-oci.sh --runtime
```

Static mode provisions and validates the repository Caddyfile. Runtime mode repeats that
validation, starts two mock upstreams, checks `/v1/models`, API and UI routing, proves both
upstreams receive traffic, and records the verdict under `artifacts/`.
