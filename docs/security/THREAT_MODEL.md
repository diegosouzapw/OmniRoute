# OmniRoute Threat Model

> STRIDE-based threat model for the OmniRoute AI gateway.

**Last reviewed**: 2026-07-09
**Review cadence**: Quarterly
**Owner**: Platform Security

---

## System Boundaries

```
[Client] ──HTTPS──> [OmniRoute Gateway] ──HTTPS──> [Upstream AI Providers]
                            │
                    ┌───────┴───────┐
                    │               │
              [SQLite DB]    [OTel Collector]
              (config,       (traces, metrics)
               usage, audit)
```

---

## Assets

| Asset | Sensitivity | Description |
|-------|-------------|-------------|
| API keys (upstream) | CRITICAL | Provider authentication credentials |
| API keys (OmniRoute) | HIGH | User-generated access keys for the gateway |
| JWT tokens | HIGH | Dashboard session tokens |
| Chat conversation data | MEDIUM | User prompts and model responses (in transit) |
| Usage data | MEDIUM | Token counts, costs, routing decisions |
| Configuration | LOW | Provider list, routing strategies |
| Audit logs | MEDIUM | MCP tool invocations, webhook events |

---

## STRIDE Analysis

### Spoofing

| Threat | Risk | Mitigation |
|--------|------|------------|
| Impersonate OmniRoute via fake API | HIGH | API key authentication on all management routes |
| Spoof upstream provider | MEDIUM | TLS certificate verification on upstream connections |
| Fake OAuth callback | MEDIUM | State parameter validation, PKCE flow |

### Tampering

| Threat | Risk | Mitigation |
|--------|------|------------|
| Modify request body in transit | HIGH | HTTPS-only, HSTS (2yr preload) |
| Tamper with SQLite DB | MEDIUM | File permissions (`chmod 600`) |
| Tamper with Webhook payload | MEDIUM | HMAC-SHA256 signature verification |
| Tamper with migration SQL | LOW | Migrations run inside transactions |
| Tamper with deployment artifact | MEDIUM | CI/CD provenance via BUILD_SHA |

### Repudiation

| Threat | Risk | Mitigation |
|--------|------|------------|
| Deny API call origin | MEDIUM | API key attribution in audit logs |
| Deny configuration change | MEDIUM | MCP audit table records all mutations |
| Deny webhook delivery | MEDIUM | Webhook dispatch logging with HMAC verification |

### Information Disclosure

| Threat | Risk | Mitigation |
|--------|------|------------|
| Leak upstream API keys in logs | HIGH | `buildErrorBody()` sanitizes all error responses |
| Leak chat content via error | MEDIUM | `sanitizeErrorMessage()` strips raw error messages |
| Leak PII from LLM output | MEDIUM | PII masker guardrail (hot-reloadable) |
| Side-channel via timing | LOW | Rate limiting obscures timing patterns |

### Denial of Service

| Threat | Risk | Mitigation |
|--------|------|------------|
| API key brute force | MEDIUM | Rate limiting (token bucket, TPM/TPD) |
| Chat endpoint resource exhaustion | HIGH | Rate limiting per key, concurrent request caps |
| SQLite lock contention | MEDIUM | WAL mode, connection pooling |
| OAuth token refresh storm | LOW | In-memory token caching with TTL |
| SSRF to internal network | MEDIUM | Outbound URL validation (allowlist/denylist) |

### Elevation of Privilege

| Threat | Risk | Mitigation |
|--------|------|------------|
| Access management routes without auth | HIGH | Auth classification: PUBLIC / CLIENT_API / MANAGEMENT |
| Elevate from client to admin | HIGH | Management password hash verification |
| Bypass scope restrictions | MEDIUM | MCP scope enforcement before handler dispatch |
| Plugin sandbox escape | MEDIUM | Node `vm` with hard timeout + restricted require |
| SQL injection | LOW | better-sqlite3 parameterized queries |

---

## Key Mitigations Summary

| Control | Coverage | Status |
|---------|----------|--------|
| Transport encryption (TLS) | All external | ✅ |
| CSP headers | Dashboard UI | ✅ |
| HSTS preload | All HTTP | ✅ |
| API key auth | Management + Client API | ✅ |
| JWT auth | Dashboard | ✅ |
| Rate limiting | Per-key, per-endpoint | ✅ |
| Circuit breakers | OAuth, API-key, Local | ✅ |
| Error sanitization | All HTTP/SSE/MCP responses | ✅ |
| PII masker | Response-side LLM output | ✅ |
| Prompt injection guard | Chat completions | ✅ |
| SSRF validation | Outbound connections | ✅ |
| Audit logging | MCP, webhooks, API calls | ✅ |
| SBOM generation | CI/CD | ✅ |
| CodeQL scanning | CI (PR + push) | ✅ |
| Gitleaks scanning | CI (PR + push) | ✅ |
| Dependency audit | CI (npm audit) | ✅ |
| OpenSSF Scorecard | Weekly | ✅ |

---

## Outstanding Risks

| Risk | Priority | Remediation Plan |
|------|----------|-----------------|
| No dependency review action in CI | MEDIUM | Add `dependency-review-action` to CI |
| No fuzz testing on API endpoints | LOW | Add API fuzz target |
| Electron app not code-signed | MEDIUM | Configure `electron-builder` code signing |
| No incident response runbook | MEDIUM | Create `docs/ops/INCIDENT_RESPONSE.md` |
| No disaster recovery test | LOW | Schedule quarterly DR drill |
