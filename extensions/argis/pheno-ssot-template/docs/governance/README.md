# Governance — pheno-ssot-template

This directory holds governance and policy documents specific to the
`pheno-ssot-template` repository.

## Fleet governance

The canonical fleet governance is maintained in the Phenotype monorepo:

- [`docs/governance/background_agent_policy.md`](https://github.com/KooshaPari/phenotype/blob/main/docs/governance/background_agent_policy.md) —
  Background-agent dispatch policy, failure-handling expectations, and
  fleet composition rules.
- [`docs/governance/`](https://github.com/KooshaPari/phenotype/tree/main/docs/governance) —
  Full governance directory (SSOT for all cross-repo policies).

## Template-specific governance

`pheno-ssot-template` ships the fleet's baseline governance artifacts
to every rendered project:

| Artifact | Purpose |
|---|---|
| `CODEOWNERS` | Default owner (`@KooshaPari`) for every path |
| `CONTRIBUTING.md` | Conventional commits, SSOT invariants, PR process |
| `SECURITY.md` | Reporting channel, cargo-deny, CodeQL |
| `deny.toml` | cargo-deny baseline (authkit conservative) |

## Versioning

This template follows semver. Any change that alters the rendered output
(`scripts/render.sh`, `src/lib.rs.template`, `Cargo.toml.template`,
`.github/workflows/ci.yml`, `deny.toml`, `CODEOWNERS`) must bump the
minor or major version in `template.yaml`.

## Related

- `template.yaml` — Machine-readable template manifest
- `CONTRIBUTING.md` — Contributor guide with SSOT invariants
- `SECURITY.md` — Security policy
