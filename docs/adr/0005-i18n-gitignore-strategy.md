# 0005 — i18n gitignore strategy

> Status: **Proposed**
> Date: 2026-06-08
> Deciders: OmniRoute maintainers

## Context

`OmniRoute/docs/i18n/` contains **682,302 lines of auto-generated translations**
across 47 languages. Every English doc in `docs/` is mirrored into
`docs/i18n/<lang>/...`. The translation pipeline is:

- `scripts/i18n/generate-multilang.mjs` — orchestrator
- `scripts/i18n/i18n_autotranslate.py` — the LLM-based translator
- `scripts/i18n/sync-llm-mirrors.mjs` — pulls the latest LLM output
- `scripts/i18n/sync-ui-keys.mjs` — extracts i18n keys from source
- `scripts/i18n/check-translation-drift.mjs` — detects when EN has moved
  ahead of translations

The generated content:
- Is **stale by minutes** (any doc edit re-triggers the pipeline)
- Has **no semantic value** beyond SEO (translations are LLM-generated and
  rarely reviewed)
- Bloats the repo: `docs/i18n/` is 2.7GB on disk and 682K LOC tracked
- Slows `git clone` and CI to a crawl

## Decision

**Gitignore the entire `docs/i18n/` tree** and any i18n sidecar files.
The CI/CD pipeline regenerates the content as a build artifact.

## Rationale

1. **Auto-generated content should not be in source control.** This is the same
   reason we gitignore `node_modules/`, `dist/`, and `target/`. Generated
   content belongs in artifacts (S3, npm tarball, GitHub Pages), not git.
2. **i18n is a build output, not a build input.** The input is the English
   source; the output is `docs/i18n/<lang>/.../*.md`. CI runs the translator
   pipeline on every docs build and deploys the result.
3. **The drift detector is a real check.** `check-translation-drift.mjs`
   already exists, and would tell us if a translation is out of date. That
   signal is lost when content is in git, because stale translations look
   "current" to a casual reader.

## Implementation

Add to `.gitignore`:

```gitignore
# i18n is auto-generated, not authored
docs/i18n/
# Sidecar files from the i18n pipeline
docs/_audit.json
docs/_pending-keys.json
scripts/i18n/_cache/
```

The existing 682K LOC of tracked i18n content is removed from the index in a
single `git rm -r --cached docs/i18n/` commit. The on-disk files are kept
(deleted from the working tree in a separate commit if desired).

## Consequences

**Positive**
- `git clone` is ~2.7GB lighter
- PR diffs are readable again (i18n updates no longer pollute the diff)
- CI is materially faster (no need to checkout 682K lines of content)
- Drift detection becomes signal, not noise

**Negative**
- If a contributor wants to read the German docs, they have to run
  `pnpm run docs:translate` first (or visit the deployed docs site)
- The `git rm -r --cached docs/i18n/` is a 682K-LOC commit; it's a one-time
  hit, but it's a hit
- A small risk of a "lost in i18n" search (grep doesn't work for i18n files)

## Mitigations

- Document the i18n build step in `README.md` and `SPEC.md`
- Add a "how to preview translations locally" section to `AGENTS.md`
- The `docs-site/` (post-decomposition) hosts the deployed i18n tree, so
  contributors can always reach it there

## Alternatives Considered

1. **Keep i18n in git, but make CI fast** — rejected; the "make CI fast"
   axis is bounded by the size of the clone, which i18n dominates.
2. **Move i18n to a separate LFS repo** — rejected; LFS is for large files,
   not for generated content. The right tool is gitignore + build artifact.
3. **Keep i18n in git, but as a separate orphan branch** — rejected;
   orphan branches don't get the protection of regular branches, and the
   history is just noise.

## Cross-References

- `SPEC.md` § Repo Layout (i18n marked with ⚠️)
- `PLAN.md` § Decomposition Roadmap (i18n is the first step)
- ADR-0004 — decomposition into packages
