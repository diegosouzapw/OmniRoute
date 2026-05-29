# OmniRoute Plugin System — Comprehensive Implementation Plan

## TL;DR

**Goal**: WordPress-style plugin system where users can browse, install, enable/disable plugins from a dashboard, with sandboxed execution and full lifecycle management.

**Scope**: One PR delivering: plugin manifest spec, filesystem discovery, lifecycle management (DB + API + UI), sandbox execution, unification of existing skills+plugins, and MCP tools for programmatic control.

**Deliverables**:
- Plugin manifest v1 spec (`plugin.json`)
- Plugin registry + lifecycle hooks (unifies `plugins/` + `skills/`)
- Filesystem discovery (`plugins/` directory scan)
- DB migration for plugin state
- Plugin manager API routes (install, enable, disable, uninstall)
- Dashboard pages (browse, manage, marketplace)
- MCP tools for plugin management
- Sandboxed execution via existing Docker infrastructure

---

## Context & Current State

### What Already Exists

| System | Location | Status | What It Does |
|--------|----------|--------|----------------|
| **Plugin hooks** | `src/lib/plugins/index.ts` | ⚠️ UNUSED | `onRequest`, `onResponse`, `onError` hooks. In-memory. Never wired to pipeline. |
| **Skills registry** | `src/lib/skills/registry.ts` | ✅ ACTIVE | DB-persisted skills with versioning, tags, source provider |
| **Skills executor** | `src/lib/skills/executor.ts` | ✅ ACTIVE | Sandboxed execution (Docker), timeout, retry, execution tracking |
| **Built-in skills** | `src/lib/skills/builtins.ts` | ✅ ACTIVE | `file_read`, `file_write`, `http_request`, `web_search`, `eval_code`, `execute_command` |
| **Skill injection** | `src/lib/skills/injection.ts` | ✅ ACTIVE | Auto-injects relevant skills into model requests |
| **Skill interception** | `src/lib/skills/interception.ts` | ✅ ACTIVE | Intercepts tool calls, routes to skill executor |
| **Sandbox** | `src/lib/skills/sandbox.ts` | ✅ ACTIVE | Docker-based sandbox (CPU, memory, network, timeout limits) |
| **Plugin API routes** | `src/app/api/skills/*` | ✅ ACTIVE | CRUD for skills, executions, marketplace install |
| **DB tables** | `skills`, `skill_executions` | ✅ ACTIVE | SQLite persistence for skill definitions and execution history |

### What's Missing for WordPress-Style Plugins

1. ❌ **No plugin manifest** — skills use DB fields, not a file-based manifest
2. ❌ **No filesystem discovery** — skills are registered via API calls, not file scanning
3. ❌ **No plugin activation state** — skills have `enabled` boolean, but no install/activate/deactivate lifecycle
4. ❌ **No marketplace UI** — skills API exists but no browsing UI
5. ❌ **Plugin hooks not wired** — `plugins/index.ts` exists but is never called in the request pipeline
6. ❌ **No unified plugin = skill model** — two separate systems with different mental models
7. ❌ **No plugin configuration UI** — can't configure individual plugin settings

---

## Plugin Manifest Spec (v1)

### `plugin.json` Format

Every plugin is a directory under `plugins/` with a `plugin.json` manifest:

```json
{
  "name": "web-search-plus",
  "version": "1.2.0",
  "description": "Enhanced web search with caching and result filtering",
  "author": "OmniRoute Contributors",
  "license": "MIT",
  "main": "index.js",
  "source": "local",
  "tags": ["search", "web", "cache"],
  "requires": {
    "omniroute": ">=3.7.0",
    "permissions": ["network", "file-read"]
  },
  "hooks": {
    "onRequest": true,
    "onResponse": true,
    "onError": false
  },
  "skills": [
    {
      "name": "enhanced_search",
      "description": "Search with caching and deduplication",
      "input": { "query": "string", "cache": "boolean" },
      "output": { "results": "array", "cached": "boolean" }
    }
  ],
  "enabledByDefault": false,
  "configSchema": {
    "cacheTTL": { "type": "number", "default": 3600, "min": 60, "max": 86400 },
    "maxResults": { "type": "number", "default": 10, "min": 1, "max": 100 }
  }
}
```

### Manifest Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Plugin identifier (slug-style: `web-search-plus`) |
| `version` | string | ✅ | Semver version |
| `description` | string | ✅ | Human-readable description (max 500 chars) |
| `author` | string | ❌ | Plugin author |
| `license` | string | ❌ | SPDX license identifier |
| `main` | string | ✅ | Entry point relative to plugin dir |
| `source` | string | ✅ | `"local"` \| `"marketplace"` \| `"custom"` |
| `tags` | string[] | ❌ | For marketplace filtering |
| `requires.omniroute` | string | ✅ | Semver range for OmniRoute compatibility |
| `requires.permissions` | string[] | ❌ | `["network", "file-read", "file-write", "exec"]` |
| `hooks` | object | ❌ | Which plugin hooks this plugin implements |
| `skills` | array | ❌ | Skill definitions this plugin exports |
| `enabledByDefault` | boolean | ❌ | Auto-enable on install (default: `false`) |
| `configSchema` | object | ❌ | JSON Schema for plugin configuration UI |

### Plugin Directory Structure

```
plugins/
├── web-search-plus/
│   ├── plugin.json          # Manifest (required)
│   ├── index.js             # Entry point (required)
│   ├── README.md            # Documentation (optional)
│   ├── config.schema.json   # Config schema (optional, alt to inline)
│   └── assets/              # Plugin assets (optional)
│       └── icon.png
├── code-formatter/
│   ├── plugin.json
│   ├── index.js
│   └── formatter.js
└── .disabled/             # Moved here when disabled (not deleted)
    └── old-plugin/
        └── plugin.json
```

---

## Plugin Lifecycle

### State Machine

```
                  ┌──────────────────┐
                  │  NOT_INSTALLED  │
                  └────────┬─────────┘
                           │
                     install()
                           │
                           ▼
                  ┌──────────────────┐
                  │   INSTALLED     │◄── enable() / disable()
                  └────────┬─────────┘
                           │
                       activate()
                           │
                           ▼
                  ┌──────────────────┐
                  │   ACTIVE        │◄── disable()
                  └────────┬─────────┘
                           │
                      deactivate()
                           │
                           ▼
                  ┌──────────────────┐
                  │   INACTIVE      │◄── activate() / uninstall()
                  └────────┬─────────┘
                           │
                    uninstall()
                           │
                           ▼
                  ┌──────────────────┐
                  │  NOT_INSTALLED  │
                  └──────────────────┘
```

### Lifecycle Operations

| Operation | What Happens | DB State Change |
|-----------|-----------------|-----------------|
| `install(path)` | Copy plugin dir to `plugins/`, parse manifest, register in DB | `status: "installed"` |
| `enable(name)` | Move from `.disabled/` to active dir, call plugin `init()`, register hooks | `status: "active"`, `enabled: true` |
| `disable(name)` | Move to `.disabled/`, call plugin `cleanup()`, unregister hooks | `status: "inactive"`, `enabled: false` |
| `uninstall(name)` | Delete plugin dir, remove from DB, cascade delete skills | Record deleted |
| `update(name, newPath)` | uninstall + install with new version | Version updated |

---

## Database Schema Changes

### New Migration: `022_create_plugins.sql` (or next available number)

```sql
-- Plugin registry with lifecycle state
CREATE TABLE IF NOT EXISTS plugins (
  id TEXT PRIMARY KEY,                     -- "{name}@{version}"
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  description TEXT,
  author TEXT,
  license TEXT,
  source TEXT NOT NULL DEFAULT 'local',  -- 'local' | 'marketplace' | 'custom'
  main_file TEXT NOT NULL,
  tags TEXT,                               -- JSON array
  permissions TEXT,                         -- JSON array
  hooks TEXT,                               -- JSON: which hooks implemented
  config_schema TEXT,                       -- JSON Schema for config UI
  config_values TEXT,                       -- JSON: user's config values
  enabled BOOLEAN NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'installed' 
    CHECK(status IN ('installed', 'active', 'inactive', 'error')),
  error_message TEXT,
  installed_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_activated_at TEXT,
  api_key_id TEXT NOT NULL,
  UNIQUE(name, api_key_id)              -- One plugin per name per API key
);

CREATE INDEX IF NOT EXISTS idx_plugins_name ON plugins(name);
CREATE INDEX IF NOT EXISTS idx_plugins_status ON plugins(status);
CREATE INDEX IF NOT EXISTS idx_plugins_api_key ON plugins(api_key_id);

-- Plugin execution log (separate from skill_executions)
CREATE TABLE IF NOT EXISTS plugin_executions (
  id TEXT PRIMARY KEY,
  plugin_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  hook_name TEXT NOT NULL,               -- 'onRequest' | 'onResponse' | 'onError'
  input TEXT NOT NULL,                    -- JSON
  output TEXT,                            -- JSON
  status TEXT NOT NULL CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout')),
  error_message TEXT,
  duration_ms INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (plugin_id) REFERENCES plugins(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_plugin_executions_plugin ON plugin_executions(plugin_id);
CREATE INDEX IF NOT EXISTS idx_plugin_executions_status ON plugin_executions(status);
```

### Migration to Unify Skills as Plugins

The existing `skills` table already has the right fields. We'll add a migration to mark built-in skills as `source: "builtin"` and make the `skills` table the canonical "plugin = skill bundle" store:

```sql
-- Extend skills table with plugin lifecycle fields
ALTER TABLE skills ADD COLUMN plugin_id TEXT REFERENCES plugins(id);
ALTER TABLE skills ADD COLUMN source TEXT NOT NULL DEFAULT 'local';  -- 'builtin' | 'local' | 'marketplace'
ALTER TABLE skills ADD COLUMN manifest TEXT;  -- Full plugin.json for built-in plugins

CREATE INDEX IF NOT EXISTS idx_skills_plugin ON skills(plugin_id);
CREATE INDEX IF NOT EXISTS idx_skills_source ON skills(source);
```

---

## Plugin Discovery & Loading

### Filesystem Scanner

```typescript
// src/lib/plugins/scanner.ts

export interface DiscoveredPlugin {
  manifest: PluginManifest;
  path: string;
  isValid: boolean;
  validationErrors: string[];
}

export async function scanPluginDirectory(
  pluginsDir: string = resolveDataDir("plugins")
): Promise<DiscoveredPlugin[]> {
  const entries = await fs.readdir(pluginsDir, { withFileTypes: true });
  const results: DiscoveredPlugin[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.')) continue;

    const manifestPath = path.join(pluginsDir, entry.name, "plugin.json");
    try {
      const raw = await fs.readFile(manifestPath, "utf-8");
      const manifest = JSON.parse(raw);
      const validated = validateManifest(manifest);
      
      results.push({
        manifest: validated.data,
        path: path.join(pluginsDir, entry.name),
        isValid: validated.success,
        validationErrors: validated.success ? [] : validated.errors,
      });
    } catch (err) {
      results.push({
        manifest: null,
        path: path.join(pluginsDir, entry.name),
        isValid: false,
        validationErrors: [err instanceof Error ? err.message : String(err)],
      });
    }
  }

  return results;
}
```

### Loading Sequence (at startup)

```
1. scanPluginDirectory() → discover all plugins on disk
2. For each discovered plugin:
   a. Check if in DB → if NOT, auto-register (status: 'installed')
   b. If in DB with status 'active' → loadPlugin(plugin)
3. loadPlugin(plugin):
   a. Dynamically import plugin.main (wrapped in sandbox)
   b. Register hooks: plugin.onRequest → plugins/onRequest chain
   c. Register skills: plugin.skills → skillRegistry.register()
   d. Call plugin.init?(context) if exported
```

---

## Plugin API Surface (What Plugins Can Do)

### Plugin Entry Point Contract

```typescript
// plugins/web-search-plus/index.js

export async function init(context) {
  // Called when plugin is activated
  // context: { apiKeyId, config, logger, db }
  logger.info("web-search-plus initialized");
}

export async function onRequest(ctx) {
  // Called BEFORE the chat handler
  // ctx: { requestId, body, model, provider, apiKeyInfo, metadata }
  // Return: { blocked?, response?, body?, metadata? }
  
  if (ctx.body.query?.includes("cached:")) {
    const cached = await checkCache(ctx.body.query);
    if (cached) return { blocked: true, response: cached };
  }
  return { body: ctx.body };  // pass through
}

export async function onResponse(ctx, response) {
  // Called AFTER the chat handler
  // Modify response, log, etc.
  return response;  // return modified or original
}

export async function onError(ctx, error) {
  // Called on handler error
  // Can recover or re-throw
  return null;  // null = let error propagate
}

export async function cleanup() {
  // Called when plugin is deactivated
  // Clean up resources, timers, etc.
}

// Skills this plugin exports (defined in plugin.json, registered automatically)
// Or can be registered programmatically:
export const skills = [
  {
    name: "enhanced_search",
    handler: async (input, context) => { /* ... */ }
  }
];
```

### Sandboxed Execution for Plugin Code

Plugins are loaded in-process but their code runs in a restricted context:

```typescript
// src/lib/plugins/loader.ts

export async function loadPlugin(plugin: PluginRecord) {
  const pluginDir = resolvePluginDir(plugin.name);
  const mainPath = path.join(pluginDir, plugin.main_file);

  // For untrusted plugins: run in Docker sandbox
  if (plugin.source === 'marketplace' && !pluginIsVerified(plugin)) {
    return loadPluginSandboxed(plugin, mainPath);
  }

  // For local/custom plugins: load in-process with restrictions
  const module = await import(mainPath);
  
  // Wrap exports with permission checks
  const wrapped = wrapWithPermissions(module, plugin.permissions);
  
  // Register hooks
  if (wrapped.onRequest) registerHook('onRequest', plugin.name, wrapped.onRequest);
  if (wrapped.onResponse) registerHook('onResponse', plugin.name, wrapped.onResponse);
  if (wrapped.onError) registerHook('onError', plugin.name, wrapped.onError);
  
  // Register skills
  if (wrapped.skills) {
    for (const skill of wrapped.skills) {
      await skillRegistry.register({ ...skill, apiKeyId: plugin.api_key_id });
    }
  }
  
  // Call init
  if (wrapped.init) await wrapped.init(buildPluginContext(plugin));
}
```

For untrusted marketplace plugins, the existing Docker sandbox infrastructure is reused:

```typescript
async function loadPluginSandboxed(plugin, mainPath) {
  const result = await sandboxRunner.run(
    DEFAULT_JS_IMAGE,  // node:22-alpine
    ["node", mainPath],
    {
      PLUGIN_CONFIG: plugin.config_values,
      PLUGIN_MANIFEST: plugin.manifest,
    },
    { networkEnabled: plugin.permissions.includes('network'), readOnly: true }
  );
  // Result.stdout contains serialized plugin exports
  return JSON.parse(result.stdout);
}
```

---

## Wire Plugin Hooks into Request Pipeline

### Integration Point: `open-sse/handlers/chatCore.ts`

The existing `plugins/index.ts` hooks need to be called in the request pipeline:

```typescript
// In open-sse/handlers/chatCore.ts (or wherever the request is processed)

import { runOnRequest, runOnResponse, runOnError } from "@/lib/plugins";

export async function handleChatCore(req, res, ctx) {
  try {
    // ── Step 1: Run onRequest hooks ──
    const pluginCtx = {
      requestId: ctx.requestId,
      body: req.body,
      model: req.body.model,
      provider: ctx.provider,
      apiKeyInfo: ctx.apiKeyInfo,
      metadata: {},
    };

    const preResult = await runOnRequest(pluginCtx);
    if (preResult.blocked) {
      return res.json(preResult.response);
    }
    req.body = preResult.body || req.body;

    // ── Step 2: Execute the request (existing logic) ──
    const response = await executeRequest(req, ctx);

    // ── Step 3: Run onResponse hooks ──
    const modifiedResponse = await runOnResponse(pluginCtx, response);

    // ── Step 4: Return response ──
    return res.json(modifiedResponse);

  } catch (error) {
    // ── Step 5: Run onError hooks ──
    const recovery = await runOnError(pluginCtx, error);
    if (recovery) return res.json(recovery);
    throw error;
  }
}
```

---

## API Routes for Plugin Management

### New Routes: `src/app/api/plugins/`

| Route | Method | Description |
|-------|--------|-------------|
| `/api/plugins` | GET | List all plugins (filter by status, source, tags) |
| `/api/plugins` | POST | Install plugin (upload or from marketplace) |
| `/api/plugins/[name]` | GET | Get single plugin details |
| `/api/plugins/[name]` | PATCH | Update plugin config values |
| `/api/plugins/[name]/enable` | POST | Enable/activate plugin |
| `/api/plugins/[name]/disable` | POST | Disable/deactivate plugin |
| `/api/plugins/[name]` | DELETE | Uninstall plugin |
| `/api/plugins/[name]/executions` | GET | List plugin execution history |
| `/api/plugins/marketplace` | GET | Browse marketplace (public plugin registry) |
| `/api/plugins/marketplace/install` | POST | Install from marketplace |
| `/api/plugins/scan` | POST | Re-scan filesystem for new plugins |

### Example: Enable Plugin Route

```typescript
// src/app/api/plugins/[name]/enable/route.ts

export async function POST(request, { params }) {
  const authError = await requireManagementAuth(request)
  if (authError) return authError;

  const { name } = await params;
  const plugin = await pluginManager.getPlugin(name);
  if (!plugin) return NextResponse.json({ error: "Plugin not found" }, { status: 404 });

  try {
    await pluginManager.enable(name);
    return NextResponse.json({ success: true, status: 'active' });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
```

---

## Dashboard UI Pages

### Page 1: Plugin Management (`/dashboard/plugins`)

| Section | Description |
|---------|-------------|
| **Installed Plugins** | List all installed plugins with status badge (active/inactive/error) |
| **Enable/Disable Toggle** | Quick toggle per plugin |
| **Plugin Details** | Click for manifest, config schema, execution history |
| **Install New** | Button → opens marketplace browser or upload modal |
| **Uninstall** | Delete plugin (with confirmation) |

### Page 2: Marketplace Browser (`/dashboard/plugins/marketplace`)

| Section | Description |
|---------|-------------|
| **Featured** | Curated list of recommended plugins |
| **Search & Filter** | By tags, name, author |
| **Plugin Card** | Name, description, version, author, install count, rating |
| **One-Click Install** | Install button on each card |
| **Plugin Details** | Modal with README, screenshots, permissions required |

### Page 3: Plugin Configuration (`/dashboard/plugins/[name]/config`)

| Section | Description |
|---------|-------------|
| **Config Form** | Auto-generated from `configSchema` (JSON Schema → form fields) |
| **Live Preview** | Show effective config |
| **Reset to Defaults** | Button to reset all config values |

---

## MCP Tools for Plugin Management

Extend the existing MCP server (`open-sse/mcp-server/tools/`) with plugin management tools:

| Tool Name | Description |
|-----------|-------------|
| `plugin_list` | List all plugins (filter by status, source) |
| `plugin_install` | Install plugin from path or marketplace |
| `plugin_enable` | Enable a plugin by name |
| `plugin_disable` | Disable a plugin by name |
| `plugin_uninstall` | Uninstall plugin by name |
| `plugin_configure` | Update plugin configuration values |
| `plugin_executions` | Get execution history for a plugin |
| `plugin_scan` | Re-scan filesystem for new plugins |

### Example MCP Tool: `plugin_list`

```typescript
// open-sse/mcp-server/tools/pluginTools.ts

export const pluginListTool = {
  name: "plugin_list",
  description: "List all installed plugins with their status and metadata",
  inputSchema: z.object({
    status: z.enum(["installed", "active", "inactive", "error"]).optional(),
    source: z.enum(["local", "marketplace", "builtin", "custom"]).optional(),
    tags: z.array(z.string()).optional(),
  }),
  handler: async (args) => {
    const plugins = await pluginManager.list({ 
      status: args.status, 
      source: args.source,
      tags: args.tags 
    });
    return { plugins };
  }
};
```

---

## Implementation TODOs (Execution Tasks)

### Wave 1: Foundation (can start immediately)

- [ ] **1. Create DB migration** — `src/lib/db/migrations/022_create_plugins.sql`
  - **What to do**: Create `plugins` and `plugin_executions` tables with lifecycle fields
  - **Must NOT do**: Modify existing `skills` table in this task (separate migration)
  - **Recommended Agent Profile**: `quick` (SQL + schema work)
  - **Parallelization**: Can run in parallel with Task 2
  - **Blocks**: Task 3, 4, 5
  - **References**: `src/lib/db/migrations/016_create_skills.sql` (pattern to follow), `src/lib/db/core.ts` (migration runner)
  - **Acceptance Criteria**:
    - [ ] `node --import tsx/esm --test tests/unit/db/plugins.test.ts` → PASS
    - [ ] New tables visible in SQLite: `SELECT * FROM plugins LIMIT 1;`
  - **QA Scenarios**:
    ```
    Scenario: Create plugin record
      Tool: Bash (sqlite3)
      Preconditions: Migration 022 applied
      Steps:
        1. sqlite3 ~/.omniroute/storage.sqlite "INSERT INTO plugins (id, name, version, main_file, api_key_id) VALUES ('test@1.0.0', 'test', '1.0.0', 'index.js', 'system');"
        2. sqlite3 ~/.omniroute/storage.sqlite "SELECT status FROM plugins WHERE name='test';"
      Expected Result: status column = 'installed'
      Evidence: .sisyphus/evidence/task-1-plugin-db.sqlite
    ```

- [ ] **2. Create plugin manifest validator** — `src/lib/plugins/manifest.ts`
  - **What to do**: Zod schema for `plugin.json`, validation function, TypeScript types
  - **Must NOT do**: Load or execute plugins (that's Task 3)
  - **Recommended Agent Profile**: `quick` (validation logic)
  - **Parallelization**: Can run in parallel with Task 1
  - **Blocks**: Task 3
  - **References**: `src/lib/skills/schemas.ts` (Zod pattern), `src/shared/validation/helpers.ts`
  - **Acceptance Criteria**:
    - [ ] Valid manifest passes validation ✓
    - [ ] Invalid manifest returns errors array ✓
    - [ ] `bun test src/lib/plugins/manifest.test.ts` → PASS

### Wave 2: Core Plugin System (depends on Wave 1)

- [ ] **3. Build plugin scanner** — `src/lib/plugins/scanner.ts`
  - **What to do**: Scan `plugins/` directory, parse manifests, return discovered plugins list
  - **Must NOT do**: Register or activate plugins (that's Task 4)
  - **Recommended Agent Profile**: `quick`
  - **Parallelization**: Wave 2, runs after Wave 1 completes
  - **Blocks**: Task 4, 5
  - **References**: `src/lib/skills/registry.ts` (scan pattern), `src/lib/dataPaths.ts` (resolveDataDir)

- [ ] **4. Build plugin loader** — `src/lib/plugins/loader.ts`
  - **What to do**: Load plugin entry point, wrap with permissions, register hooks, register skills
  - **Must NOT do**: Call loader at startup (that's Task 5)
  - **Recommended Agent Profile**: `quick`
  - **Parallelization**: With Task 3 in Wave 2
  - **Blocks**: Task 5, 6
  - **References**: `src/lib/plugins/index.ts` (hook registration), `src/lib/skills/executor.ts` (sandbox pattern)

- [ ] **5. Build plugin manager** — `src/lib/plugins/manager.ts`
  - **What to do**: Lifecycle operations (install, enable, disable, uninstall), DB operations, startup loader
  - **Must NOT do**: HTTP routes (that's Task 6)
  - **Recommended Agent Profile**: `quick`
  - **Parallelization**: After Task 3, 4 complete
  - **Blocks**: Task 6, 7, 8
  - **References**: `src/lib/skills/registry.ts` (registry pattern), `src/lib/db/providers.ts` (CRUD pattern)

### Wave 3: API + Integration (depends on Wave 2)

- [ ] **6. Wire plugin hooks into request pipeline** — `open-sse/handlers/chatCore.ts`
  - **What to do**: Call `runOnRequest`/`runOnResponse`/`runOnError` in the actual request flow
  - **Must NOT do**: Break existing request handling (preserve all current behavior)
  - **Recommended Agent Profile**: `unspecified-high` (delicate integration)
  - **Parallelization**: After Task 5 (manager) completes
  - **Blocks**: Task 9 (testing)
  - **References**: `src/lib/plugins/index.ts` (hook functions), `open-sse/handlers/chatCore.ts`
  - **Acceptance Criteria**:
    - [ ] Existing requests still work (no regression)
    - [ ] Plugin onRequest hook is called (verified with test plugin)
    - [ ] Plugin onResponse hook is called
  - **QA Scenarios**:
    ```
    Scenario: Plugin intercepts request
      Tool: Bash (curl)
      Preconditions: Test plugin with onRequest hook installed and enabled
      Steps:
        1. curl -X POST http://localhost:20128/v1/chat/completions -d '{"model":"gpt-4o","messages":[{"role":"user","content":"hello"}]'
        2. Check plugin execution log: sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM plugin_executions;"
      Expected Result: 1 row with hook_name='onRequest', status='success'
      Evidence: .sisyphus/evidence/task-6-hook-intercept.txt
    ```

- [ ] **7. Create plugin API routes** — `src/app/api/plugins/`
  - **What to do**: Full CRUD routes for plugin management (list, install, enable, disable, uninstall, scan)
  - **Must NOT do**: Dashboard UI (that's Wave 4)
  - **Recommended Agent Profile**: `quick`
  - **Parallelization**: With Task 6, 8 in Wave 3
  - **Blocks**: Task 9
  - **References**: `src/app/api/skills/route.ts` (pattern), `src/app/api/skills/install/route.ts`

- [ ] **8. Add MCP tools for plugin management** — `open-sse/mcp-server/tools/pluginTools.ts`
  - **What to do**: 8 MCP tools: plugin_list, plugin_install, plugin_enable, plugin_disable, plugin_uninstall, plugin_configure, plugin_executions, plugin_scan
  - **Must NOT do**: Dashboard UI (Wave 4)
  - **Recommended Agent Profile**: `quick`
  - **Parallelization**: With Task 6, 7 in Wave 3
  - **Blocks**: Task 9
  - **References**: `open-sse/mcp-server/tools/skillTools.ts` (pattern), `open-sse/mcp-server/schemas/`

### Wave 4: Dashboard UI (depends on Wave 3)

- [ ] **9. Build plugin management dashboard page** — `src/app/(dashboard)/plugins/`
  - **What to do**: Plugin list with status, enable/disable toggles, install button, details modal
  - **Must NOT do**: Marketplace (that's Task 10)
  - **Recommended Agent Profile**: `visual-engineering`
  - **Parallelization**: After Wave 3 completes
  - **Blocks**: Task 10, 11
  - **References**: `src/app/(dashboard)/settings/` (dashboard layout pattern), `src/shared/components/`

- [ ] **10. Build marketplace browser page** — `src/app/(dashboard)/plugins/marketplace/`
  - **What to do**: Browse plugins, search/filter, one-click install, plugin details modal
  - **Must NOT do**: Plugin config UI (Task 11)
  - **Recommended Agent Profile**: `visual-engineering`
  - **Parallelization**: With Task 9 in Wave 4
  - **Blocks**: Task 11
  - **References**: `src/app/(dashboard)/endpoints/` (card layout pattern)

- [ ] **11. Build plugin configuration page** — `src/app/(dashboard)/plugins/[name]/config/`
  - **What to do**: Auto-generated config form from plugin's configSchema, live preview
  - **Recommended Agent Profile**: `visual-engineering`
  - **Parallelization**: After Task 9, 10
  - **Blocks**: None (final task)
  - **References**: `src/app/(dashboard)/settings/` (form pattern), Zod → form field mapping

### Wave FINAL: Verification (ALL tasks must pass)

- [ ] **F1. Integration tests** — Plugin lifecycle E2E
  - Install plugin from filesystem → enable → verify hook fires → disable → uninstall
  - All Waves must complete before this runs
  - **QA Scenarios** (FINAL VERIFICATION):
    ```
    Scenario: Full plugin lifecycle
      Tool: Playwright (via dashboard) + curl (API)
      Preconditions: OmniRoute running, test plugin in plugins/ directory
      Steps:
        1. curl http://localhost:20128/api/plugins -H "Authorization: Bearer $KEY" → lists plugins
        2. curl -X POST http://localhost:20128/api/plugins/test/enable → 200 OK
        3. curl -X POST http://localhost:20128/v1/chat/completions -d '...' → plugin hook fires
        4. curl -X POST http://localhost:20128/api/plugins/test/disable → 200 OK
        5. curl -X DELETE http://localhost:20128/api/plugins/test → 200 OK
      Expected Result: All steps return 200, plugin hook verified in step 3
      Evidence: .sisyphus/evidence/final-plugin-lifecycle.json
    ```

- [ ] **F2. Code quality review** — `tsc --noEmit`, ESLint, no `any` in new code
- [ ] **F3. Test coverage** — `npm run test:all` must pass, new code ≥60% coverage
- [ ] **F4. Scope fidelity** — No changes to unrelated files, no feature creep into non-plugin areas

---

## Final Verification Wave (MANDATORY)

> 4 review agents run in PARALLEL. ALL must APPROVE.

- [ ] **F1. Plugin Lifecycle E2E** — `unspecified-high`
  Install → Enable → Hook fires → Configure → Disable → Uninstall. Full roundtrip.
  Output: `Lifecycle [PASS/FAIL] | Hooks [fired/missed] | Config [saved/ignored] | VERDICT`

- [ ] **F2. Code Quality** — `unspecified-high`
  `tsc --noEmit` + linter + `bun test`. Review new files for: `as any`, empty catches, console.log in prod, commented code.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | VERDICT`

- [ ] **F3. Security Review** — `unspecified-high` (+ `security-reviewer` skill)
  Check: plugin sandbox isolation, permission enforcement, path traversal in plugin paths, unauthorized hook registration, config injection.
  Output: `Sandbox [PASS/FAIL] | Permissions [PASS/FAIL] | Path Safety [PASS/FAIL] | VERDICT`

- [ ] **F4. Scope Fidelity** — `deep`
  Verify: No changes to `open-sse/executors/`, no new files in `src/lib/` root, no modification to existing `skills/` tables without migration, no changes to `src/app/api/v1/` routes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Success Criteria

### Verification Commands
```bash
npm run build                    # Must succeed
npm run test:all                 # Must pass (4,690+ tests + new plugin tests)
npm run check:cycles              # No circular dependencies
npm run typecheck:core            # No TypeScript errors
curl http://localhost:20128/api/plugins  # Lists plugins
curl -X POST http://localhost:20128/api/plugins/scan  # Discovers new plugins
```

### Final Checklist
- [ ] All "Must Have" present: plugin manifest spec, filesystem discovery, lifecycle management, hook integration, DB persistence, API routes, dashboard UI, MCP tools
- [ ] All "Must NOT Have" absent: no direct modification to `open-sse/handlers/chatCore.ts` beyond hook wiring, no new loose files in `src/lib/` root, no breaking changes to existing skills API
- [ ] All tests pass (existing + new plugin tests)
- [ ] Dashboard accessible at `/dashboard/plugins` with full functionality

---

## Parallel Execution Waves Summary

```
Wave 1 (Start Immediately — Foundation):
├── Task 1: DB migration (plugins + plugin_executions tables)
└── Task 2: Plugin manifest validator (Zod schema + types)
→ NO dependencies between 1 and 2 → MAX PARALLEL

Wave 2 (After Wave 1 — Core System):
├── Task 3: Plugin scanner (filesystem scan)
├── Task 4: Plugin loader (entry point + hook registration)
└── Task 5: Plugin manager (lifecycle operations + startup)
→ 3, 4 parallel; 5 waits for 3+4

Wave 3 (After Wave 2 — API + Integration):
├── Task 6: Wire hooks into request pipeline
├── Task 7: Plugin API routes (CRUD)
└── Task 8: MCP tools for plugin management
→ 6, 7, 8 parallel; all wait for Wave 2

Wave 4 (After Wave 3 — Dashboard UI):
├── Task 9: Plugin management page (list, toggle, install)
├── Task 10: Marketplace browser page
└── Task 11: Plugin configuration page
→ 9, 10 parallel; 11 waits for 9+10

FINAL (After ALL tasks):
├── F1: Plugin lifecycle E2E verification
├── F2: Code quality (tsc + lint + test)
├── F3: Security review (sandbox + permissions)
└── F4: Scope fidelity check (no contamination)
→ ALL 4 run in parallel; ALL must pass
```

**Critical Path**: Task 1 → Task 3+4 → Task 5 → Task 6+7+8 → Task 9+10+11 → F1-F4 → Done
**Parallel Speedup**: ~75% faster than sequential (11 tasks → 4 waves + final)

---

## Commit Strategy

| Wave | Message | Files |
|------|---------|-------|
| 1 | `feat(plugins): add plugins + plugin_executions tables (migration 022)` | `src/lib/db/migrations/022_create_plugins.sql`, `src/lib/db/` updates |
| 1 | `feat(plugins): add plugin.json manifest validator with Zod schema` | `src/lib/plugins/manifest.ts`, tests |
| 2 | `feat(plugins): add filesystem scanner and plugin loader` | `src/lib/plugins/scanner.ts`, `loader.ts` |
| 2 | `feat(plugins): add plugin manager with lifecycle operations` | `src/lib/plugins/manager.ts`, updates to `localDb.ts` |
| 3 | `feat(plugins): wire hooks into chat request pipeline` | `open-sse/handlers/chatCore.ts`, `src/lib/plugins/index.ts` updates |
| 3 | `feat(plugins): add plugin CRUD API routes` | `src/app/api/plugins/` (entire directory) |
| 3 | `feat(plugins): add MCP tools for plugin management` | `open-sse/mcp-server/tools/pluginTools.ts` |
| 4 | `feat(plugins): add plugin management dashboard` | `src/app/(dashboard)/plugins/` (entire directory) |
| 4 | `feat(plugins): add marketplace browser and config pages` | `src/app/(dashboard)/plugins/marketplace/`, `config/` |
| FINAL | `test(plugins): add E2E lifecycle tests and security checks` | `tests/integration/plugins/`, `tests/unit/plugins/` |

---

## Decisions Needed From You

| # | Question | Options |
|---|----------|---------|
| 1 | **Plugin execution model**: How should marketplace plugins run? | **Docker sandbox** (strong isolation, existing infra) / **In-process with VM module** (lighter, no Docker required) / **Hybrid** (Docker if available, VM fallback) |
| 2 | **Unify skills + plugins**: Should skills become a "type of plugin" or keep separate? | **Unify**: skills table gets plugin_id, all plugins can export skills / **Separate**: keep skills for AI tools, plugins for request hooks |
| 3 | **Plugin directory**: Where should plugins live? | `~/.omniroute/plugins/` (follows existing data dir pattern) / `./plugins/` (project-relative) |
| 4 | **Marketplace backend**: Where does the plugin registry live? | **Static JSON** (hosted on omniroute.online) / **GitHub repo** (plugins submitted via PR) / **None v1** (local install only, marketplace later) |

---

## Key References (For Executor Agents)

- **Plugin hooks pattern**: `src/lib/plugins/index.ts` — existing hook registry (31 files import from it, but it's never called)
- **Skills registry pattern**: `src/lib/skills/registry.ts` — singleton class, DB-backed, version cache
- **Skills executor pattern**: `src/lib/skills/executor.ts` — timeout, retry, execution tracking
- **Sandbox pattern**: `src/lib/skills/sandbox.ts` — Docker runner, resource limits, network toggle
- **DB migration pattern**: `src/lib/db/migrations/016_create_skills.sql` — reference for new migration
- **API route pattern**: `src/app/api/skills/route.ts` — list, filter, pagination
- **MCP tool pattern**: `open-sse/mcp-server/tools/skillTools.ts` — tool definition, Zod schema, handler
- **Dashboard layout**: `src/app/(dashboard)/` — Next.js App Router dashboard structure
- **Plugin manifest spec**: See "Plugin Manifest Spec (v1)" section above

---

*Plan written to `.sisyphus/plans/plugin-system-plan.md` — one comprehensive document covering everything needed for the WordPress-style plugin system PR.*
