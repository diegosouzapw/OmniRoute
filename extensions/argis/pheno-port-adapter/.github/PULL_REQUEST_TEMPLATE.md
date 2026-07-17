## What / Why / How

<!-- 1-3 sentences each. Link the issue / ADR / DAG level L<n>-<seq>.
     For Port/Adapter changes, cite ADR-038 + the consumer crates affected. -->

Closes #ISSUE_NUMBER

## Test plan

<!-- [ ] unit  [ ] integ  [ ] e2e  [ ] manual
     [ ] coverage >= 80% (lib gate per ADR-040)  [ ] lint clean  [ ] WORKLOG.md updated
     [ ] labels: governance | L<n>-#<n>  +  area:<scope> -->

## Risk

<!-- Blast radius + rollback plan. For trait changes, list the 19 ad-hoc crates
     that may need to migrate to the new contract (per ADR-038 adoption matrix). -->

## Checklist

- [ ] I have read the [CONTRIBUTING.md](../CONTRIBUTING.md) guide.
- [ ] Tests pass (`cargo test --all-features --workspace`)
- [ ] Lint clean (`cargo clippy --all-targets -- -D warnings`)
- [ ] `cargo fmt --all -- --check` passes
- [ ] WORKLOG.md updated per v2.1 schema
- [ ] New transport adapters implement full `PortAdapter` trait (4 methods)
