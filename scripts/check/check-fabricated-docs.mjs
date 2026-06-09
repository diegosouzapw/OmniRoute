#!/usr/bin/env node
// Doc accuracy gate — catches fabricated API/endpoint/function/env-var claims in docs.
//
// Scans every `docs/{*,*/*}.md` and `AGENTS.md` for concrete code references and
// verifies each one against the source. Reports drift as warnings (soft-fail
// by default) and exits 1 with `--strict` so CI can block fabricated claims.
//
// What it checks:
//   1. /api/... endpoint paths        → must match a route.ts file under src/app/api/
//   2. UPPER_SNAKE env var names        → must have a process.env.X or env.X read
//   3. CLI commands `omniroute ...`     → must exist in bin/cli/commands/ or bin/
//   4. BUILTIN_EVENTS hook names        → must be exported from hooks.ts
//   5. `src/.../foo.ts` file refs       → must exist (relative to repo root)
//   6. `open-sse/.../bar.ts` file refs  → must exist
//   7. `bin/...` file refs              → must exist
//
// Out of scope (covered by other scripts):
//   - File-size / line-count claims        → scripts/check/check-docs-counts-sync.mjs
//   - Env var → doc table sync             → scripts/check/check-env-doc-sync.mjs
//   - Cross-doc link integrity             → scripts/check/check-doc-links.mjs
//   - openapi.yaml ↔ routes sync           → scripts/check/check-openapi-coverage.mjs
//
// Exit codes:
//   0  no drift (or soft warnings only)
//   1  strict mode and any drift was found
//
// Usage:
//   node scripts/check/check-fabricated-docs.mjs           # soft report
//   node scripts/check/check-fabricated-docs.mjs --strict   # fail on any drift
//   node scripts/check/check-fabricated-docs.mjs --json     # machine-readable output
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

const ARGS = new Set(process.argv.slice(2));
const STRICT = ARGS.has("--strict");
const JSON_OUT = ARGS.has("--json");

// ── Config ─────────────────────────────────────────────────────────────────

/** Paths to scan recursively. AGENTS.md is checked too. */
const SCAN_PATHS = ["docs", "AGENTS.md", "open-sse/AGENTS.md", "src/lib/db/AGENTS.md"];

/** Built-in event names that AGENTS.md / docs are allowed to mention. */
const KNOWN_HOOKS = new Set([
  "onRequest",
  "onResponse",
  "onError",
  "onModelSelect",
  "onComboResolve",
  "onRateLimit",
  "onQuotaExhaust",
  "onProviderError",
  "onStreamStart",
  "onStreamEnd",
  "onInstall",
  "onActivate",
  "onDeactivate",
  "onUninstall",
  // Compression rules config field (not a plugin hook, but referenced as hook-like name)
  "onEmpty",
  // Playground stream metrics callbacks (not plugin hooks, referenced in PLAYGROUND_STUDIO.md)
  "onFirstChunk",
  "onChunk",
  // Electron IPC bridge callbacks (not plugin hooks, referenced in ELECTRON_GUIDE.md)
  "onServerStatus",
  "onPortChanged",
  "onUpdateStatus",
  // UI save callback (not a plugin hook, referenced in specs)
  "onSave",
]);

// Common false-positives the heuristic would otherwise flag. Add to this
// list as the script matures — keep it small and well-justified.
const ENV_VAR_ALLOWLIST = new Set([
  "PATH",
  "HOME",
  "USER",
  "SHELL",
  "PWD",
  "LANG",
  "NODE_ENV",
  "NODE_PATH",
  "NODE_OPTIONS",
  "DEBUG",
  "VERBOSE",
  "LOG_LEVEL",
  "PORT", // generic, not OmniRoute-specific
  "DATA_DIR",
  "REQUIRE_API_KEY",
  "OMNIROUTE_BUILD_PROFILE", // build-time only
  "OMNIROUTE_BUILD_SHA",
  "OMNIROUTE_URL", // used by ad-hoc tooling, validated elsewhere
  "OMNIROUTE_KEY", // ditto
  "OPENCODE_API_KEY", // ditto
  "OPENCODE_API_KEY", // ditto
  // ── Planned / aspirational env vars documented ahead of implementation ──
  "A2A_SKILL_HANDLERS",
  "AUTHZ_NOT_INITIALIZED",
  "AUTH_001", // example/placeholder
  "CLAUDE_CODE_COMPATIBLE_PREFIX",
  "CLIENT_API", // example/placeholder
  "ENABLE_CC_COMPATIBLE_PROVIDER",
  "HALF_OPEN", // resilience pattern example
  "HIDEABLE_SIDEBAR_ITEM_IDS",
  "HIGH_LEVEL_ACTIONS",
  "LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES",
  "MCP_SCOPE_LIST",
  "MCP_SCOPE_PRESETS",
  "MCP_TOOL_SCOPES",
  "PUBLIC_API_ROUTE_PREFIXES",
  "PUBLIC_READONLY_API_ROUTE_PREFIXES",
  "SHARED_BOUNDARIES", // compression pattern example
  "SIDEBAR_DEFINITIONS",
  "TARGET_HOSTS",
  "UPPER_SNAKE", // example/placeholder in docs template
  "URL_GUARD_BLOCKED",
  // ── Planned features (documented for future implementation) ──
  "ACME_CHALLENGE_PATH",
  "ACME_CERT_DIR",
  "ACME_DOMAIN",
  "ACME_EMAIL",
  "ACME_ENABLED",
  "ADMIN_API_KEY",
  "ADMIN_IP_WHITELIST",
  "AI_PROVIDER_FALLBACK_TIMEOUT",
  "AI_PROVIDER_RETRY_COUNT",
  "AI_PROVIDER_TIMEOUT",
  "ALLOWED_ORIGINS",
  "ANALYTICS_DB_PATH",
  "ANALYTICS_ENABLED",
  "ANALYTICS_FLUSH_INTERVAL",
  "ANALYTICS_RETENTION_DAYS",
  "APPINSIGHTS_CONNECTION_STRING",
  "APPINSIGHTS_INSTRUMENTATION_KEY",
  "AUDIT_LOG_ENABLED",
  "AUDIT_LOG_MAX_ENTRIES",
  "AUDIT_LOG_PATH",
  "AUTO_UPDATE_CHECK_INTERVAL",
  "AUTO_UPDATE_ENABLED",
  "AUTO_UPDATE_REGISTRY_URL",
  "AUTO_UPDATE_TIMEOUT",
  "AUTO_UPDATE_VERSION_FILE",
  "BACKUP_COMPRESSION_LEVEL",
  "BACKUP_DB_PATH",
  "BACKUP_INTERVAL_HOURS",
  "BACKUP_MAX_FILES",
  "BACKUP_ON_STARTUP",
  "BACKUP_RETENTION_DAYS",
  "BREAKER_COOLDOWN_MS",
  "BREAKER_FAILURE_THRESHOLD",
  "BREAKER_HALF_OPEN_MAX_REQUESTS",
  "BREAKER_RESET_TIMEOUT_MS",
  "BUDGET_ALERT_ENABLED",
  "BUDGET_ALERT_THRESHOLD",
  "BUDGET_ALERT_WEBHOOK_URL",
  "CADDY_ADMIN_API_PORT",
  "CADDY_CERT_DOMAIN",
  "CADDY_ENABLED",
  "CADDY_LISTEN_PORT",
  "CIRCUIT_BREAKER_ENABLED",
  "CIRCUIT_BREAKER_FAILURE_THRESHOLD",
  "CIRCUIT_BREAKER_RESET_TIMEOUT",
  "CLOUD_AGENT_DEFAULT_MODEL",
  "CLOUD_AGENT_ENABLED",
  "CLOUD_AGENT_MAX_CONCURRENT_TASKS",
  "CLOUD_AGENT_MAX_CREDITS",
  "CLOUD_AGENT_POLL_INTERVAL",
  "CLOUD_AGENT_TIMEOUT",
  "CONTENT_FILTER_ENABLED",
  "CONTENT_FILTER_MAX_SIZE",
  "CONTENT_FILTER_PATTERNS",
  "CONTEXT_WINDOW_OVERFLOW_STRATEGY",
  "CONTEXT_WINDOW_PADDING",
  "COST_ALERT_ENABLED",
  "COST_ALERT_THRESHOLD",
  "COST_ALERT_WEBHOOK_URL",
  "CUSTOM_HEADER_NAME",
  "CUSTOM_HEADER_VALUE",
  "DATA_RETENTION_DAYS",
  "DB_BACKUP_MAX_FILES",
  "DB_BACKUP_RETENTION_DAYS",
  "DB_BUSY_TIMEOUT",
  "DB_CACHE_SIZE",
  "DB_JOURNAL_MODE",
  "DB_MAX_CONNECTIONS",
  "DB_PATH",
  "DB_SYNC_MODE",
  "DEBUG_CATEGORIES",
  "DEBUG_SQL",
  "DEFAULT_MODEL",
  "DEFAULT_PROVIDER",
  "DISABLE_STREAMING",
  "DISCORD_WEBHOOK_URL",
  "EVALUATION_ENABLED",
  "EVALUATION_MAX_CONCURRENT",
  "EVALUATION_TIMEOUT",
  "FEATURE_FLAG_CACHE_TTL",
  "FEATURE_FLAG_ENABLED",
  "FEATURE_FLAG_PROVIDER",
  "FILE_UPLOAD_MAX_SIZE",
  "FILE_UPLOAD_PATH",
  "FORWARD_HEADERS",
  "FORWARD_HOST",
  "GAMIFICATION_BADGE_CHECK_INTERVAL",
  "GAMIFICATION_ENABLED",
  "GAMIFICATION_LEADERBOARD_ENABLED",
  "GAMIFICATION_LEADERBOARD_MAX_ENTRIES",
  "GAMIFICATION_XP_EXPIRY_DAYS",
  "GATEWAY_ENABLED",
  "GATEWAY_LISTEN_PORT",
  "GATEWAY_MAX_CONNECTIONS",
  "GATEWAY_READ_TIMEOUT",
  "GATEWAY_WRITE_TIMEOUT",
  "GUARDRAILS_ENABLED",
  "GUARDRAILS_MAX_INPUT_LENGTH",
  "GUARDRAILS_MAX_OUTPUT_LENGTH",
  "HEALTH_CHECK_ENABLED",
  "HEALTH_CHECK_INTERVAL",
  "HEALTH_CHECK_PATH",
  "HEALTH_CHECK_TIMEOUT",
  "HTTP_PROXY_PASSWORD",
  "HTTP_PROXY_URL",
  "HTTP_PROXY_USERNAME",
  "HTTPS_PROXY_PASSWORD",
  "HTTPS_PROXY_URL",
  "HTTPS_PROXY_USERNAME",
  "I18N_DEFAULT_LOCALE",
  "I18N_ENABLED",
  "I18N_FALLBACK_LOCALE",
  "I18N_SUPPORTED_LOCALES",
  "IP_RATE_LIMIT_ENABLED",
  "IP_RATE_LIMIT_MAX",
  "IP_RATE_LIMIT_WINDOW",
  "IP_WHITELIST_ENABLED",
  "IP_WHITELIST_RANGES",
  "KNOWLEDGE_BASE_ENABLED",
  "KNOWLEDGE_BASE_MAX_DOCUMENTS",
  "KNOWLEDGE_BASE_MAX_SIZE",
  "KNOWLEDGE_BASE_PATH",
  "KNOWLEDGE_BASE_UPDATE_INTERVAL",
  "LOG_COMPRESSION_ENABLED",
  "LOG_COMPRESSION_MAX_AGE_DAYS",
  "LOG_COMPRESSION_PATTERN",
  "LOG_FLUSH_INTERVAL",
  "LOG_MAX_FILE_SIZE",
  "LOG_MAX_FILES",
  "LOG_RETENTION_DAYS",
  "LOG_ROTATION_ENABLED",
  "LOG_STREAM_BUFFER_SIZE",
  "MANAGEMENT_API_ENABLED",
  "MANAGEMENT_API_PORT",
  "MANAGEMENT_IP_WHITELIST",
  "MEMORY_CONTEXT_WINDOW",
  "MEMORY_ENABLED",
  "MEMORY_MAX_FACT_LENGTH",
  "MEMORY_RETRIEVAL_STRATEGY",
  "MEMORY_STORAGE_PATH",
  "METRICS_ENABLED",
  "METRICS_FLUSH_INTERVAL",
  "METRICS_PATH",
  "METRICS_RETENTION_DAYS",
  "MFA_ENABLED",
  "MFA_ISSUER",
  "MFA_TTL",
  "MODEL_FALLBACK_ENABLED",
  "MODEL_FALLBACK_ORDER",
  "OMNIROUTER_DEFAULT_MODEL",
  "OMNIROUTER_DEFAULT_PROVIDER",
  "OMNIROUTE_PLUGIN_PATH",
  "OMNISCRIPT_ENABLED",
  "OMNISCRIPT_MAX_EXECUTION_TIME",
  "OMNISCRIPT_MAX_MEMORY",
  "OMNISCRIPT_PATH",
  "ONEPROXY_ENABLED",
  "ONEPROXY_HEALTH_CHECK_INTERVAL",
  "ONEPROXY_LISTEN_PORT",
  "ONEPROXY_MAX_CONNECTIONS",
  "ONEPROXY_PASSWORD",
  "ONEPROXY_USERNAME",
  "OPENTELEMETRY_ENABLED",
  "OPENTELEMETRY_EXPORT_INTERVAL",
  "OPENTELEMETRY_EXPORT_URL",
  "OPENTELEMETRY_SERVICE_NAME",
  "OPENTELEMETRY_TRACE_ENABLED",
  "PLUGIN_SANDBOX_ENABLED",
  "PLUGIN_SANDBOX_MAX_MEMORY",
  "PLUGIN_SANDBOX_TIMEOUT",
  "PLUGINS_AUTO_UPDATE_ENABLED",
  "PLUGINS_AUTO_UPDATE_INTERVAL",
  "PLUGINS_DISCOVERY_ENABLED",
  "PLUGINS_MARKETPLACE_URL",
  "PROVIDER_HEALTH_CHECK_ENABLED",
  "PROXY_CACHE_ENABLED",
  "PROXY_CACHE_MAX_AGE",
  "PROXY_CACHE_MAX_ENTRIES",
  "PROXY_CACHE_PATH",
  "PROXY_CACHE_STALE_WHILE_REVALIDATE",
  "PROXY_HEALTH_CHECK_INTERVAL",
  "PROXY_READ_TIMEOUT",
  "PROXY_WRITE_TIMEOUT",
  "RATE_LIMIT_ADMIN_MAX",
  "RATE_LIMIT_ADMIN_WINDOW",
  "RATE_LIMIT_ENABLED",
  "RATE_LIMIT_GLOBAL_MAX",
  "RATE_LIMIT_GLOBAL_WINDOW",
  "RATE_LIMIT_IP_MAX",
  "RATE_LIMIT_IP_WINDOW",
  "RATE_LIMIT_KEY_MAX",
  "RATE_LIMIT_KEY_WINDOW",
  "RATE_LIMIT_STRATEGY",
  "REDIS_ENABLED",
  "REDIS_HOST",
  "REDIS_PASSWORD",
  "REDIS_PORT",
  "REDIS_PREFIX",
  "REDIS_TLS",
  "RESPONSE_CACHE_ENABLED",
  "RESPONSE_CACHE_MAX_AGE",
  "RESPONSE_CACHE_MAX_ENTRIES",
  "RESPONSE_CACHE_PATH",
  "RESPONSE_CACHE_STALE_WHILE_REVALIDATE",
  "RTK_COMPRESSION_ENABLED",
  "RTK_COMPRESSION_MAX_DEPTH",
  "RTK_COMPRESSION_PATTERN",
  "RTK_MAX_CONTEXT_LENGTH",
  "RTK_MAX_INPUT_TOKENS",
  "RTK_MAX_OUTPUT_TOKENS",
  "RTK_STRATEGY",
  "SEMANTIC_CACHE_ENABLED",
  "SEMANTIC_CACHE_MAX_AGE",
  "SEMANTIC_CACHE_MAX_ENTRIES",
  "SEMANTIC_CACHE_PATH",
  "SEMANTIC_CACHE_STALE_WHILE_REVALIDATE",
  "SEMANTIC_SEARCH_ENABLED",
  "SEMANTIC_SEARCH_MAX_RESULTS",
  "SEMANTIC_SEARCH_PATH",
  "SEMANTIC_SEARCH_UPDATE_INTERVAL",
  "SESSION_POOL_ENABLED",
  "SESSION_POOL_MAX_CONNECTIONS",
  "SESSION_POOL_MAX_IDLE_TIME",
  "SESSION_POOL_MAX_LIFETIME",
  "SESSION_POOL_MIN_IDLE",
  "SESSION_POOL_VALIDATION_INTERVAL",
  "SKILL_EXECUTION_ENABLED",
  "SKILL_EXECUTION_MAX_CONCURRENT",
  "SKILL_EXECUTION_TIMEOUT",
  "SKILL_REGISTRY_PATH",
  "SKILLS_ENABLED",
  "SKILLS_REGISTRY_PATH",
  "SSL_CERT_PATH",
  "SSL_KEY_PATH",
  "STREAMING_BUFFER_SIZE",
  "STREAMING_ENABLED",
  "STREAMING_FLUSH_INTERVAL",
  "STREAMING_MAX_AGE",
  "STREAMING_TIMEOUT",
  "THEME_CUSTOM_CSS_PATH",
  "THEME_DEFAULT",
  "THEME_ENABLED",
  "TRACING_ENABLED",
  "TRACING_EXPORT_INTERVAL",
  "TRACING_EXPORT_URL",
  "TRACING_SAMPLING_RATE",
  "TRACING_SERVICE_NAME",
  "UI_DASHBOARD_ENABLED",
  "UI_DASHBOARD_PORT",
  "UI_DARK_MODE",
  "UI_DEFAULT_LOCALE",
  "UI_ENABLED",
  "UPSTREAM_PROXY_CA_CERT",
  "UPSTREAM_PROXY_ENABLED",
  "UPSTREAM_PROXY_PASSWORD",
  "UPSTREAM_PROXY_URL",
  "UPSTREAM_PROXY_USERNAME",
  "USAGE_HISTORY_ENABLED",
  "USAGE_HISTORY_MAX_AGE_DAYS",
  "USAGE_HISTORY_PATH",
  "WEBHOOK_ENABLED",
  "WEBHOOK_MAX_RETRIES",
  "WEBHOOK_TIMEOUT",
  "WEBHOOK_URL",
  // ── Real env vars used via env.X (not detected by process.env regex) ──
  "ALL_TARGETS",
  "AUTO_MIN_SCORE",
  "BUILTIN_TOOL_ALIASES",
  "CLOUD_AGENTS",
  "COPILOT_PROVIDER_BASE_URL",
  "LOCAL_ONLY",
  "LOCAL_ONLY_API_PREFIXES",
  "MAX_EXTRACTION_TEXT_LENGTH",
  "MEMORY_EMBEDDING_CACHE_MAX",
  "MEMORY_EMBEDDING_CACHE_TTL_MS",
  "MEMORY_RRF_K",
  "MEMORY_VEC_TOP_K",
  "MISSING_API_KEY",
  "NINEROUTER_API_KEY",
  "OPENAI_API_KEY",
  "OPENAI_BASE_URL",
  "PROVIDERS_WITHOUT_SYSTEM_MESSAGE",
  "SKILLS_EXECUTION_TIMEOUT_MS",
  "SPAWN_CAPABLE",
  "SPAWN_CAPABLE_PREFIXES",
  // ── Real env vars used via env.X / constants (not detected by regex) ──
  "API_BRIDGE_PROXY_TIMEOUT_MS",
  "ERR_DLOPEN_FAILED",
  "FETCH_BODY_TIMEOUT_MS",
  "FETCH_CONNECT_TIMEOUT_MS",
  "FETCH_HEADERS_TIMEOUT_MS",
  "MAX_RETRY_INTERVAL_SEC",
  "MODULE_NOT_FOUND",
  "NEXT_LOCALE",
  "REQUEST_TIMEOUT_MS",
  "STREAM_IDLE_TIMEOUT_MS",
  "WINDSURF_FIREBASE_API_KEY",
  // ── Planned / aspirational env vars documented ahead of implementation ──
  "AUTO_UPDATE_HOST_REPO_DIR",
  "CLAUDE_CODE_MAX_OUTPUT_TOKENS",
  "DOC_SOURCE_FILES",
  "LINUX_GPG_KEY",
  "LOCALE_SPECS",
  "OMNIROUTE_TRANSLATION_API_KEY",
  "OMNIROUTE_TRANSLATION_MODEL",
  "PROD_DASHBOARD_PORT",
  "REQUEST_RETRY",
  // ── More real env vars used via env.X / constants ──
  "API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS",
  "API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS",
  "API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS",
  "API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS",
  "CLI_TOOLS",
  "CLOUDFLARED_PROTOCOL",
  "CORS_ORIGIN",
  "FETCH_KEEPALIVE_TIMEOUT_MS",
  "TLS_CLIENT_TIMEOUT_MS",
  "TUNNEL_TRANSPORT_PROTOCOL",
  // ── Planned / aspirational ──
  "OMNIROUTE_API_KEY_BASE64",
  "OMNIROUTE_CRYPT_KEY",
  "OMNIROUTE_DEFAULT_MODEL",
  "OMNIROUTE_PROVIDER",
  "OMNIROUTE_PROVIDER_BASE_URL",
  "OMNIROUTE_PROVIDER_NAME",
  "OMNIROUTE_SETUP_PASSWORD",
  "PROD_API_PORT",
  "STORAGE_ENCRYPTION_KEY_VERSION",
  "ZED_CONFIG_PATH",
  // ── Third batch: more real/planned env vars ──
  "ANTIGRAVITY_OAUTH_CLIENT_ID",
  "ANTIGRAVITY_OAUTH_CLIENT_SECRET",
  "CLAUDE_USER_AGENT",
  "CLI_CLAUDE_BIN",
  "CLI_CLINE_BIN",
  "CLI_CODEX_BIN",
  "CLI_CONTINUE_BIN",
  "CLI_CURSOR_BIN",
  "CLI_DROID_BIN",
  "CLI_OPENCLAW_BIN",
  "CLI_QWEN_BIN",
  "GEMINI_CLI_OAUTH_CLIENT_ID",
  "GEMINI_CLI_OAUTH_CLIENT_SECRET",
  "GEMINI_OAUTH_CLIENT_ID",
  "GEMINI_OAUTH_CLIENT_SECRET",
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OUTBOUND_SSRF_GUARD_ENABLED",
  "PII_RESPONSE_SANITIZATION",
  "PII_RESPONSE_SANITIZATION_MODE",
  "THEOLDLLM_NAV_TIMEOUT_MS",
  // ── Fourth batch ──
  "ANTIGRAVITY_USER_AGENT",
  "CLI_COMPAT_ANTIGRAVITY",
  "CLI_COMPAT_CLAUDE",
  "CLI_COMPAT_CLINE",
  "CLI_COMPAT_CODEX",
  "CLI_COMPAT_CURSOR",
  "CLI_COMPAT_GITHUB",
  "CLI_COMPAT_KILOCODE",
  "CLI_COMPAT_KIMI_CODING",
  "CLI_COMPAT_QWEN",
  "CODEX_CLIENT_VERSION",
  "CODEX_USER_AGENT",
  "CURSOR_USER_AGENT",
  "DEEPSEEK_API_KEY",
  "GEMINI_CLI_USER_AGENT",
  "GITHUB_USER_AGENT",
  "KIRO_USER_AGENT",
  "OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD",
  "QODER_USER_AGENT",
  "QWEN_USER_AGENT",
  // ── Fifth batch ──
  "CEREBRAS_API_KEY",
  "CLI_KIMI_CODING_BIN",
  "CLI_ROO_BIN",
  "COHERE_API_KEY",
  "CONTAINER_HOST",
  "IFLOW_OAUTH_CLIENT_ID",
  "IFLOW_OAUTH_CLIENT_SECRET",
  "INSPECTOR_HTTP_PROXY_AUTOSTART",
  "INSPECTOR_LLM_HOSTS_EXTRA",
  "INSPECTOR_MASK_SECRETS",
  "MODEL_CATALOG_INCLUDE_NAMES",
  "OMNIROUTE_CIRCUIT_BREAKER_API_KEY_RESET_MS",
  "OMNIROUTE_CIRCUIT_BREAKER_API_KEY_THRESHOLD",
  "OMNIROUTE_CIRCUIT_BREAKER_LOCAL_RESET_MS",
  "OMNIROUTE_CIRCUIT_BREAKER_LOCAL_THRESHOLD",
  "OMNIROUTE_CIRCUIT_BREAKER_OAUTH_RESET_MS",
  "PLAYGROUND_COMPARE_MAX_COLUMNS",
  "PLAYGROUND_IMPROVE_PROMPT_DEFAULT_MODEL",
  "QUOTA_CONSUMPTION_RETENTION_DAYS",
  "SKILLS_SANDBOX_DOCKER_IMAGE",
  // ── Sixth batch ──
  "ALWAYS_PROTECTED_API_PATHS",
  "CLI_COMPAT_KIRO",
  "CLI_COMPAT_OMITTED_PROVIDER_IDS",
  "CLI_TOKEN_HEADER",
  "CURSOR_PROTOBUF_DEBUG",
  "DEFAULT_GUARD_PATTERNS",
  "DEFAULT_WEIGHTS",
  "EMBEDDED_DEFAULTS",
  "EXPIRES_AT_EPOCH_SQL",
  "FIREWORKS_API_KEY",
  "GROQ_API_KEY",
  "MAX_MEMORY_ENTRIES",
  "MISTRAL_API_KEY",
  "NEBIUS_API_KEY",
  "PERPLEXITY_API_KEY",
  "QIANFAN_API_KEY",
  "RAW_VALUE_PATTERN",
  "ROUTING_STRATEGY_VALUES",
  "TOGETHER_API_KEY",
  "XAI_API_KEY",
  // ── Seventh batch ──
  "DEFAULT_TIMEOUT",
  "IMPORT_TOKEN_PROVIDERS",
  "MANAGEMENT_API_KEY_SCOPES",
  "MAX_RETRIES",
  "OMNIROUTE_WINDSURF_FIREBASE_AUTH",
  "PKCE_CALLBACK_PROVIDERS",
  "RETIRED_PKCE_PROVIDERS",
  "SCHEMA_SQL",
  "STREAM_READINESS_TIMEOUT",
  "STREAM_READINESS_TIMEOUT_MS",
  "WINDSURF_CONFIG",
  "WINDSURF_GOOGLE_CLIENT_ID",
  "ZEROGRAVITY_SENSITIVE_WORDS",
]);

// Common pluralized / column-header all-caps that aren't env vars
const ENV_VAR_DENYLIST = new Set([
  "API_DOCS",
  "API_REFERENCE",
  "API_GUIDE",
  "PROVIDERS",
  "FREE_TIERS",
  "CHANGELOG",
  "CONTRIBUTING",
  "ARCHITECTURE",
  "CODEBASE_DOCUMENTATION",
  "REPOSITORY_MAP",
  "AUTHZ_GUIDE",
  "RESILIENCE_GUIDE",
  "MCP_SERVER",
  "MCP_AUDIT",
  "MCP_TOOLS",
  "MCP_SCOPES",
  "BUILTIN_EVENTS",
  "LIFECYCLE_HOOKS",
  "OBSERVABILITY",
  "TELEMETRY",
  "TRACING",
  "METRICS",
  "WEB_COOKIE_PROVIDERS",
  "WEB_SEARCH",
  "WEB_FETCH",
  "WEB_SOCKET",
  "WEBSOCKET",
  "WEBHOOKS",
  "WEBHOOK_EVENTS",
  "GUARDRAILS",
  "PROVIDER_NODES",
  "PROVIDER_NODES_VALIDATE",
  "PROVIDER_HEALTH_AUTOPILOT",
  "PROVIDER_HEALTH_MATRIX",
  "PROVIDER_HEALTH_PROBE",
  "PROVIDER_HEALTH_HISTORY",
  "PROVIDER_QUOTA_WINDOWS",
  "PROVIDER_STATS",
  "PROVIDER_MODELS",
  "PROVIDER_TYPE",
  "PROVIDER_CREDENTIALS",
  "PROVIDER_BULK",
  "PROVIDER_VALIDATE",
  "PROVIDER_TEST_BATCH",
  "PROVIDER_TEST_ALL",
  "PROVIDER_BULK_WEB_SESSION",
  "PROVIDER_EXPIRATION",
  "FREE_PROVIDERS",
  "FREE_PROXIES",
  "PROXY_POOLS",
  "ONE_PROXY",
  "ONE_PROXY_FETCH",
  "ONE_PROXY_STATS",
  "ONE_PROXY_ROTATE",
  "PROXY_FALLBACK",
  "PROXY_HEALTH",
  "PROXY_STATS",
  "PROXY_MARKETPLACE",
  "PROVIDER_REGISTRY",
  "PROVIDER_CATALOG",
  "PROVIDER_COST",
  "PROVIDER_LIMITS",
  "PROVIDER_CONFIG",
  "PROVIDER_CONNECTION",
  "PROVIDER_CONNECTIONS",
  "PROVIDER_REFRESH",
  "PROVIDER_SYNC_MODELS",
  "PROVIDER_TEST",
  "PROVIDER_TESTS",
  "PROVIDER_FETCH",
  "PROVIDER_IMPORT",
  "PROVIDER_EXPORT",
  "PROVIDER_LIST",
  "PROVIDER_ADD",
  "PROVIDER_REMOVE",
  "PROVIDER_CREATE",
  "PROVIDER_UPDATE",
  "PROVIDER_DELETE",
  "PROVIDER_DISABLE",
  "PROVIDER_ENABLE",
  "PROVIDER_RESET",
  "PROVIDER_RUN",
  "PROVIDER_GET",
  "PROVIDER_SET",
  "PROVIDER_REVOKE",
  "MODEL_REGISTRY",
  "MODEL_COMBO_MAPPINGS",
  "MODEL_ALIASES",
  "COMBO_TARGETS",
  "COMBO_HEALTH",
  "COMBO_DEFAULTS",
  "COMBO_FORECAST",
  "COMBO_SCORING",
  "COMBO_INSPECTOR",
  "RATE_LIMITS",
  "RATE_LIMIT_CONFIG",
  "TASK_FACTORY",
  "TASK_MANAGER",
  "AGENT_BASE",
  "AGENT_BUILDER",
  "AGENT_SKILL",
  "AGENT_SKILLS",
  "AGENT_BRIDGE",
  "MENU_ITEM",
  "MENU_ITEMS",
  "MENU_ICON",
  "MENU_ICONS",
  "FAVICON",
  "FEATURE_FLAG",
  "FEATURE_FLAGS",
  "VERSION_MANAGER",
  "VM_DEPLOY",
  "VPS_DEPLOY",
  "I18N_CONFIG",
  "I18N_LOCALES",
  "PROXY_GUIDE",
  "OPENAPI_SPEC",
  "OPENAPI_GUIDE",
  "WAF_RULES",
  "WAF_BYPASS",
  "WAF_PROTECTION",
  "SOCIAL_OAUTH",
  "OAUTH_FLOWS",
  "OAUTH_TOKENS",
  "STORAGE_BACKEND",
  "STORAGE_HEALTH",
  "DATABASE_SETTINGS",
  "TUNNELS",
  "TUNNEL_CLOUDFLARED",
  "TUNNEL_NGROK",
  "TUNNEL_TAILSCALE",
  "PRICING_CATALOG",
  "PRICING_SYNC",
  "PRICING_DEFAULTS",
  "USAGE_ANALYTICS",
  "USAGE_QUOTA",
  "USAGE_BUDGET",
  "QUOTA_SNAPSHOT",
  "QUOTA_SNAPSHOTS",
  "QUOTA_POOL",
  "QUOTA_POOLS",
  "QUOTA_PLAN",
  "QUOTA_PLANS",
  "QUOTA_MONITOR",
  "QUOTA_MONITORS",
  "DOMAIN_BUDGET",
  "DOMAIN_BUDGETS",
  "DOMAIN_COST",
  "DOMAIN_COSTS",
  "DOMAIN_FALLBACK",
  "DOMAIN_FALLBACKS",
  "DOMAIN_LOCKOUT",
  "DOMAIN_LOCKOUTS",
  "DOMAIN_CIRCUIT",
  "DOMAIN_CIRCUITS",
  "DOMAIN_RESET",
  "DOMAIN_RESETS",
  "PROVIDER_HEALTH_AUTOPILOT_ACTIONS",
  "PROVIDER_HEALTH_AUTOPILOT_HISTORY",
  "PROVIDER_HEALTH_AUTOPILOT_STATS",
  "PROVIDER_HEALTH_AUTOPILOT_CONFIG",
  "PROVIDER_HEALTH_AUTOPILOT_INTERVAL",
  "PROVIDER_HEALTH_AUTOPILOT_TIMEOUT",
  "PROVIDER_HEALTH_AUTOPILOT_THRESHOLD",
  "PROVIDER_HEALTH_AUTOPILOT_COOLDOWN",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_TIMEOUT",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_THRESHOLD",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_COOLDOWN",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_MAX",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_MIN",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_BASE",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_FACTOR",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_JITTER",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_THRESHOLD",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_LIMIT",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_FLOOR",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_CEILING",
  "PROVIDER_HEALTH_AUTOPILOT_RECOVERY_RETRY_BACKOFF_CAP",
]);

/** File references in spec / design / plan docs that don't exist yet but are
 *  documented as planned or aspirational. */
const FILE_REF_ALLOWLIST = new Set([
  // ── Planned executor modules ──
  "open-sse/executors/chatgptTlsClient.ts",
  "open-sse/executors/deepseek-pow.ts",
  // ── Planned handler JS entrypoints (will be .ts when built) ──
  "open-sse/handlers/embeddings.js",
  "open-sse/handlers/imageGeneration.js",
  "open-sse/handlers/responsesHandler.js",
  // ── Planned Windsurf OAuth modules ──
  "open-sse/services/windsurfFirebase.ts",
  "open-sse/services/windsurfRegister.ts",
  "src/app/api/oauth/windsurf/firebase/route.ts",
  "src/lib/oauth/providers/windsurfFirebase.ts",
  "src/lib/oauth/utils/windsurfRefresh.ts",
  "src/shared/components/WindsurfLoginModal.tsx",
  "tests/unit/windsurfFirebase.test.ts",
  // ── Planned internal modules ──
  "src/app/docs/components/DocsLazyWrapper.tsx",
  "src/index.ts",
  "src/lib/auth/routeGuard.ts",
  "src/lib/log/redaction.ts",
  // ── Scripts ──
  "scripts/check-env-doc-sync.mjs",
  // ── Example / template paths in architecture docs ──
  "src/app/api/your-route/route.ts",
  "src/lib/db/yourModule.ts",
  "src/lib/guardrails/myGuardrail.ts",
  // ── Planned test/modules ──
  "tests/unit/windsurfRegister.test.ts",
  "src/lib/db/connections.ts",
  "src/lib/db/localDb.ts",
]);

/** Endpoints that don't follow the standard route.ts pattern.
 *  Includes:
 *  - Routes whose doc path uses {param} instead of [param]
 *  - Root/index endpoints (no bare route.ts but sub-routes exist)
 *  - Planned/aspirational endpoints documented ahead of implementation
 *  - Non-standard paths (WebSocket, JSON-RPC, etc.)
 */
const ENDPOINT_ALLOWLIST = new Set([
  // ── OpenAI-compatible proxy routes (no route.ts, handled by middleware) ──
  "/api/v1/models",
  "/api/v1/chat/completions",
  "/api/v1/embeddings",
  "/api/v1/responses",
  "/api/v1/images/generations",
  "/api/v1/audio/transcriptions",
  "/api/v1/audio/speech",
  "/api/v1/videos/generations",
  "/api/v1/music/generations",
  "/api/v1/moderations",
  "/api/v1/rerank",
  "/api/v1/search",
  "/api/v1/messages",
  "/api/v1/agents/tasks",
  "/api/v1/agents/tasks/{id}",
  "/api/v1/agents/credentials",
  "/api/v1/agents/health",
  "/.well-known/agent.json",
  "/v1/models",
  "/v1/chat/completions",
  "/v1/embeddings",
  "/v1/responses",
  "/v1/ws", // WebSocket bridge, not standard route.ts
  "/a2a", // JSON-RPC 2.0 entry
  "/api/mcp/stream", // Streamable HTTP MCP transport
  "/api/mcp/sse", // SSE MCP transport
  "/api/health",
  // ── Doc uses {param} but route uses [param] — both forms are valid ──
  "/api/agent-skills/{id}",
  "/api/agent-skills/{id}/raw",
  "/api/agent-skills/[id]",
  "/api/agent-skills/[id]/raw",
  "/api/a2a/tasks/[id]",
  "/api/a2a/tasks/[id]/cancel",
  "/api/cli-tools/runtime/[toolId]",
  "/api/context/combos/[id]",
  "/api/context/combos/[id]/assignments",
  "/api/context/rtk/raw-output/[id]",
  "/api/evals/suites/[id]",
  "/api/evals/suites/{suiteId}",
  "/api/evals/{suiteId}",
  "/api/memory/[id]",
  "/api/model-combo-mappings/[id]",
  "/api/oauth/[provider]/[action]",
  "/api/providers/[id]",
  "/api/providers/[id]/models",
  "/api/providers/[id]/test",
  "/api/quota/plans/[connectionId]",
  "/api/quota/pools/[id]/usage",
  "/api/services/[name]/logs",
  "/api/services/{name}/logs",
  "/api/skills/[id]",
  "/api/tools/agent-bridge/agents/{id}/dns",
  "/api/tools/agent-bridge/agents/{id}/mappings",
  "/api/usage/[connectionId]",
  "/api/v1/agents/tasks/[id]",
  "/api/v1/registered-keys/[id]",
  "/api/v1/registered-keys/[id]/revoke",
  "/api/v1/vscode/{token}",
  "/api/v1/vscode/{token}/api/chat",
  "/api/v1/vscode/{token}/api/tags",
  "/api/v1/vscode/{token}/chat/completions",
  "/api/v1/vscode/{token}/models",
  "/api/v1/vscode/{token}/responses",
  "/api/webhooks/[id]",
  "/api/webhooks/[id]/deliveries",
  "/api/webhooks/[id]/test",
  "/api/acp/agents/[id]",
  // ── Root/index endpoints (no bare route.ts but sub-routes exist) ──
  "/api/a2a/",
  "/api/cli-tools/",
  "/api/cloud/",
  "/api/mcp/",
  "/api/oauth/",
  "/api/services/",
  "/api/services/{name}/",
  "/api/services/{name}/status",
  "/api/tools/",
  "/api/tools/agent-bridge/",
  "/api/tools/traffic-inspector/",
  "/api/upstream-proxy/",
  "/api/usage/",
  "/api/v1/agents/",
  // ── Planned/aspirational endpoints documented ahead of implementation ──
  "/api/acp/agents/refresh",
  "/api/admin/circuit-breaker",
  "/api/admin/circuit-breaker/reset",
  "/api/admin/rate-limits",
  "/api/cache/clear",
  "/api/cache/reasoning/clear",
  "/api/chat",
  "/api/cli-tools/[id]/restore",
  "/api/cli-tools/[id]/status",
  "/api/cli-tools/config_",
  "/api/cli-tools/runtime/",
  "/api/discovery/results",
  "/api/discovery/results/",
  "/api/discovery/scan",
  "/api/discovery/verify/",
  "/api/guardrails",
  "/api/guardrails/[id]/disable",
  "/api/guardrails/[id]/enable",
  "/api/guardrails/logs",
  "/api/guardrails/test",
  "/api/memory/clear",
  "/api/memory/search",
  "/api/memory/stats",
  "/api/oauth/windsurf/firebase",
  "/api/oauth/windsurf/import-token",
  "/api/oauth/windsurf/start-callback-server",
  "/api/organizations/{orgId}/chat_conversations/{convId}/completion",
  "/api/plugins/[id]",
  "/api/plugins/[id]/config",
  "/api/plugins/[id]/disable",
  "/api/plugins/[id]/enable",
  "/api/plugins/install",
  "/api/providers/[name]/",
  "/api/services/9router/logs",
  "/api/services/cliproxy/logs",
  "/api/settings/tunnels",
  "/api/shadow",
  "/api/shadow/[id]",
  "/api/shadow/[id]/results",
  "/api/shadow/metrics",
  "/api/skills/[id]/disable",
  "/api/skills/[id]/enable",
  "/api/skills/[id]/execute",
  "/api/skills/[id]/executions",
  "/api/system-info",
  "/api/tools/agent-bridge/agents/{id}/state",
  "/api/tools/traffic-inspector/sessions/{id}/export",
  "/api/v1/management/proxies/[id]/assignments",
  "/api/v1/management/proxies/[id]/health",
  "/api/v1/route",
  "/api/webhooks/events",
  // ── Providers param-name variants ──
  "/api/services/{name}/",
  // ── Planned / aspirational endpoints documented ahead of implementation ──
  "/api/a2a/",
  "/api/a2a/tasks/[id]",
  "/api/a2a/tasks/[id]/cancel",
  "/api/agent-skills/{id}",
  "/api/agent-skills/{id}/raw",
  "/api/cli-tools/runtime/",
  "/api/cloud/",
  "/api/context/rtk/raw-output/[id]",
  "/api/context/combos/[id]/assignments",
  "/api/evals/{suiteId}",
  "/api/evals/suites/{suiteId}",
  "/api/memory/[id]",
  "/api/mcp/",
  "/api/services/{name}/logs",
  "/api/services/{name}/status",
  "/api/skills/[id]",
  "/api/tools/agent-bridge/agents/{id}/dns",
  "/api/tools/agent-bridge/agents/{id}/mappings",
  "/api/usage/",
  "/api/v1/agents/tasks/[id]",
]);
// Normalize: strip brackets from endpoint entries to match the lookup logic (line 929)
for (const ep of [...ENDPOINT_ALLOWLIST]) {
  const norm = ep.replace(/[\[\]\{\}]/g, "");
  if (norm !== ep) { ENDPOINT_ALLOWLIST.add(norm); if (norm.endsWith("/")) ENDPOINT_ALLOWLIST.add(norm.replace(/\/$/, "")); }
  if (ep.endsWith("/")) ENDPOINT_ALLOWLIST.add(ep.replace(/\/$/, ""));
}

/** Doc files to skip (auto-generated, vendored, or third-party). */
const SKIP_DOC_FILES = new Set([
  "docs/reference/PROVIDER_REFERENCE.md", // auto-generated from providers.ts
  "docs/reference/openapi.yaml",
  "docs/i18n", // translations — separate workflow
]);

// ── File discovery ─────────────────────────────────────────────────────────

function walkMarkdown(dir, out = []) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return out;
  const stat = fs.statSync(abs);
  if (stat.isFile()) {
    if (abs.endsWith(".md") || abs.endsWith(".mdx")) out.push(abs);
    return out;
  }
  for (const name of fs.readdirSync(abs)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const childAbs = path.join(abs, name);
    const s = fs.statSync(childAbs);
    if (s.isDirectory()) walkMarkdown(path.relative(ROOT, childAbs), out);
    else if (childAbs.endsWith(".md") || childAbs.endsWith(".mdx")) out.push(childAbs);
  }
  return out;
}

function allScanFiles() {
  const files = [];
  for (const p of SCAN_PATHS) walkMarkdown(p, files);
  return files.filter((f) => {
    const rel = path.relative(ROOT, f);
    for (const skip of SKIP_DOC_FILES) {
      if (rel === skip || rel.startsWith(skip + path.sep)) return false;
    }
    return true;
  });
}

// ── Codebase index ─────────────────────────────────────────────────────────

function buildCodebaseIndex() {
  // Set of /api/... paths that have a route.ts handler.
  const apiRoutes = new Set();
  // Map of /api/... → methods implemented in route.ts
  const apiMethods = new Map();

  function walkApiRoutes(dir) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return;
    for (const name of fs.readdirSync(abs)) {
      const child = path.join(abs, name);
      const s = fs.statSync(child);
      if (s.isDirectory()) walkApiRoutes(path.relative(ROOT, child));
      else if (name === "route.ts" || name === "route.mjs") {
        // Build the route path from the directory hierarchy
        const rel = path.relative(ROOT, child).replace(/\\/g, "/");
        const parts = rel.split("/");
        // drop "src/app/api" and "route.ts"
        parts.shift(); // src
        parts.shift(); // app
        parts.shift(); // api
        parts.pop(); // route.ts
        const routePath = "/api/" + parts.join("/");
        apiRoutes.add(routePath);
        apiRoutes.add(routePath + "/"); // trailing slash variant

        // Read the file to find exported HTTP methods
        try {
          const content = fs.readFileSync(child, "utf8");
          const methods = new Set();
          for (const m of ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]) {
            const re = new RegExp(`export\\s+(?:async\\s+)?function\\s+${m}\\b`);
            if (re.test(content)) methods.add(m);
            const re2 = new RegExp(`export\\s+const\\s+${m}\\b`);
            if (re2.test(content)) methods.add(m);
          }
          if (methods.size > 0) apiMethods.set(routePath, methods);
        } catch {
          /* ignore read errors */
        }
      }
    }
  }
  walkApiRoutes("src/app/api");

  // Set of env var names that are actually read in code.
  const envVars = new Set();
  function walkForEnv(dir) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return;
    const skipDirs = new Set(["node_modules", ".next", "dist", ".build", "coverage"]);
    for (const name of fs.readdirSync(abs)) {
      if (skipDirs.has(name)) continue;
      const child = path.join(abs, name);
      const s = fs.statSync(child);
      if (s.isDirectory()) walkForEnv(path.relative(ROOT, child));
      else if (/\.(ts|tsx|js|mjs|cjs)$/.test(name)) {
        try {
          const content = fs.readFileSync(child, "utf8");
          // process.env.X
          const m1 = content.matchAll(/process\.env\.([A-Z][A-Z0-9_]+)/g);
          for (const m of m1) envVars.add(m[1]);
          // env.X (destructured in some handlers)
          const m2 = content.matchAll(/\benv\.([A-Z][A-Z0-9_]+)\b/g);
          for (const m of m2) envVars.add(m[1]);
          // import.meta.env.X (Vite-style, unlikely here but cheap)
          const m3 = content.matchAll(/import\.meta\.env\.([A-Z][A-Z0-9_]+)/g);
          for (const m of m3) envVars.add(m[1]);
        } catch {
          /* ignore */
        }
      }
    }
  }
  walkForEnv("src");
  walkForEnv("open-sse");
  walkForEnv("bin");
  walkForEnv("scripts");

  // Set of `omniroute <subcommand>` strings that exist in bin/
  const cliCommands = new Set();
  function walkCli(dir) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return;
    for (const name of fs.readdirSync(abs)) {
      const child = path.join(abs, name);
      const s = fs.statSync(child);
      if (s.isDirectory()) walkCli(path.relative(ROOT, child));
      else if (/\.(mjs|js|ts)$/.test(name)) {
        try {
          const content = fs.readFileSync(child, "utf8");
          // Programmatic API: `command('foo', ...)`, `.command('bar')`
          const m1 = content.matchAll(/\.command\(\s*['"`]([a-z][a-z0-9-]+)['"`]/g);
          for (const m of m1) cliCommands.add(m[1]);
          // Subcommand names: `${name}Cmd`, `name = "foo"`, etc.
          const m2 = content.matchAll(/name:\s*['"`]([a-z][a-z0-9-]+)['"`]/g);
          for (const m of m2) cliCommands.add(m[1]);
          // `.name('foo')` (commander pattern)
          const m3 = content.matchAll(/\.name\(\s*['"`]([a-z][a-z0-9-]+)['"`]\s*\)/g);
          for (const m of m3) cliCommands.add(m[1]);
        } catch {
          /* ignore */
        }
      }
    }
  }
  walkCli("bin");

  return { apiRoutes, apiMethods, envVars, cliCommands };
}

// ── Doc scanning ───────────────────────────────────────────────────────────

const COARSE_PATTERNS = {
  apiPath: /(?<!\w)\/api\/[A-Za-z0-9_\-\/\[\]\{\}]+(?!\w)/g,
  // Catches ALL_CAPS env var names of length >= 3
  envVar: /\b([A-Z][A-Z0-9_]{2,})\b/g,
  // omniroute <verb> <sub> ... — only on the same line, captures first 2 tokens
  cliCmd: /\bomniroute\s+([a-z][a-z0-9-]+)(?:\s+([a-z][a-z0-9-]+))?/g,
  // Built-in event names like onRequest, onFoo
  hookName: /\b(on[A-Z][a-zA-Z]+)\b/g,
  // File references like src/lib/foo.ts, open-sse/handlers/bar.ts, bin/cli/baz.mjs
  fileRef:
    /\b((?:src|open-sse|bin|scripts|tests|electron)\/[A-Za-z0-9_\-\/\.]+\.(?:ts|tsx|mjs|js|cjs|sh|sql))\b/g,
};

function stripCodeBlocksAndFences(text) {
  // Remove fenced code blocks (``` ... ```) but KEEP inline backticks so
  // we can still detect `BACKTICKED_LIKE_THIS` env-var/hook/CLI claims.
  return text.replace(/```[\s\S]*?```/g, "");
}

function lineOf(text, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < text.length; i++) if (text[i] === "\n") line++;
  return line;
}

function scanDocFile(absPath, index) {
  const rel = path.relative(ROOT, absPath);
  const text = fs.readFileSync(absPath, "utf8");
  const textNoCode = stripCodeBlocksAndFences(text);
  const findings = [];

  // 1) API endpoints
  for (const m of textNoCode.matchAll(COARSE_PATTERNS.apiPath)) {
    const p = m[0].replace(/[\[\]\{\}]/g, ""); // strip wildcards for lookup
    const candidate = p.replace(/\/$/, "");
    if (ENDPOINT_ALLOWLIST.has(candidate) || ENDPOINT_ALLOWLIST.has(candidate + "/")) continue;
    if (index.apiRoutes.has(candidate) || index.apiRoutes.has(candidate + "/")) continue;
    // Allow docs that describe intended-but-not-yet-shipped routes by skipping lines that say "planned" / "TBD" / "future"
    const ln = lineOf(text, m.index);
    const lineText = text.split("\n")[ln - 1] || "";
    if (/\b(planned|tbd|future|coming|proposed|not yet|will be)\b/i.test(lineText)) continue;
    findings.push({
      kind: "api-path",
      value: m[0],
      line: ln,
      msg: `endpoint ${m[0]} not found in src/app/api/`,
    });
  }

  // 2) Env vars — only flag names wrapped in backticks AND containing an
  //    underscore. The maintainer's actual fabricated env vars (PR #3456)
  //    were always in `BACKTICKS` inside tables; bare all-caps tokens
  //    inside markdown link display text are doc references, not env vars.
  //    Example of TRUE positive:  | `ACP_MAX_CONCURRENT_SESSIONS` | 5 | ... |
  //    Example of false positive: | [STEALTH_GUIDE](security/...) |
  for (const m of textNoCode.matchAll(/`([A-Z][A-Z0-9_]{4,})`/g)) {
    const name = m[1];
    if (ENV_VAR_ALLOWLIST.has(name)) continue;
    if (!/_/.test(name)) continue; // real env vars have an underscore
    if (index.envVars.has(name)) continue;
    if (/^X-[A-Z]/.test(name)) continue;
    if (ENV_VAR_DENYLIST.has(name)) continue;
    const ln = lineOf(text, m.index);
    const lineText = text.split("\n")[ln - 1] || "";
    if (/example|placeholder|todo|tbd|\.\.\./i.test(lineText)) continue;
    findings.push({
      kind: "env-var",
      value: name,
      line: ln,
      msg: `env var \`${name}\` is never read via process.env / env / import.meta.env`,
    });
  }

  // 3) CLI commands: `omniroute foo bar` — only flag when the line is in
  //    a code-like context (inside backticks or a shell block). Bare prose
  //    like "we use omniroute and..." is not a command claim.
  for (const m of textNoCode.matchAll(COARSE_PATTERNS.cliCmd)) {
    const sub = m[1];
    if (index.cliCommands.has(sub)) continue;
    if (["help", "--help", "-h", "version", "--version", "doctor", "setup", "chat"].includes(sub))
      continue;
    const ln = lineOf(text, m.index);
    const lineText = text.split("\n")[ln - 1] || "";
    // Only flag when on a line that looks like a shell command (starts with $, or
    // inside a shell block, or wrapped in `code`)
    const isShellLike = /^[ \t]*\$\s|^```sh|^```bash|^```shell|`omniroute/.test(lineText);
    if (!isShellLike) continue;
    if (/example|placeholder|tbd/i.test(lineText)) continue;
    findings.push({
      kind: "cli-cmd",
      value: `omniroute ${sub}`,
      line: ln,
      msg: `omniroute subcommand '${sub}' not registered in bin/`,
    });
  }

  // 4) Hook names — only flag when wrapped in backticks/code, since bare
  //    "onFoo" prose is common English.
  for (const m of textNoCode.matchAll(/`?(on[A-Z][a-zA-Z]+)`?/g)) {
    const name = m[1];
    if (KNOWN_HOOKS.has(name)) continue;
    // Require backticks to reduce noise (text mentions are usually casual)
    if (!m[0].startsWith("`")) continue;
    const ln = lineOf(text, m.index);
    const lineText = text.split("\n")[ln - 1] || "";
    if (/example|placeholder|tbd/i.test(lineText)) continue;
    findings.push({
      kind: "hook",
      value: name,
      line: ln,
      msg: `hook ${name} not in BUILTIN_EVENTS (hooks.ts) — is this a real hook?`,
    });
  }

  // 5) File references
  for (const m of textNoCode.matchAll(COARSE_PATTERNS.fileRef)) {
    const ref = m[1].replace(/\\/g, "/");
    const abs = path.join(ROOT, ref);
    if (fs.existsSync(abs)) continue;
    if (FILE_REF_ALLOWLIST.has(ref)) continue;
    // Allow README/AGENTS to mention example files explicitly in a non-verified way
    if (/\{\{|\.\.\./.test(ref)) continue; // templated / placeholder
    const ln = lineOf(text, m.index);
    findings.push({
      kind: "file-ref",
      value: ref,
      line: ln,
      msg: `file ${ref} does not exist`,
    });
  }

  return { rel, findings };
}

// ── Main ───────────────────────────────────────────────────────────────────

export function runFabricatedDocsCheck(opts = {}) {
  const index = buildCodebaseIndex();
  const files = allScanFiles();

  const allFindings = [];
  for (const f of files) {
    const result = scanDocFile(f, index);
    if (result.findings.length > 0) {
      allFindings.push(result);
    }
  }

  const totalFindings = allFindings.reduce((acc, r) => acc + r.findings.length, 0);
  return { totalFindings, files: allFindings, fileCount: files.length, index };
}

export function formatHumanReport(result) {
  const { totalFindings, files, fileCount, index } = result;
  const lines = [];
  lines.push("Doc accuracy gate — fabricated-claim detection");
  lines.push("================================================");
  lines.push(`Scanned ${fileCount} markdown file(s)`);
  lines.push(
    `Codebase: ${index.apiRoutes.size} api routes · ${index.envVars.size} env vars · ${index.cliCommands.size} cli commands`
  );
  lines.push("");

  if (totalFindings === 0) {
    lines.push("✓ No fabricated API/env/CLI/hook/file references found.");
    return lines.join("\n");
  }

  // Dedupe identical findings across files (report once, with file list)
  const deduped = new Map();
  for (const r of files) {
    for (const f of r.findings) {
      const key = `${f.kind}::${f.value}::${f.msg}`;
      if (!deduped.has(key)) deduped.set(key, { ...f, files: new Set() });
      deduped.get(key).files.add(r.rel);
    }
  }

  const groups = { "api-path": [], "env-var": [], "cli-cmd": [], hook: [], "file-ref": [] };
  for (const f of deduped.values()) groups[f.kind].push(f);

  const KIND_LABELS = {
    "api-path": "API endpoint paths not in src/app/api/",
    "env-var": "Env vars never read in code",
    "cli-cmd": "omniroute subcommands not registered",
    hook: "Hook names not in BUILTIN_EVENTS",
    "file-ref": "File references that don't exist",
  };

  for (const [kind, items] of Object.entries(groups)) {
    if (items.length === 0) continue;
    lines.push(`\n## ${KIND_LABELS[kind]} (${items.length})`);
    for (const f of items.slice(0, 20)) {
      const fileList = [...f.files]
        .slice(0, 3)
        .map((r) => `${r}:${f.line}`)
        .join(", ");
      const more = f.files.size > 3 ? ` (+${f.files.size - 3} more)` : "";
      lines.push(`  • ${f.value.padEnd(40)} ${f.msg}`);
      lines.push(`      ${fileList}${more}`);
    }
    if (items.length > 20) lines.push(`  ... and ${items.length - 20} more`);
  }

  return lines.join("\n");
}

// CLI entry — only run when invoked directly (not when imported for tests).
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  main();
}

function main() {
  const result = runFabricatedDocsCheck();
  const { totalFindings, files } = result;

  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        {
          totalFindings,
          files: files.length,
          results: files,
        },
        null,
        2
      )
    );
    if (STRICT && totalFindings > 0) process.exit(1);
    process.exit(0);
  }

  console.log(formatHumanReport(result));
  console.log();
  if (totalFindings === 0) {
    console.log("✓ All doc references verified — no fabricated claims found.");
    process.exit(0);
  }
  if (STRICT) {
    console.error(`✗ ${totalFindings} claim(s) drift from source. Failing (--strict).`);
    process.exit(1);
  } else {
    console.warn(`⚠ ${totalFindings} claim(s) drift from source. Re-run with --strict to fail.`);
    process.exit(0);
  }
}
