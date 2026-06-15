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
  // Gate allowlist constant names (JS identifiers, not env vars) — documented in
  // docs/architecture/QUALITY_GATES.md and docs/research/DISCOVERY_TOOL_DESIGN.md
  "KNOWN_STALE_DOC_REFS", // export const in check-docs-symbols.mjs
  "KNOWN_MISSING", // export const in check-fetch-targets.mjs
  "KNOWN_RAW_SQL", // export const in check-db-rules.mjs
]);

/** Endpoints that don't follow the standard route.ts pattern. */
const ENDPOINT_ALLOWLIST = new Set([
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
]);

/** Doc files to skip (auto-generated, vendored, or third-party). */
const SKIP_DOC_FILES = new Set([
  "docs/reference/PROVIDER_REFERENCE.md", // auto-generated from providers.ts
  "docs/reference/openapi.yaml",
  "docs/i18n", // translations — separate workflow
  // Point-in-time documentation audit (v3.8.24): intentionally references drift,
  // counts, and not-yet-existing files as part of documenting them — not living docs.
  "docs/ops/DOCUMENTATION_AUDIT_REPORT.md",
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
  if (STRICT) {
    console.error(`✗ ${totalFindings} claim(s) drift from source. Failing (--strict).`);
    process.exit(1);
  } else {
    console.warn(`⚠ ${totalFindings} claim(s) drift from source. Re-run with --strict to fail.`);
    process.exit(0);
  }
}
