# pheno-secret-scan

> Canonical TruffleHog-based secret scanning for the **pheno-\*** fleet —
> one workflow, one pre-commit hook, one allowlist. Drop-in for every
> pheno-* crate / app / SDK in the monorepo.

`pheno-secret-scan` ships three pieces:

1. A **GitHub Actions workflow** (`.github/workflows/secret-scan.yml`)
   that runs TruffleHog on every push, every pull request, and a
   daily cron backstop, and posts the findings to the workflow
   summary.
2. A **pre-commit hook config** (`.pre-commit-hooks.yaml`) that runs
   `trufflehog --since-commit HEAD --no-verification` locally before
   a commit is finalized, giving developers a fast feedback loop.
3. A **baseline allowlist** (`.trufflehog-allowlist.txt`) that
   suppresses *verified* findings for known-and-mitigated detector
   IDs (rotated tokens, test fixtures). Empty by default — any
   verified secret is a hard CI failure out of the box.

The companion crate `pheno-trufflehog` is the image the workflow and
hook pin to: `trufflesecurity/trufflehog`. There is no vendored
re-implementation — `pheno-secret-scan` is the *integration*
crate, and `pheno-trufflehog` is the *runtime* it depends on.

## Layout

```
pheno-secret-scan/
├── .github/
│   └── workflows/
│       └── secret-scan.yml         # GitHub Actions workflow
├── .pre-commit-hooks.yaml          # pre-commit.com hook manifest
├── .trufflehog-allowlist.txt       # baseline allowlist (empty by default)
└── README.md                       # this file
```

## The workflow — `.github/workflows/secret-scan.yml`

Runs on:

| Trigger             | Purpose                                          |
|---------------------|--------------------------------------------------|
| `push` (all branches) | Scan full history on every push                |
| `pull_request`      | Scan full history on every PR                    |
| `schedule` (06:00 UTC) | Daily backstop for missed pushes / force-pushes |
| `workflow_dispatch` | Manual trigger with `no_verification` and `extra_paths` inputs |

The single job (`trufflehog`) does the following:

1. **Checkout** with `fetch-depth: 0` so the full git history is
   available to TruffleHog's `git file:///repo` source.
2. **Resolve allowlist** — looks for
   `pheno-secret-scan/.trufflehog-allowlist.txt` first, then
   `.trufflehog-allowlist.txt` at the repo root (in case a consumer
   inlines the workflow and moves the allowlist). The path is
   recorded in the step's outputs for the next step.
3. **Run TruffleHog** via `docker run` so the runner pulls a pinned
   image regardless of the host's pre-installed TruffleHog version.
   Flags used:
   - `--json` — stream newline-delimited JSON findings to stdout.
   - `--no-update` — disable TruffleHog's in-binary update check.
   - `--fail` — exit non-zero on verified findings, so the
     workflow run turns red.
   - `--directory=...` — what to scan. Defaults to `.`; can be
     narrowed via the `extra_paths` workflow_dispatch input.
   - `--allow-verification-overrides=<allowlist>` — only added
     when the allowlist file exists.
   - `--no-verification` — only added when the `no_verification`
     workflow_dispatch input is `true`. Default is `false`
     (verified scanning is the point).
4. **Render summary** — every finding is appended to
   `$GITHUB_STEP_SUMMARY` as a markdown table with
   `Detector | Source | Verified | Description` columns. The
   workflow also surfaces an `::error::` annotation and exits
   non-zero when verified findings exist, so PR checks fail
   loudly.

The image digest is pinned in the `env:` block; the
`TRUFFLEHOG_IMAGE` env var can be overridden on a fork to point at
a newer release.

## The pre-commit hook — `.pre-commit-hooks.yaml`

One hook:

```yaml
- id: trufflehog
  name: TruffleHog secret scan
  entry: bash -c 'docker run --rm -v "$(pwd):/repo:ro" -w /repo trufflesecurity/trufflehog:latest git file:///repo --since-commit HEAD --no-verification --no-update'
  language: system
  pass_filenames: false
  stages: [pre-commit]
  args: [--no-verification]
  exclude: |
    (?x)^(
      vendor/.*|
      target/.*|
      node_modules/.*|
      .*\.lock
    )$
```

Key choices:

- **`--since-commit HEAD`** — only scan diffs introduced by the
  current commit. The CI workflow is the source of truth for
  full-history scanning; the pre-commit loop is about *new*
  exposure.
- **`--no-verification`** — pre-commit runs in the developer's
  terminal and should be fast. Verification is what makes
  TruffleHog slow (it queries ~800 detector endpoints); the CI
  workflow does verification.
- **`pass_filenames: false`** — TruffleHog reads the git history
  directly; staged files are not the right input. Setting this
  avoids the `files were modified after pre-commit ran` warning
  some hooks produce.
- **`language: system`** — the entry invokes `docker run`, so the
  consumer only needs `docker` on PATH. No pre-commit-managed
  Python venv.
- **`exclude`** — skip vendored deps, build outputs, and lockfiles
  by default. Override in the consumer's `.pre-commit-config.yaml`
  if a different policy is needed.

## The allowlist — `.trufflehog-allowlist.txt`

Empty by default. One detector ID per line, optional `# comment`
on the same line. Example:

```
# rotated 2026-05-01, history rewrite pending
aws-access-token
# test fixture in docs/examples/
github-pat
```

The workflow passes the allowlist path to TruffleHog via
`--allow-verification-overrides=...`. The flag only suppresses
*verified* findings, so an unverified hit is still surfaced (and
still fails CI) — the allowlist is not a "shut up everything"
switch.

## Usage

### In a pheno-* consumer's GitHub repo

Copy `.github/workflows/secret-scan.yml` into the consumer's
`.github/workflows/` directory. The workflow is self-contained: it
does not depend on any other file in this repo, only on the
allowlist (which the consumer can colocate or move to the repo
root).

If the consumer wants to use the pre-commit hook instead of, or
in addition to, the workflow, add a snippet to the consumer's
`.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/KooshaPari/pheno-secret-scan
    rev: v0.1.0
    hooks:
      - id: trufflehog
        args: [--no-verification]
```

The hook id is `trufflehog`; pre-commit will look up the entry,
language, and exclude regex from the `pheno-secret-scan`
repository at the pinned tag.

### In the monorepo (this repo)

This `pheno-secret-scan/` directory is the source of truth. It is
vendored as a directory under the monorepo root so the workflow
runs against the entire monorepo on push. To consume it from a
pheno-* sub-crate, copy the workflow into
`pheno-<crate>/.github/workflows/secret-scan.yml` (the workflow
works in any repo, not just the monorepo).

## Verification

The task spec calls for YAML verification via:

```bash
python3 -c "import yaml; [yaml.safe_load(open(f)) for f in ['pheno-secret-scan/.github/workflows/secret-scan.yml', 'pheno-secret-scan/.pre-commit-hooks.yaml']]"
```

This is the only automated check at PR time; the workflow itself
is validated by the GitHub Actions YAML linter when it is pushed
to a branch. The `trufflehog` job does not have a local
integration test (the runtime is a Docker image, not a Rust
crate), so coverage is gated on the workflow actually running
against a real repository.

## Why this exists

`trufflesecurity/trufflehog` is the de-facto standard for
high-fidelity secret scanning, and we want every pheno-* repo to
have:

1. **A canonical workflow** — no copy-pasted `actions/...@v3`
   fragments across the fleet, one workflow that's reviewed once
   and trusted.
2. **A pre-commit story** — developers should learn about a
   leaked secret *before* it reaches `main`, not after the
   schedule backstop catches it the next morning.
3. **A single allowlist** — when a token rotates, the fix is
   one PR to one allowlist, not 14 PRs across 14 repos.

`pheno-secret-scan` is the answer to all three. `pheno-trufflehog`
is the underlying scanner; this crate is the *integration*.

## Downstream

- L1 triage: every pheno-* repo should be on a recent version of
  this workflow within one release cycle.
- L2 quality: a follow-up could add a `pheno-secret-scan-merge`
  job that fails the merge button on a verified secret, but
  `--fail` already does that at the run level.
- L4 services: the `helioscli` binary and the L5 pheno-* service
  crates are the natural consumers; both run on GitHub Actions.

## License

MIT (matches the rest of the pheno-* fleet).
