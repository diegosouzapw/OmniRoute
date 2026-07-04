---
title: "OmniRoute Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Documentation

Navigable index of the OmniRoute documentation set. Topics are grouped by intent so you can find what you need quickly.

> Looking for the project overview, install steps, or release notes? See the root [README.md](../README.md), [CHANGELOG.md](../CHANGELOG.md), and [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## For Non-Tech Users

Simple guides for using OmniRoute — no technical background needed.

### getting-started/

- [QUICK-START.md](getting-started/QUICK-START.md) — install and run OmniRoute in 3 minutes.
- [AUTO-COMBO-GUIDE.md](getting-started/AUTO-COMBO-GUIDE.md) — let OmniRoute pick the best AI for you.
- [PROVIDERS-GUIDE.md](getting-started/PROVIDERS-GUIDE.md) — how to connect AI providers.
- [FREE-TIERS-GUIDE.md](getting-started/FREE-TIERS-GUIDE.md) — get free AI with no credit card.
- [TROUBLESHOOTING.md](getting-started/TROUBLESHOOTING.md) — fix common issues.

### guides/

- [SETUP_GUIDE.md](guides/SETUP_GUIDE.md) — first-time setup of OmniRoute.
- [USER_GUIDE.md](guides/USER_GUIDE.md) — daily usage of the dashboard and API.
- [FEATURES.md](guides/FEATURES.md) — dashboard feature gallery.
- [TIERS.md](guides/TIERS.md) — OmniRoute tiers explained (user guide).
- [USAGE_QUOTA_GUIDE.md](guides/USAGE_QUOTA_GUIDE.md) — usage, quota & spend tracking.
- [COST_TRACKING.md](guides/COST_TRACKING.md) — cost and spend tracking.
- [FREE_PROVIDER_RANKINGS.md](guides/FREE_PROVIDER_RANKINGS.md) — free provider rankings (Arena ELO).
- [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md) — running OmniRoute under Docker.
- [ELECTRON_GUIDE.md](guides/ELECTRON_GUIDE.md) — desktop (Electron) builds.
- [TERMUX_GUIDE.md](guides/TERMUX_GUIDE.md) — running on Android via Termux.
- [PWA_GUIDE.md](guides/PWA_GUIDE.md) — installing the dashboard as a PWA.
- [REMOTE-MODE.md](guides/REMOTE-MODE.md) — exposing OmniRoute remotely + scoped tokens.
- [CLI-INTEGRATIONS.md](guides/CLI-INTEGRATIONS.md) — master table of `setup-*` CLI integrations.
- [CLAUDE-CODE-CONFIGURATION.md](guides/CLAUDE-CODE-CONFIGURATION.md) — Claude Code CLI with OmniRoute.
- [CODEX-CLI-CONFIGURATION.md](guides/CODEX-CLI-CONFIGURATION.md) — Codex CLI with OmniRoute.
- [KIRO_SETUP.md](guides/KIRO_SETUP.md) — Kiro setup.
- [I18N.md](guides/I18N.md) — translation and locale workflow.
- [TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md) — detailed troubleshooting reference.
- [UNINSTALL.md](guides/UNINSTALL.md) — clean removal steps.

---

## For Tech Users

Technical documentation for developers and contributors.

## architecture/

How the system is put together — read these to understand the runtime, code layout, and resilience model.

- [ARCHITECTURE.md](architecture/ARCHITECTURE.md) — high-level system architecture (request pipeline, layers, modules).
- [CODEBASE_DOCUMENTATION.md](architecture/CODEBASE_DOCUMENTATION.md) — engineering reference for the codebase.
- [REPOSITORY_MAP.md](architecture/REPOSITORY_MAP.md) — directory-by-directory navigation guide.
- [AUTHZ_GUIDE.md](architecture/AUTHZ_GUIDE.md) — authorization pipeline (route classifier + policy engine).
- [RESILIENCE_GUIDE.md](architecture/RESILIENCE_GUIDE.md) — provider circuit breaker, connection cooldown, and model lockout.
- [QUALITY_GATES.md](architecture/QUALITY_GATES.md) — quality-gate scripts and CI jobs inventory.
- [MONITORING_SECTIONS.md](architecture/MONITORING_SECTIONS.md) — monitoring/costs dashboard navigation.
- [cluster-decisions.md](architecture/cluster-decisions.md) — optional sidecar/cluster profile decisions.

## reference/

Lookup material — API surface, environment variables, CLI flags, provider catalog.

- [API_REFERENCE.md](reference/API_REFERENCE.md) — REST API endpoints and shapes.
- [PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) — auto-generated provider catalog (do not edit by hand).
- [PROVIDER_PLUGIN_MANIFEST.md](reference/PROVIDER_PLUGIN_MANIFEST.md) — sidecar-safe provider plugin contract for Bifrost and CLIProxyAPI migration.
- [openapi.yaml](openapi.yaml) — OpenAPI spec for the public API.
- [ENVIRONMENT.md](reference/ENVIRONMENT.md) — environment variables reference.
- [FEATURE_FLAGS.md](reference/FEATURE_FLAGS.md) — feature flags and their defaults.
- [CLI-TOOLS.md](reference/CLI-TOOLS.md) — bundled CLI commands.
- [FREE_TIERS.md](reference/FREE_TIERS.md) — free-tier LLM provider directory.

## frameworks/

Pluggable subsystems exposed to clients, agents, and operators.

- [MCP-SERVER.md](frameworks/MCP-SERVER.md) — Model Context Protocol server.
- [A2A-SERVER.md](frameworks/A2A-SERVER.md) — Agent-to-Agent (A2A) JSON-RPC server.
- [ACP.md](frameworks/ACP.md) — Agent Client Protocol.
- [AGENT_PROTOCOLS_GUIDE.md](frameworks/AGENT_PROTOCOLS_GUIDE.md) — A2A / ACP / Cloud agent overview.
- [AGENTBRIDGE.md](frameworks/AGENTBRIDGE.md) — IDE agent bridge.
- [AGENT-SKILLS.md](frameworks/AGENT-SKILLS.md) — agent skills catalog.
- [CLOUD_AGENT.md](frameworks/CLOUD_AGENT.md) — cloud agent runtime and providers.
- [SKILLS.md](frameworks/SKILLS.md) — Skills framework (sandboxed extension).
- [MEMORY.md](frameworks/MEMORY.md) — persistent memory (FTS5 + Qdrant).
- [WEBHOOKS.md](frameworks/WEBHOOKS.md) — webhook events and dispatch.
- [EVALS.md](frameworks/EVALS.md) — eval suites.
- [GAMIFICATION.md](frameworks/GAMIFICATION.md) — gamification & leaderboard system.
- [EMBEDDED-SERVICES.md](frameworks/EMBEDDED-SERVICES.md) — embedded sidecar services (9Router, CLIProxyAPI).
- [NOTION_CONTEXT.md](frameworks/NOTION_CONTEXT.md) — Notion context source.
- [OBSIDIAN_CONTEXT.md](frameworks/OBSIDIAN_CONTEXT.md) — Obsidian context source.
- [OPENCODE.md](frameworks/OPENCODE.md) — OpenCode integration.
- [OPEN_SSE_ARCHITECTURE.md](frameworks/OPEN_SSE_ARCHITECTURE.md) — open-sse streaming engine internals.
- [PLAYGROUND_STUDIO.md](frameworks/PLAYGROUND_STUDIO.md) — Playground Studio UI.
- [SEARCH_TOOLS_STUDIO.md](frameworks/SEARCH_TOOLS_STUDIO.md) — Search Tools Studio UI.
- [TRAFFIC_INSPECTOR.md](frameworks/TRAFFIC_INSPECTOR.md) — traffic inspector (MITM).
- [PLUGINS.md](frameworks/PLUGINS.md) — CLI plugin system overview.
- [PLUGIN_SDK.md](frameworks/PLUGIN_SDK.md) — plugin SDK reference.
- [PLUGIN_MARKETPLACE.md](frameworks/PLUGIN_MARKETPLACE.md) — plugin marketplace.

## routing/

Combo routing, scoring, and replay.

- [AUTO-COMBO.md](routing/AUTO-COMBO.md) — Auto-Combo (multi-factor scoring, 17 strategies).
- [QUOTA_SHARE.md](routing/QUOTA_SHARE.md) — quota sharing engine.
- [REASONING_REPLAY.md](routing/REASONING_REPLAY.md) — reasoning replay cache.

## security/

Guardrails, compliance, stealth, and the mandatory patterns for handling public credentials and error messages.

- [GUARDRAILS.md](security/GUARDRAILS.md) — PII, prompt injection, vision guardrails.
- [COMPLIANCE.md](security/COMPLIANCE.md) — audit trails and compliance.
- [STEALTH_GUIDE.md](security/STEALTH_GUIDE.md) — TLS / fingerprint stealth.
- [PUBLIC_CREDS.md](security/PUBLIC_CREDS.md) — **mandatory** pattern for embedding public upstream OAuth client_id/secret + Firebase Web keys without tripping secret scanners.
- [ERROR_SANITIZATION.md](security/ERROR_SANITIZATION.md) — **mandatory** pattern for routing every error response through `sanitizeErrorMessage` to prevent stack-trace exposure.
- [ROUTE_GUARD_TIERS.md](security/ROUTE_GUARD_TIERS.md) — route-guard classification tiers.
- [CLI_TOKEN.md](security/CLI_TOKEN.md) — CLI machine-ID token (HMAC + legacy SHA-256) auth.
- [EGRESS_POLICY.md](security/EGRESS_POLICY.md) — egress IP family (IPv4/IPv6) policy.
- [MITM-TPROXY-DECRYPT.md](security/MITM-TPROXY-DECRYPT.md) — transparent MITM decrypt.
- [SUPPLY_CHAIN.md](security/SUPPLY_CHAIN.md) — supply-chain gates (SLSA, SBOM, Trivy, osv-scanner, Scorecard).
- [SOCKET_DEV_FINDINGS.md](security/SOCKET_DEV_FINDINGS.md) — supply-chain finding attestations.

## compression/

Prompt compression engines, rules, and language packs.

- [COMPRESSION_GUIDE.md](compression/COMPRESSION_GUIDE.md) — top-level compression overview.
- [COMPRESSION_ENGINES.md](compression/COMPRESSION_ENGINES.md) — available compression engines.
- [COMPRESSION_RULES_FORMAT.md](compression/COMPRESSION_RULES_FORMAT.md) — rule file format.
- [COMPRESSION_LANGUAGE_PACKS.md](compression/COMPRESSION_LANGUAGE_PACKS.md) — language packs.
- [RTK_COMPRESSION.md](compression/RTK_COMPRESSION.md) — RTK engine deep dive.
- [CONTEXT_EDITING.md](compression/CONTEXT_EDITING.md) — delegated context editing (Anthropic).
- [EXTENDING_COMPRESSION.md](compression/EXTENDING_COMPRESSION.md) — adding a custom compression engine.

## providers/

Provider-specific integration guides.

- [CLAUDE_WEB.md](providers/CLAUDE_WEB.md) — Claude Web (cookie-auth) provider.
- [AGENTROUTER.md](providers/AGENTROUTER.md) — AgentRouter setup.
- [ZED-DOCKER.md](providers/ZED-DOCKER.md) — Zed IDE integration under Docker.

## comparison/

- [OMNIROUTE_VS_ALTERNATIVES.md](comparison/OMNIROUTE_VS_ALTERNATIVES.md) — how OmniRoute compares to alternatives.

## ops/

Release, deployment, proxies, tunnels, coverage, database, monitoring.

- [RELEASE_CHECKLIST.md](ops/RELEASE_CHECKLIST.md) — release flow checklist.
- [RELEASE_GREEN.md](ops/RELEASE_GREEN.md) — keeping the PR queue and release branch green.
- [QUALITY_GATE_PLAYBOOK.md](ops/QUALITY_GATE_PLAYBOOK.md) — quality-gate playbook.
- [BRANCH_PROTECTION_MAIN.md](ops/BRANCH_PROTECTION_MAIN.md) — `main` branch protection.
- [COVERAGE_PLAN.md](ops/COVERAGE_PLAN.md) — test coverage plan.
- [DATABASE_GUIDE.md](ops/DATABASE_GUIDE.md) — DB schema and operations.
- [SQLITE_RUNTIME.md](ops/SQLITE_RUNTIME.md) — SQLite driver resolution chain.
- [MONITORING_GUIDE.md](ops/MONITORING_GUIDE.md) — monitoring & observability.
- [FLY_IO_DEPLOYMENT_GUIDE.md](ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io deployment.
- [VM_DEPLOYMENT_GUIDE.md](ops/VM_DEPLOYMENT_GUIDE.md) — generic VM deployment.
- [PROXY_GUIDE.md](ops/PROXY_GUIDE.md) — upstream proxy configuration.
- [TUNNELS_GUIDE.md](ops/TUNNELS_GUIDE.md) — Cloudflare tunnel and friends.

## diagrams/

Mermaid sources and exported SVG/PNG diagrams referenced from the docs above. See [diagrams/README.md](diagrams/README.md).

## i18n/

Translated mirrors of the documentation in 42 locales. See [i18n/README.md](i18n/README.md) for the supported language list.

## screenshots/

Static screenshots used by the dashboard and the README. Not part of the doc body.

---

## Auto-generated artifacts

- [reference/PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) is generated by `scripts/docs/gen-provider-reference.ts` from `src/shared/constants/providers.ts`. Do not edit by hand.
- The `/docs` UI is backed by Fumadocs MDX source generation from the subfolders above.
