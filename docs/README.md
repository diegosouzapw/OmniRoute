---
title: "OmniRoute Documentation"
version: 3.8.0
lastUpdated: 2026-05-13
---

# OmniRoute Documentation

Navigable index of the OmniRoute documentation set. Topics are grouped by intent so you can find what you need quickly.

> Looking for the project overview, install steps, or release notes? See the root [README.md](../README.md), [CHANGELOG.md](../CHANGELOG.md), and [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## architecture/

How the system is put together — read these to understand the runtime, code layout, and resilience model.

- [ARCHITECTURE.md](architecture/ARCHITECTURE.md) — high-level system architecture (request pipeline, layers, modules).
- [CODEBASE_DOCUMENTATION.md](architecture/CODEBASE_DOCUMENTATION.md) — engineering reference for the codebase.
- [REPOSITORY_MAP.md](architecture/REPOSITORY_MAP.md) — directory-by-directory navigation guide.
- [AUTHZ_GUIDE.md](architecture/AUTHZ_GUIDE.md) — authorization pipeline (route classifier + policy engine).
- [RESILIENCE_GUIDE.md](architecture/RESILIENCE_GUIDE.md) — provider circuit breaker, connection cooldown, and model lockout.

## guides/

Task-focused walkthroughs for operators and end users.

- [SETUP_GUIDE.md](guides/SETUP_GUIDE.md) — first-time setup of OmniRoute.
- [USER_GUIDE.md](guides/USER_GUIDE.md) — daily usage of the dashboard and API.
- [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md) — running OmniRoute under Docker.
- [ELECTRON_GUIDE.md](guides/ELECTRON_GUIDE.md) — desktop (Electron) builds.
- [TERMUX_GUIDE.md](guides/TERMUX_GUIDE.md) — running on Android via Termux.
- [PWA_GUIDE.md](guides/PWA_GUIDE.md) — installing the dashboard as a PWA.
- [TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md) — common issues and fixes.
- [UNINSTALL.md](guides/UNINSTALL.md) — clean removal steps.
- [I18N.md](guides/I18N.md) — translation and locale workflow.
- [FEATURES.md](guides/FEATURES.md) — dashboard feature gallery.

## reference/

Lookup material — API surface, environment variables, CLI flags, provider catalog.

- [API_REFERENCE.md](reference/API_REFERENCE.md) — REST API endpoints and shapes.
- [PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) — auto-generated provider catalog.
- [openapi.yaml](reference/openapi.yaml) — OpenAPI 3.1 spec for the public API.
- [ENVIRONMENT.md](reference/ENVIRONMENT.md) — environment variables reference.
- [CLI-TOOLS.md](reference/CLI-TOOLS.md) — bundled CLI commands.
- [FREE_TIERS.md](reference/FREE_TIERS.md) — free-tier LLM provider directory.

## frameworks/

Pluggable subsystems exposed to clients, agents, and operators.

- [MCP-SERVER.md](frameworks/MCP-SERVER.md) — Model Context Protocol server.
- [A2A-SERVER.md](frameworks/A2A-SERVER.md) — Agent-to-Agent (A2A) JSON-RPC server.
- [AGENT_PROTOCOLS_GUIDE.md](frameworks/AGENT_PROTOCOLS_GUIDE.md) — A2A / ACP / Cloud agent overview.
- [CLOUD_AGENT.md](frameworks/CLOUD_AGENT.md) — cloud agent runtime and providers.
- [SKILLS.md](frameworks/SKILLS.md) — Skills framework (sandboxed extension).
- [MEMORY.md](frameworks/MEMORY.md) — persistent memory (FTS5 + Qdrant).
- [WEBHOOKS.md](frameworks/WEBHOOKS.md) — webhook events and dispatch.
- [EVALS.md](frameworks/EVALS.md) — eval suites.

## routing/

Combo routing, scoring, and replay.

- [AUTO-COMBO.md](routing/AUTO-COMBO.md) — Auto-Combo (9-factor scoring, 14 strategies).
- [REASONING_REPLAY.md](routing/REASONING_REPLAY.md) — reasoning replay flow.

## security/

Guardrails, compliance, stealth, and the mandatory patterns for handling public credentials and error messages.

- [GUARDRAILS.md](security/GUARDRAILS.md) — PII, prompt injection, vision guardrails.
- [COMPLIANCE.md](security/COMPLIANCE.md) — audit trails and compliance.
- [STEALTH_GUIDE.md](security/STEALTH_GUIDE.md) — TLS / fingerprint stealth.
- [PUBLIC_CREDS.md](security/PUBLIC_CREDS.md) — **mandatory** pattern for embedding public upstream OAuth client_id/secret + Firebase Web keys without tripping secret scanners.
- [ERROR_SANITIZATION.md](security/ERROR_SANITIZATION.md) — **mandatory** pattern for routing every error response through `sanitizeErrorMessage` to prevent stack-trace exposure.

## compression/

Prompt compression engines, rules, and language packs.

- [COMPRESSION_GUIDE.md](compression/COMPRESSION_GUIDE.md) — top-level compression overview.
- [COMPRESSION_ENGINES.md](compression/COMPRESSION_ENGINES.md) — available compression engines.
- [COMPRESSION_RULES_FORMAT.md](compression/COMPRESSION_RULES_FORMAT.md) — rule file format.
- [COMPRESSION_LANGUAGE_PACKS.md](compression/COMPRESSION_LANGUAGE_PACKS.md) — language packs.
- [RTK_COMPRESSION.md](compression/RTK_COMPRESSION.md) — RTK engine deep dive.

## ops/

Release, deployment, proxies, tunnels, coverage.

- [RELEASE_CHECKLIST.md](ops/RELEASE_CHECKLIST.md) — release flow checklist.
- [COVERAGE_PLAN.md](ops/COVERAGE_PLAN.md) — test coverage plan.
- [FLY_IO_DEPLOYMENT_GUIDE.md](ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io deployment.
- [VM_DEPLOYMENT_GUIDE.md](ops/VM_DEPLOYMENT_GUIDE.md) — generic VM deployment.
- [PROXY_GUIDE.md](ops/PROXY_GUIDE.md) — upstream proxy configuration.
- [TUNNELS_GUIDE.md](ops/TUNNELS_GUIDE.md) — Cloudflare tunnel and friends.

## diagrams/

Mermaid sources and exported SVG/PNG diagrams referenced from the docs above. Populated incrementally — see [diagrams/README.md](diagrams/README.md).

## i18n/

Translated mirrors of the documentation in 40 locales. See [i18n/README.md](i18n/README.md) for the supported language list.

## screenshots/

Static screenshots used by the dashboard and the README. Not part of the doc body.

---

## Auto-generated artifacts

- [reference/PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) is generated by `scripts/gen-provider-reference.ts` from `src/shared/constants/providers.ts`. Do not edit by hand.
- The dashboard sidebar (`/docs` UI) is generated by `scripts/generate-docs-index.mjs`, which walks the subfolders above.
