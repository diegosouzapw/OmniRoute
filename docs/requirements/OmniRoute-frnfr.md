# OmniRoute Functional & Non-Functional Requirements Registry

**Status:** Starter registry (backfilled 2026-05-31)  
**Repo:** https://github.com/KooshaPari/OmniRoute  
**Stack:** TypeScript/Next.js 16, open-sse workspace, Electron desktop

---

## Functional Requirements

### FR-OMNI-001: Unified AI Gateway Proxy
**Description:** Route requests to 160+ LLM providers (OpenAI, Anthropic, Gemini, etc.) via single `/v1/*` endpoint  
**Status:** Shipped  
**Scope:** Chat Completions, Embeddings, Image Generation

### FR-OMNI-002: Automatic Fallback & Combo Routing
**Description:** 14 routing strategies (priority, weighted, round-robin, cost-optimized, etc.) with per-target error handling and circuit breaker  
**Status:** Shipped  
**Scope:** open-sse/services/combo.ts, 3-layer resilience (provider breaker / connection cooldown / model lockout)

### FR-OMNI-003: Free Tier Provider Support
**Description:** Native support for 100% free providers (Qwen, Qoder, Gemini CLI, Kiro)  
**Status:** Shipped

### FR-OMNI-004: OAuth & Credential Management
**Description:** Multi-account support per provider with auto round-robin; SOCKS5 proxy support; encrypted AES-256-GCM credential storage  
**Status:** Shipped

### FR-OMNI-005: MCP Server (37 tools)
**Description:** Model Context Protocol endpoint with 30 base tools + 3 memory + 4 skills across 13 scopes  
**Status:** Shipped  
**Scope:** open-sse/mcp-server/, managed runtime state, tool audit trail

### FR-OMNI-006: A2A Protocol & Agent Skills
**Description:** JSON-RPC 2.0 agent protocol with 5 extensible skills (smart-routing, quota-management, provider-discovery, cost-analysis, health-report)  
**Status:** Shipped  
**Scope:** src/lib/a2a/, A2A_SKILL_HANDLERS

### FR-OMNI-007: Responses API
**Description:** Full `/v1/responses` support for Codex with TransformStream streaming  
**Status:** Shipped

### FR-OMNI-008: Electron Desktop App
**Description:** Cross-platform desktop client with dashboard UI (Providers, Combos, Analytics, Health, Settings, CLI Tools, Usage Logs)  
**Status:** Shipped  
**Scope:** electron/ workspace

### FR-OMNI-009: Persistent Analytics & Usage Logs
**Description:** SQLite domain modules (45+ files, 55 migrations) for provider health, combo routing decisions, usage tracking, cost analysis  
**Status:** Shipped  
**Scope:** src/lib/db/

### FR-OMNI-010: Conversational Memory System
**Description:** FTS5 + optional Qdrant integration for multi-turn context retention and reasoning replay  
**Status:** Shipped  
**Scope:** src/lib/memory/

### FR-OMNI-011: Guardrails & Safety (PII/Injection/Vision)
**Description:** Prompt injection guards, PII detection, vision input sanitization, error message filtering  
**Status:** Shipped  
**Scope:** src/lib/guardrails/, docs/security/

### FR-OMNI-012: International Localization
**Description:** RTL support (Arabic, Persian, Hebrew, Urdu) + docs in 23 languages  
**Status:** Shipped  
**Scope:** docs/i18n/

### FR-OMNI-013: CLI Entry Point & Services
**Description:** `bin/` CLI invocation; embedded service orchestration (npm install, auto-start, health checks)  
**Status:** Shipped

### FR-OMNI-014: Cloud Agent Integration (Codex, Devin, Jules)
**Description:** Pluggable cloud agent adapters with task creation, plan approval, streaming responses  
**Status:** Shipped  
**Scope:** src/lib/cloudAgent/

---

## Non-Functional Requirements

### NFR-OMNI-001: Type Safety & Linting
**Description:** TypeScript strict (ES2022), ESLint zero-error enforcement, coverage gate ≥75% (statements/lines/functions) / ≥70% (branches)  
**Status:** Shipped

### NFR-OMNI-002: Security Posture
**Description:** Credential encryption (AES-256-GCM), prompt injection guard, PII detection, error sanitization (no stack traces in responses), SOCKS5 proxy, rate limiting, policy-based access control  
**Status:** Shipped  
**Reference:** docs/security/ (PUBLIC_CREDS.md, ERROR_SANITIZATION.md, GUARDRAILS.md, COMPLIANCE.md)

### NFR-OMNI-003: Resilience & Availability
**Description:** 3-layer circuit breaker (provider, connection, model), lazy recovery, exponential backoff, anti-thundering-herd guards  
**Status:** Shipped  
**Reference:** docs/architecture/RESILIENCE_GUIDE.md

### NFR-OMNI-004: Performance
**Description:** StreamingAPI / SSE chunking, composite request retries with configurable backoff, streaming request bodies for large prompts  
**Status:** Shipped  
**Target:** <200ms p99 latency for routing decision

### NFR-OMNI-005: Auditability & Observability
**Description:** Structured logging (pino), MCP tool audit trail (mcp_audit table), circuit breaker state introspection, cost tracking  
**Status:** Shipped

---

## Traceability Notes

- **Hexagonal Architecture:** API routes → handlers (open-sse) → translators/executors → domain logic  
- **Test Coverage:** Unit (Node.js test runner) + Vitest (MCP/autoCombo) + E2E (Playwright) + protocols (MCP+A2A)  
- **Hard Rules:** 17 documented in CLAUDE.md (no eval, no raw SQL, validated Zod schemas, sanitized error responses, no public creds as literals)  
- **Conventions:** 2-space indent, Conventional Commits (feat/fix/docs scopes: db/sse/oauth/dashboard/api/cli/docker/ci/mcp/a2a), pre-commit hooks
