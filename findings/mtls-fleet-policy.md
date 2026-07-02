# mTLS Fleet Roll-out Policy

## Scope
All inter-service (cluster-internal) API calls between OmniRoute microservices:
- Next.js ↔ OpenSSE Broker
- OpenSSE Broker ↔ Bifrost
- Bifrost ↔ SQLite (via encryption proxy)
- MCP Gateway ↔ provider executors

## Roll-out Phases
| Phase | Scope | Timeline | Verification |
|-------|-------|----------|--------------|
| 1 | Next.js ↔ OpenSSE | v30 cycle-20 | cert issued, handshake logs OK |
| 2 | OpenSSE ↔ Bifrost | v30 cycle-21 | mutual cert rotation test |
| 3 | SQLite encryption proxy | v31 cycle-22 | encrypted WAL files |
| 4 | MCP Gateway | v31 cycle-23 | full-mesh mTLS |

## Certificate Rotation
- Validity: 90d
- Renew: 14d before expiry (automated via cert-manager)
- Revocation: via CRL, checked on every handshake

## Enforcement
- Fail-closed: any non-mTLS request between in-scope services returns 526 (invalid SSL certificate)
- Observability: mTLS handshake success/failure metrics at `mtls_handshake_total{status="ok|fail"}`
