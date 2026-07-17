# Contributing

Thank you for your interest in contributing to this project and to the
broader `pheno-*` fleet.

## Getting Started

1. Fork the repository (or, for fleet-internal work, clone directly)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the SSOT-invariant checks (see below)
5. Commit your changes with a [Conventional Commits](https://www.conventionalcommits.org/) message
6. Push to your fork (or to the fleet monorepo, for internal contributors)
7. Open a Pull Request

## SSOT invariants (must hold in every PR)

This project is generated from [`pheno-ssot-template`](../pheno-ssot-template/).
The four SSOT invariants are non-negotiable:

1. **Every error is `pheno_errors::AppError`.** No `Box<dyn Error>`, no
   per-repo `Error` enums.
2. **Every log line is structured.** No `println!`, no format-string
   placeholders in `tracing::info!` messages.
3. **Every config is loaded via `pheno_config::load::<MyConfig>()`.** No
   hand-rolled YAML / env / TOML readers.
4. **Every schema is in `pheno-zod-schemas` / `pheno-pydantic-models`.**
   No hand-rolled `struct MyEntity` definitions for cross-language
   domain types.

The `scripts/render.sh` dry-instantiation script and the CI lint job
in `.github/workflows/ci.yml` verify these on every push.

## Commit Message Format

We follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting / whitespace
- `refactor:` Code restructuring without behavior change
- `test:` Adding or correcting tests
- `chore:` Maintenance (tooling, CI, deps)

Allowed scopes: `errors`, `tracing`, `config`, `otel`, `schemas`, `cli`,
`ci`, `docs`, `deny`, `governance`.

## Code Review

All submissions require review. The default owner is `@KooshaPari`
(see `CODEOWNERS`). Please ensure:

- CI checks pass (`cargo test`, `cargo clippy`, `cargo fmt --check`,
  `cargo deny check`)
- The 4 SSOT invariants still hold
- New public API is documented (`#![deny(missing_docs)]` is enabled in
  the template's `lib.rs`)
- Tests cover the new functionality

## Governance

Project-wide rules live under `docs/governance/` in the Phenotype
monorepo. The canonical background-agent policy that this template
and its sibling templates (`pheno-cargo-template`, `pheno-fastapi-base`,
`pheno-go-ctxkit`) point at is:

- [`docs/governance/background_agent_policy.md`](https://github.com/KooshaPari/phenotype/blob/main/docs/governance/background_agent_policy.md)

When changing fleet composition, dispatch patterns, or
failure-handling expectations, update that file in the same PR and
reference the governance worklog entry.

## Release Process

Semver. Tags are cut from `main` after a green CI run. The release
notes are auto-generated from Conventional Commits via `release-please`.

## Getting Help

- Open a [Discussion](https://github.com/KooshaPari/phenotype/discussions)
- File an [Issue](https://github.com/KooshaPari/phenotype/issues)
- Contact the maintainer directly for security issues (see `SECURITY.md`)
