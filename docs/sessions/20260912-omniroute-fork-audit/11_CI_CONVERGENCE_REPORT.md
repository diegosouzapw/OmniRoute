# 11 -- CI Convergence Report

> **Date**: 2026-09-13
> **Status**: Analysis complete

## Summary

| Metric | Count |
|--------|-------|
| **Total fork workflows** | 79 |
| **Upstream workflows (v3.8.51)** | 26 |
| **Shared workflows** | 23 |
| **Fork-only workflows** | 56 |

## Shared Workflows (23)

These exist in both fork and upstream:

| Workflow | Fork | Upstream | Status |
|----------|------|----------|--------|
| ci.yml | ✅ | ✅ | Divergent (fork has quality gates) |
| claude.yml | ✅ | ✅ | Fork-only (AI agent) |
| codeql.yml | ✅ | ✅ | Divergent |
| dast-smoke.yml | ✅ | ✅ | Divergent |
| deploy-vps.yml | ✅ | ✅ | Fork-only (VPS deploy) |
| docker-publish.yml | ✅ | ✅ | Divergent |
| electron-release.yml | ✅ | ✅ | Divergent |
| lock-released-branch.yml | ✅ | ✅ | Divergent |
| mutation-redundancy.yml | ✅ | ✅ | Fork addition |
| nightly-compat.yml | ✅ | ✅ | Divergent |
| nightly-llm-security.yml | ✅ | ✅ | Fork addition |
| nightly-mutation.yml | ✅ | ✅ | Divergent |
| nightly-property.yml | ✅ | ✅ | Fork addition |
| nightly-release-green.yml | ✅ | ✅ | Divergent |
| nightly-resilience.yml | ✅ | ✅ | Divergent |
| nightly-schemathesis.yml | ✅ | ✅ | Divergent |
| npm-publish.yml | ✅ | ✅ | Divergent |
| opencode-plugin-ci.yml | ✅ | ✅ | Fork addition |
| opencode-provider-ci.yml | ✅ | ✅ | Fork addition |
| quality.yml | ✅ | ✅ | Divergent |
| scorecard.yml | ✅ | ✅ | Divergent |
| semgrep.yml | ✅ | ✅ | Fork addition |
| wiki-sync.yml | ✅ | ✅ | Fork addition |

## Fork-Only Workflows (56)

These are unique to the fork:

- **Infrastructure**: 20+ workflows for Phenotype infrastructure (Pheno agents, fleet audit, etc.)
- **Quality gates**: Additional quality checks not in upstream
- **Release**: Custom release channels and deployment
- **Security**: Enhanced security scanning (gitleaks, trufflehog, etc.)
- **Performance**: Latency budgets, SLO burn rate, performance regression
- **Compliance**: SBOM generation, CycloneDX, dependency review

## Recommendations

1. **Keep fork-only workflows** — They represent infrastructure investment unique to Phenotype
2. **Monitor shared workflow divergence** — When upgrading upstream, check if shared workflows have changed
3. **No immediate action needed** — The 56 fork-only workflows are intentional infrastructure
4. **Consider labeling** — Add comments to fork-only workflows noting they're fork-specific

## Risk Assessment

- **Low risk**: Fork-only workflows don't affect upstream compatibility
- **Medium risk**: Shared workflow divergence could cause merge conflicts during upstream sync
- **Mitigation**: When cherry-picking from upstream, skip workflow changes unless critical
