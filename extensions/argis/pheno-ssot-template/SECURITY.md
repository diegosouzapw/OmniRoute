# Security Policy

## Reporting Vulnerabilities

Please report security vulnerabilities via GitHub Security Advisories:

- Open a [private security advisory](../../security/advisories/new)
- For sensitive issues, contact the repository owner directly

## Supported Versions

Latest `main` branch. Older versions are not supported.

## Disclosure Policy

We follow coordinated disclosure with reporters. Once an issue is patched,
an advisory will be published.

## Cargo-deny

Rust projects in this org enforce a zero-advisory floor via the
`cargo deny check` job in CI (the `deny.toml` baseline ships with
this template). Advisories that lack a safe upgrade are listed in
`deny.toml`'s `[advisories] ignore` block with a `reason` per id.

## CodeQL

Static analysis runs weekly via the
`ossf/scorecard-action` and (where enabled) `github/codeql-action`
workflows.

## SSOT note

The template's `deny.toml` is the conservative AuthKit baseline
(reference: `DENY_TOML_DIVERGENCE_2026_06_10.md`); it intentionally
omits the GPL-3.0-only / CC-BY-SA-4.0 / BSD-3-Clause-Clear additions
documented in that audit. Downstream repos that need a more
permissive license set can extend the `allow` list with a deliberate
follow-up PR.
