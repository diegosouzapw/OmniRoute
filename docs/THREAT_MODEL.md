# Threat Model — OmniRoute (2026-06-18)

**Status**: Authoritative. Supersedes any inline threat notes in code comments.
**Methodology**: STRIDE (Spoofing, Tampering, Repudiation, Information
Disclosure, Denial of Service, Elevation of Privilege) per endpoint.
**Scope**: v1 client API + management surface + agent dispatch + relay.
**Re-evaluation cadence**: every 90 days OR on any new public route
addition / new auth tier change.
**Owner**: security-circle lead.
**Related**: `SECURITY.md` (disclosure policy), `authz-inventory` (live
tier classification), `docs/openapi.yaml` (API surface), `docs/architecture/`
(security boundaries).

---

## 1. Trust boundaries

```
┌────────────────────────────────────────────────────────────────────┐
│ Public Internet                                                    │
│   └── TLS termination (Caddy / cloud LB)                          │
│         │                                                          │
│         ▼  ◀── Trust boundary 1: edge ↔ application                │
│ ┌──────────────────────────────────────────────────────────────┐   │
│ │  Next.js App Router (3 replicas behind Caddy LB)              │   │
│ │    ┌──────────────────────────────────────────────┐           │   │
│ │    │  src/middleware.ts (auth + tier routing)    │           │   │
│ │    │   ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │           │   │
│ │    │   │ PUBLIC │ │CLIENT  │ │MANAGE  │ │ALWAYS│ │           │   │
│ │    │   │ /health│ │ /v1/*  │ │/settn  │ │PROT  │ │           │   │
│ │    │   └────────┘ └────┬───┘ └────┬───┘ └──────┘ │           │   │
│ │    └──────────────────┼─────────┼──────────────┘              │   │
│ │                       ▼         ▼                             │   │
│ │    ┌─────────────────────────┐ ┌──────────────────────────┐   │   │
│ │    │  src/lib/sse/handlers   │ │ src/lib/localDb          │   │   │
│ │    │  (translator + chat)    │ │  (sql.js encrypted store)│   │   │
│ │    └──────────┬──────────────┘ └────────────┬─────────────┘   │   │
│ │               │                              │                 │   │
│ │               ▼  ◀── Trust boundary 2: app ↔ upstream          │   │
│ └───────────────┼──────────────────────────────┼─────────────────┘   │
│                 ▼                              ▼                    │
│ ┌──────────────────────────┐    ┌────────────────────────────┐      │
│ │ Provider APIs            │    │ Filesystem (DB + secrets)  │      │
│ │  (OpenAI, Anthropic, …)  │    │  + Redis (session/quota)   │      │
│ └──────────────────────────┘    └────────────────────────────┘      │
└────────────────────────────────────────────────────────────────────┘
```

**Boundary 1** (edge ↔ app): Mitigated by TLS at the edge + auth gate in
`src/middleware.ts`. Anything past this boundary is fully authenticated
unless explicitly in the PUBLIC tier.

**Boundary 2** (app ↔ upstream): Mitigated by per-provider key storage
in `src/lib/vault/` and the per-(token,IP) relay rate limit.

**Local-only boundary** (loopback-only routes): documented in
`src/server/authz/routeGuard.ts` as `LOCAL_ONLY_API_PREFIXES`; known
CVE class is "spawn capable route exposed to non-local traffic"
(GHSA-fhh6-4qxv-rpqj).

---

## 2. STRIDE legend

| Letter | Threat | Question it answers |
|---|---|---|
| **S** | Spoofing | Can an attacker pretend to be a legitimate principal? |
| **T** | Tampering | Can an attacker modify data in transit or at rest? |
| **R** | Repudiation | Can a principal deny an action they took? |
| **I** | Information disclosure | Can an attacker read data they shouldn't? |
| **D** | Denial of service | Can an attacker degrade or block service? |
| **E** | Elevation of privilege | Can an attacker gain more access than intended? |

Severity scale: **L**ow (paper), **M**edium (real exploit possible), **H**igh
(active exploitation likely or already seen in the wild).

---

## 3. Per-endpoint STRIDE analysis (top-20 highest-risk routes)

The 50 v1 route handlers are scored below. Top-20 highest-risk routes
get a full STRIDE row; the remaining 30 are covered by a tier-level
summary in § 4.

### 3.1 `/api/v1/responses` — POST (primary inference)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | M — Bearer key stolen → caller identity spoofed | Keys hashed (SHA-256) at rest in `src/lib/db/apiKeys.ts`; revocation list in `src/lib/db/apiKeys.ts#revokeKey` |
| **T** | M — Request body modified in transit | TLS at edge; body re-validated against `ResponsesRequest` schema in `open-sse/handlers/responseSanitizer.ts` |
| **R** | L — Caller denies a request | `src/lib/audit/` writes append-only row with `key_id`, `request_hash`, `model`, `tokens`; hash-chain integrity (DEBT-051 follow-up) |
| **I** | M — Provider API key leaked via response | `open-sse/handlers/responseTranslator.ts` strips `x-api-key` headers before proxying; response redaction middleware |
| **D** | H — High-cost model invocation = $$ DoS | Per-key rate limit (`open-sse/services/rateLimitManager.ts`); per-tenant quota pool (`src/lib/db/quotaPools.ts`); DEBT-001 TPM/TPD reservoir is **not** yet enforced |
| **E** | L — Bearer scope escalation | API keys carry explicit `scopes` array; routes require specific scopes; `requireManagementAuth` enforces management tier |

### 3.2 `/api/v1/relay/chat/completions` — POST (serverless relay)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | M — Relay token theft | Tokens hashed with SHA-256 + per-token ID column; per-(token,IP) rate limit in `src/app/api/v1/relay/chat/completions/route.ts:38-58` |
| **T** | M — Token rotation bypass | Token records have `revoked_at`; check happens before each request |
| **R** | L — Forensic headers sanitized | `sanitizeForensicHeader` strips CR/LF; length cap 256; IP/UA never echoed back to client |
| **I** | H — IP-bucket map leaks | In-memory only, per-instance, capped at 10,000 entries; not persisted; see DEBT-038 (in-memory state loss on restart) |
| **D** | M — Per-(token,IP) abuse | `RELAY_IP_PER_MINUTE=30` default; attacker rotates IPs to spread, hits per-token wall |
| **E** | M — Token scope creep | Tokens carry `allowedModels[]`; reject on model-not-in-list |

### 3.3 `/api/v1/embeddings` — POST

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L — Same as 3.1 | Same auth + key model |
| **T** | L — Inputs are vectors; tampered embedding not useful | Re-encode on receive; reject dimension mismatch |
| **R** | L | `src/lib/audit/` row written |
| **I** | M — Embedding vectors can leak training data | Reject requests with PII patterns (regex) before forwarding; DEBT-052 follow-up |
| **D** | L — Embeddings cheaper than chat | Quota pool cap |
| **E** | L | Bearer scope |

### 3.4 `/api/v1/rerank` — POST

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | Same auth |
| **T** | L | |
| **R** | L | |
| **I** | M — Documents contain user content | Per-tenant key isolation; audit log captures doc hash, not content |
| **D** | L | |
| **E** | L | |

### 3.5 `/api/v1/moderations` — POST

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | H — Moderation inputs are sensitive user content | Encrypted in transit (TLS); not logged; flag results cached with TTL |
| **D** | L | |
| **E** | L | |

### 3.6 `/api/v1/audio/speech` — POST (TTS)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | L — Audio is synthesised from input | Same as 3.1 |
| **D** | M — Long TTS = bandwidth burn | `input` cap 4096 chars; per-key rate limit |
| **E** | L | |

### 3.7 `/api/v1/audio/transcriptions` — POST (STT, multipart)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | M — Multipart body tampered | `multipart-parser` validates Content-Length + boundary; size cap 25 MB |
| **R** | L | |
| **I** | H — Audio contains user PII / secrets | TTL cache; never written to disk by default; redaction of credit-card-like sequences in `open-sse/executors/chatgpt-web.ts` (per-file TODO, see DEBT-019) |
| **D** | M — Large audio = bandwidth + provider cost | 25 MB cap; rate limit |
| **E** | L | |

### 3.8 `/api/v1/images/generations` — POST

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | L — Generated images are public URLs | URLs are signed with TTL; provider-controlled CDN |
| **D** | M — Image gen is $expensive | Per-key cost-budget middleware (`src/lib/middleware/costBudget.ts`, added in [the MCP router substrate (per ADR-013 polyglot reuse via canonical ports)]) |
| **E** | L | |

### 3.9 `/api/v1/videos/generations` — POST (async)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | M — Long-running async job, hard to attribute | Job records include `key_id`, `request_id`, `created_at`; result includes signed URL with TTL |
| **I** | M — Generated video may contain PII | Same as 3.8 |
| **D** | M — Video gen is very $expensive | Cost-budget middleware; max 10-second durations |
| **E** | L | |

### 3.10 `/api/v1/files` — POST (multipart upload)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | M — Uploaded file attributed to wrong key | `key_id` captured at upload; immutable record |
| **T** | H — Malicious file (zip bomb, polyglot) | Size cap 25 MB; MIME sniff + magic-byte check; AV scan is **not** performed (DEBT-053 follow-up) |
| **R** | L | |
| **I** | H — Files contain user PII | Encrypted at rest in `src/lib/vault/`; per-tenant access control |
| **D** | M — Large uploads | Size cap + rate limit |
| **E** | L | |

### 3.11 `/api/v1/files/{id}/content` — GET

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | H — IDOR (file belonging to other tenant) | Per-tenant scope check; `requireTenantScope` middleware (added in v3.8.25) |
| **T** | L | |
| **R** | L | |
| **I** | H — Tenant isolation breach = data leak | Per-tenant prefix in file storage; cross-tenant read attempt logged + 403 |
| **D** | L | |
| **E** | L | |

### 3.12 `/api/v1/batches` — POST (create batch)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | M — Batch input file modified after upload | Content hash stored at upload; mismatch on read = reject |
| **R** | L | |
| **I** | M — Input file contains PII | Same as 3.10 |
| **D** | M — Large batch | 50k row cap per batch |
| **E** | L | |

### 3.13 `/api/v1/batches/delete-completed` — POST

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | H — Mass delete | Requires manage-scope auth; `requireManagementAuth` enforced; audit log captures `key_id` |
| **R** | L | |
| **I** | M — Output files may leak | Soft-delete with 7-day retention before GC |
| **D** | L | |
| **E** | M — A misconfigured client could trigger this | Auth gate prevents; no anonymous access |

### 3.14 `/api/v1/agents/tasks` — POST (cloud-agent dispatch)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | H — Prompt injection in task `prompt` | `withInjectionGuard` middleware (per `src/app/api/v1/responses/route.ts:6`); pattern blocklist + sandboxed tool execution |
| **R** | M — Long-running agent task, attribution | Task ID + `key_id` + `created_at` recorded; agent result signed by provider |
| **I** | H — Agent reads user repo / credentials | Provider-scoped credentials; least-privilege OAuth; agent result sandboxed before return |
| **D** | M — Long-running agent = $$ burn | 10-minute default timeout; configurable `timeoutSeconds` |
| **E** | M — Agent tool calls could exceed scope | Tool allowlist per provider; rejection in `open-sse/executors/` |

### 3.15 `/api/v1/agents/credentials` — GET (list stored creds)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | H — Leaked credential metadata enables targeted phishing | Returns only `provider`, `hasValue`, `updatedAt` (NEVER the value); requires manage-scope auth |
| **D** | L | |
| **E** | L | |

### 3.16 `/api/v1/me/status` — GET (caller introspection)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | M — Reveals quota usage; could enable timing attacks | Rate-limited; per-key only; no cross-key reads |
| **D** | L | |
| **E** | L | |

### 3.17 `/api/v1/providers/{provider}/models` — GET

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | M — Reveals provider allowlist | Required for client UX; per-key scope |
| **D** | L | |
| **E** | L | |

### 3.18 `/api/v1/web/fetch` — POST (server-side fetch)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | L | |
| **T** | L | |
| **R** | L | |
| **I** | H — Fetched content could be exfiltrated via prompt injection | Content goes through `withInjectionGuard`; explicit extract modes; URL allowlist (default-deny, see DEBT-054) |
| **D** | M — Recursive fetch = bandwidth burn | Max redirects 3; max 5 MB response; timeout 10s |
| **E** | L | |

### 3.19 `/api/v1/vscode/{token}/v1/chat/completions` — POST (VSCode shim)

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | M — VSCode token theft = long-lived impersonation | Tokens are 256-bit, single-purpose, scoped to VSCode-CLI; revokable from `/api/keys/{id}` |
| **T** | L | |
| **R** | L | |
| **I** | M — Token in URL = logged in access logs | Token treated as secret; logs hash + last-4 only |
| **D** | M — Per-token rate limit (lower than API key) | `VSCODECLI_RATE_LIMIT=10` req/min default |
| **E** | L | |

### 3.20 `/api/v1/ws` — WebSocket

| STRIDE | Risk | Mitigation |
|---|---|---|
| **S** | M — WS upgrade lacks standard Bearer header | Subprotocol-based auth: `Sec-WebSocket-Protocol: bearer, <token>`; per-connection scope check |
| **T** | M — WS message frames tampered | TLS-only (`wss://`); reject `ws://` in prod |
| **R** | L | Connection ID + auth principal recorded at handshake |
| **I** | H — Long-lived connection = larger blast radius | 1-hour max connection; heartbeat every 30s; auto-disconnect on auth revoke |
| **D** | H — Many WS = connection table exhaustion | Per-IP WS cap 5; per-key cap 20; rate limit per message |
| **E** | L | |

---

## 4. Tier-level summary (remaining 30 routes)

Routes in the same tier inherit the same baseline mitigations. Per-route
deltas are documented in `docs/openapi.yaml` (request schema constraints).

| Tier | Count | Baseline mitigations | Residual risks |
|---|---|---|---|
| PUBLIC (`/api/health`, `/api/version`, `/_next/*`) | 3 | No auth; rate limit; static response | DoS via flooding (mitigated at LB) |
| CLIENT_API inference (`/v1/audio`, `/v1/moderations`, `/v1/rerank`, `/v1/search`, `/v1/embeddings`, `/v1/responses`, `/v1/relay/*`) | 8 | Bearer auth + per-key rate limit + audit log + cost budget | TPM/TPD fairness (DEBT-001) |
| CLIENT_API files (`/v1/files`, `/v1/files/{id}`, `/v1/batches/*`) | 5 | Bearer auth + per-tenant prefix + AV scan absent | DEBT-053 (AV) |
| CLIENT_API combos/me/providers | 3 | Bearer auth + cached | None material |
| CLIENT_API vscode shim | 13 | Token-scoped + per-token rate limit | Token in URL log noise |
| MANAGEMENT (`/api/settings/*`, `/api/keys/*`, `/api/quota/*`, `/api/management/*`) | ~60 | Manage-scope + dashboard session + 2FA suggested | See SECURITY.md for P0 items |
| ALWAYS_PROTECTED (shutdown, DB settings) | ~5 | Auth + re-auth for security-impacting changes | None material |
| LOCAL_ONLY (loopback spawn routes) | ~8 | Loopback-only + bypass-constant gated by manage-scope | GHSA-fhh6-4qxv-rpqj class if exposed |

---

## 5. Mitigations to add (next quarter)

| ID | Mitigation | Pillar target | Effort |
|---|---|---|---|
| TM-01 | DEBT-001: TPM/TPD token-bucket fairness for relay + inference | D, E (cost) | M |
| TM-02 | DEBT-051: Hash-chain integrity for `src/lib/audit/` rows | R | M |
| TM-03 | DEBT-053: AV scan on `/v1/files` upload (ClamAV or external API) | T, I | L |
| TM-04 | DEBT-054: URL allowlist for `/v1/web/fetch` | I, D | M |
| TM-05 | OIDC/SAML SSO for management tier (audit L46) | S | L |
| TM-06 | TOTP MFA for manage-scope users (audit L49) | S, E | M |
| TM-07 | Field-level encryption for PII columns (audit L47) | I | L |

---

## 6. Review log

| Date | Reviewer | Change |
|---|---|---|
| 2026-06-18 | security-circle lead | Initial STRIDE per endpoint, top-20 highest-risk routes + tier summary |
| 2026-06-25 (planned) | security-circle | Re-score after DEBT-001, DEBT-051 close-outs |
| 2026-09-18 (planned) | security-circle | Quarterly full re-review; refresh mitigations list |
