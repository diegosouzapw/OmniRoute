# Bifrost Upstream Health Check

**Date:** 2026-09-12 (Pacific)
**Repository:** [maximhq/bifrost](https://github.com/maximhq/bifrost)
**Auditor:** Jcode (automated)

---

## Summary: HEALTHY

Bifrost is a **very actively maintained, commercially-backed open-source project** with strong commit velocity, regular releases, and responsive maintainers. The single known security advisory was patched 3+ releases ago. This is a reliable upstream dependency for OmniRoute.

---

## Metrics

| Metric | Value | Assessment |
|--------|-------|------------|
| **Last commit** | 2026-09-12T20:24:58Z (today) | Excellent -- commits within hours |
| **Latest release** | v2.1.1 (2026-09-09) | 3 days ago, very fresh |
| **Release cadence** | Coordinated multi-plugin releases | Automated, professional |
| **Open issues** | 996 (includes PRs) | High volume but expected for popular project |
| **Closed issues** | >7,000+ (based on issue #7116) | Strong resolution rate |
| **Total commits** | 7,056 | High velocity (est. ~13 commits/day over 18 months) |
| **Stars** | 8,003 | Strong community adoption |
| **Forks** | 1,200 | Active fork ecosystem |
| **Contributors** | 50+ (est. from commit diversity) | Multi-contributor, not bus-factor-1 |
| **Primary contributor** | akshaydeo (2,205 commits) | Founder/maintainer is very active |
| **Other active contributors** | Constantine3, Huang-404-Q, Adarsh-jaiss, impoilure, michaeldunn9 | Healthy contributor base |
| **License** | Apache-2.0 | Permissive, enterprise-friendly |
| **Language** | Go | Matches OmniRoute sidecar needs |
| **Repo created** | 2025-03-19 | ~18 months old, mature |
| **Default branch** | `dev` | Active development branch |
| **Security tooling** | Snyk + SECURITY.md + .snyk policy | Responsible security posture |

---

## Release Details

### Latest Release: Bifrost HTTP v2.1.1
- **Published:** 2026-09-09T11:55:31Z
- **Core version:** v1.8.6
- **Framework version:** v1.6.2
- **Features:** Claude Cowork Proxy, Overhead Component Histogram, MCP Server Auth improvements, Virtual Key RBAC
- **Bug fixes:** Bedrock tool result documents, MCP JWT identity, streaming context handling
- **Maintenance:** Dependency upgrades (grpc v1.83.2)
- **Plugin releases (8):** telemetry, semanticcache, routing, prompts, otel, modelcatalogresolver, mocker, maxim, logging -- all coordinated on same date

### Release Process
- Automated multi-component release with version file tracking
- Coordinated core/framework/plugin versioning
- Docker images published: `maximhq/bifrost:v2.1.1` and `:latest`
- NPM distribution via `@maximhq/bifrost`

---

## Security Advisories

### GHSA-w98g-5w9p-p3rc: SSRF Deny-List Incomplete
- **Severity:** High
- **Published:** 2026-07-21
- **Affected:** `core <= 1.5.15`
- **Patched:** `core >= 1.5.16`
- **Description:** `isPublicIP()` in `core/providers/utils/fetch.go` did not reject CGNAT (100.64.0.0/10), IPv6 6to4 (2002::/16), NAT64 (64:ff9b::/96), or deprecated IPv6 site-local (fec0::/10) addresses. An attacker could bypass SSRF protections via multimodal image/document URLs in Bedrock/Vertex requests.
- **Status:** PATCHED in current release (v2.1.1 uses core v1.8.6, well above v1.5.16)
- **CWE:** CWE-918 (Server-Side Request Forgery)

### Other Advisories
- No additional public security advisories found.

---

## README Quality

**Rating: Excellent**

- Clear value proposition: "Fastest enterprise AI gateway (50x faster than LiteLLM)"
- Quick start guide with 3 steps (npx, Docker, API call)
- Comprehensive feature listing organized by category:
  - Core Infrastructure (unified interface, multi-provider, fallbacks, load balancing)
  - Advanced Features (MCP, semantic caching, multimodal, plugins, governance)
  - Enterprise & Security (budgets, OIDC, observability, secrets)
  - Developer Experience (zero-config, drop-in replacement, SDKs)
- 23+ provider support documented
- Helm charts and Terraform available
- Documentation site: docs.getbifrost.ai

---

## Contributor Activity Analysis

### Commit Frequency
- **7,056 commits** in ~18 months = ~13 commits/day average
- **Recent activity (Sep 12, 2026):** Multiple commits from 3+ different authors
- All recent commits are GPG-signed
- Commit messages follow conventional commits format with PR references

### Issue Management
- Issues use structured labels: `[Bug]`, `[Feature]`, `Status: Open`
- Active bug reporting from community members (Adarsh-jaiss filed 5+ detailed bugs in Sep 7-8)
- Bug reports include reproduction steps and analysis
- Issue creation is restricted (maintainer-controlled), reducing noise

### Code Quality Indicators
- CodeRabbit integration for automated review
- Snyk security scanning
- Pre-commit hooks configured
- E2E test suite with provider harness
- Regression tests included with bug fixes
- Graphite App used for stacked PRs

---

## Risk Assessment

### Low Risk (Acceptable)

1. **Bus Factor:** Primary contributor (akshaydeo) has 2,205 of 7,056 commits (~31%), but multiple other active contributors exist. Commercial backing from Maxim AI provides additional stability.

2. **Issue Backlog:** 996 open issues sounds high, but many are PRs and the project has closed thousands. The maintainer uses Graphite for stacked PRs and restricts issue creation, suggesting disciplined workflow.

3. **Security:** One high-severity SSRF vulnerability was responsibly disclosed, patched promptly (within the same major version), and is resolved in current releases. Snyk integration provides ongoing scanning.

4. **API Stability:** The project uses coordinated versioning (core/framework/plugins) and follows semver. The OpenAI-compatible API is their primary interface, reducing lock-in risk.

5. **Commercial Dependency:** Maxim AI is the primary maintainer. If Maxim pivots or shuts down, the Apache-2.0 license allows forks. The 8k stars and 1.2k forks provide community resilience.

### Medium Risk (Monitor)

1. **Enterprise Features:** Some features (adaptive load balancing, clustering, guardrails, MCP gateway) are enterprise-only. Verify that OmniRoute's use case only requires open-source features.

2. **Breaking Changes:** The project is pre-1.0 in some components (routing plugin v1.0.2). API surface may shift between minor versions.

3. **Go Module Complexity:** Multi-module monorepo (core, framework, plugins) can create dependency resolution challenges when forking or vendoring.

---

## Recommendation: COMMIT

**Rationale:**

1. **Upstream is healthy and actively maintained** -- daily commits, regular releases, commercial backing
2. **Security posture is responsible** -- Snyk, SECURITY.md, prompt vulnerability patching
3. **License is permissive** -- Apache-2.0 allows fork, modify, and deploy without restrictions
4. **Feature set matches OmniRoute needs** -- OpenAI-compatible API, provider routing, failover, load balancing
5. **Community traction is strong** -- 8k stars, 1.2k forks indicates industry adoption
6. **Go-native** -- No FFI/interop overhead; direct import as sidecar

**Conditions for continued health:**
- Monitor release cadence (should remain weekly+)
- Track security advisories (subscribe to repo notifications)
- Pin to specific versions (not `latest`) in production
- Test new releases in staging before promoting
- Verify enterprise feature boundaries before relying on advanced features

---

## Appendix: Key URLs

| Resource | URL |
|----------|-----|
| Repository | https://github.com/maximhq/bifrost |
| Releases | https://github.com/maximhq/bifrost/releases |
| Security Advisories | https://github.com/maximhq/bifrost/security/advisories |
| Documentation | https://docs.getbifrost.ai |
| Enterprise | https://www.getmaxim.ai/bifrost/enterprise |
| NPM Package | https://www.npmjs.com/package/@maximhq/bifrost |
| Docker Hub | https://hub.docker.com/r/maximhq/bifrost |
