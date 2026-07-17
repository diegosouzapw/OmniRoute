# pheno-port-adapter — CONTRIBUTING.md

> **Repo tier:** `pheno-*-lib` (per ADR-023).
> **Sibling artifact:** see [`SPEC.md`](./SPEC.md) for the canonical 1-page spec.
> **Meta-bundle target:** `AGENTS.md` + `llms.txt` + `WORKLOG.md` + `CHANGELOG.md` + `CONTRIBUTING.md` + `STATUS.md` + `SPEC.md` + `LICENSE-MIT`.
> **Pattern role:** reference impl for the hexagonal L4 Port/Adapter contract (ADR-038); new transport adapters should follow the `Port` trait + `Adapter` impl shape.

## 1. Quickstart (5 lines)

```bash
gh repo fork KooshaPari/phenotype-apps   # monorepo (this crate lives in pheno-port-adapter/)
cd phenotype-apps
git checkout -b feat/<req-id>-<slug>-$(date +%Y-%m-%d)   # or chore/<req-id>-...
git commit -m "feat(scope): description"                 # Conventional Commits
gh pr create --base main --head <branch> --fill
```

## 2. Branching strategy

| Type    | Prefix                          | When                                            |
| ------- | ------------------------------- | ----------------------------------------------- |
| Feature | `feat/<req-id>-<slug>-<date>`   | New user-facing capability, API addition        |
| Chore   | `chore/<req-id>-<slug>-<date>`  | Refactor, governance, docs, CI, deps            |
| Fix     | `fix/<req-id>-<slug>-<date>`    | Bug fix on a shipped path                       |
| Spike   | `spike/<req-id>-<slug>-<date>`  | Time-boxed investigation; do NOT merge code     |

`<req-id>` = fleet DAG level `L<n>-<seq>` (e.g. `L5-116`, `L4-66`); `<date>` = `YYYY-MM-DD`.

## 3. Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) with a scope. Subject ≤ 72 chars, imperative mood.

- `feat(scope):` / `fix(scope):` / `refactor(scope):` — capability, bug fix, no behavior change.
- `perf(scope):` / `test(scope):` / `docs(scope):` — perf, tests, docs only.
- `build(scope):` / `ci(scope):` / `chore(scope):` — build, CI, non-src maintenance.

Example: `feat(adapters): add InMemoryAdapter for tests (ADR-038 extension point)`.

## 4. PR template

```markdown
## What / Why / How
<!-- 1-3 sentences each. Link the issue / ADR / DAG level L<n>-<seq>.
     For Port/Adapter changes, cite ADR-038 + the consumer crates affected. -->

## Test plan
<!-- [ ] unit  [ ] integ  [ ] e2e  [ ] manual
     [ ] coverage >= 80% (lib gate per ADR-040)  [ ] lint clean  [ ] WORKLOG.md updated
     [ ] labels: governance | L<n>-#<n>  +  area:<scope> -->

## Risk
<!-- Blast radius + rollback plan. For trait changes, list the 19 ad-hoc crates
     that may need to migrate to the new contract (per ADR-038 adoption matrix). -->
```

## 5. Review process

- **Reviewers:** 1 CODEOWNER on the touched path + 1 cross-area reviewer. SLA: first review ≤ 1 business day, re-review ≤ 4 hours of push.
- **Merge:** squash-merge by default; rebase-merge only for multi-commit feature branches.
- **Self-merge:** permitted for `governance` + `L<n>-#<n>` + `area:docs` + `area:ci` PRs (Track 8 post-mortem; this PR qualifies — `chore(L5-116): meta-bundle, area:docs`). All others need explicit human approval.
- **No force-push** to `main` or to PRs after review has started.
- **Special note for `pheno-port-adapter`:** changes to the `PortAdapter` trait signature are a major version bump + ADR; the trait is the public contract that 19 other pheno-* crates are migrating to (ADR-038).

## 6. Testing gates

A PR is mergeable only when **all** of the following pass:

- [ ] Tests + coverage: `cargo test --workspace --all-features` green, ≥ 80% on touched paths (lib/SDK 80% per ADR-023 Rule 3.1 + ADR-040).
- [ ] Lint: `cargo clippy --all-targets -- -D warnings` + `cargo fmt --all -- --check`.
- [ ] `cargo deny check` advisories clear (when `deny.toml` lands on main; T19.4 target).
- [ ] `WORKLOG.md` updated per [ADR-025 v2.1](https://github.com/KooshaPari/phenotype-apps/blob/main/findings/2026-06-17-L5-103-worklog-v2-1.md) — 11-column schema including `device:` field.
- [ ] No new `unwrap()` / `panic!` in lib crates (allowed in tests + bin).
- [ ] Pattern contract preserved (ADR-038): no ad-hoc free functions, no global singletons, no I/O outside trait methods, errors are typed via `AdapterError`.
- [ ] New transport adapters implement the full `PortAdapter` trait (4 methods) — no `unsafe impl` shortcuts.

## 7. Release process

1. Bump version in `Cargo.toml` per SemVer; move unreleased `CHANGELOG.md` entries under the new version.
2. Open release PR: `chore/<req-id>-release-v<X>.<Y>.<Z>-<date>`; after merge, tag `v<X>.<Y>.<Z>` and push to trigger release workflow. Hotfixes cut a `fix/...` branch from the released tag and back-merge to `main` immediately.
3. Publish to crates.io as `pheno-port-adapter`.
4. **Breaking the `PortAdapter` trait** (any signature change) requires a major version bump + an ADR — the trait is the public contract that 19 other crates are migrating to (ADR-038 § Decision).

## 8. Support

- **Questions:** open a [Discussion](https://github.com/KooshaPari/phenotype-apps/discussions) — not an issue.
- **Bugs:** open an [Issue](https://github.com/KooshaPari/phenotype-apps/issues) with the PR template above; tag `area:port-adapter`.
- **Security:** see `SECURITY.md` — do NOT file public issues for vulns.

## 9. Pattern conformance (ADR-038, reference impl role)

Because `pheno-port-adapter` is the **reference impl** that 19 other pheno-* substrate crates migrate to, every change to the `PortAdapter` trait must be backward-compatible OR coordinated with the adoption matrix in ADR-038. New transport adapters are welcome as PRs (in-tree under `src/adapters/` or as out-of-tree Adapters per ADR-038's "out-of-tree first-class" rule). New methods on the trait require a default impl + minor version bump; removal of methods requires a major version bump + ADR.
