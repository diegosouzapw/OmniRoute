# Contributing to `pheno-otel`

Thanks for your interest in contributing to the `pheno-otel` substrate
canonical. This document covers the basics of contributing. For governance and
architectural decisions, see `AGENTS.md`.

## Quick links

- **Governance:** [`AGENTS.md`](./AGENTS.md)
- **Security:** [`SECURITY.md`](./SECURITY.md)
- **Code of Conduct:** [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- **Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)
- **Source code:** [`FocalPoint/pheno-otel/`](../FocalPoint/pheno-otel/)
- **Issue templates:** `.github/ISSUE_TEMPLATE/`

## How to contribute

### Reporting bugs

Use the `.github/ISSUE_TEMPLATE/bug.yml` template. Include:

- A clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment (Rust version, OS, OTLP backend version)
- Relevant logs / span dumps

### Suggesting features

Use the `.github/ISSUE_TEMPLATE/feature.yml` template. Include:

- Use case (what problem are you solving?)
- Proposed API sketch
- Backwards-compatibility analysis
- Link to any relevant ADRs or research notes

### Security vulnerabilities

**Do NOT open a public issue.** Follow the disclosure process in `SECURITY.md`.

### Pull requests

1. **Fork** the relevant repo (`FocalPoint/pheno-otel` for source changes,
   `phenotype-apps` for governance/meta-bundle changes).
2. **Create a branch** following the naming convention:
   - `feat/<req-id>-<slug>-<date>`
   - `fix/<req-id>-<slug>-<date>`
   - `chore/<req-id>-<slug>-<date>`
   - `docs/<req-id>-<slug>-<date>`
3. **Make your change.** Include tests for any new behavior. Keep PRs focused
   (one concern per PR).
4. **Run the local checks:**
   ```bash
   just check    # fmt + clippy + test
   just audit    # cargo-deny + cargo-audit
   ```
5. **Open a PR** using `.github/PULL_REQUEST_TEMPLATE.md`. Fill in every
   section.
6. **Wait for review.** A maintainer will review within 1 business day for
   non-trivial changes. For trivial governance fixes, the bot may self-merge.

## Coding conventions

- **Edition:** 2021
- **MSRV:** 1.82
- **Formatting:** `cargo fmt` (rustfmt defaults)
- **Linting:** `cargo clippy --all-targets -- -D warnings`
- **Testing:** unit + integration minimum; e2e for new features
- **Coverage:** 80% lib minimum (ADR-040)
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)
- **Worklog:** every change MUST include a worklog entry per
  `pheno-worklog-schema` v2.1 (ADR-025) — 11 columns including `device:`
- **Observability:** info-level minimum OTLP export via `pheno-tracing`

## Architecture decision records

For non-trivial changes (new API surface, new dependency, behavioral change):

1. Write an ADR under `docs/adr/<date>/` in the relevant repo
2. Reference the ADR in your PR
3. Wait for ADR approval before merging the change

## Review process

- **Bot self-merge** is the fleet norm (per ADR-029 + L5-108). Trivial fixes
  (typos, dep bumps, governance imports) may be auto-merged.
- **HITL review** is required for: breaking API changes, new dependencies,
  new substrate paths, anything touching security/crypto.
- **71-pillar audit** runs weekly (ADR-041). Every repo should score ≥2 across
  all 71 pillars.

## Code of Conduct

By participating, you agree to abide by the Contributor Covenant in
`CODE_OF_CONDUCT.md`.

## License

By contributing, you agree that your contributions will be dual-licensed under
MIT or Apache 2.0, at the option of the downstream consumer. See `LICENSE-MIT`
and `LICENSE-APACHE`.
