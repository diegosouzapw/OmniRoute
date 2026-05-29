# RTK Shell Middleware Integration Plan

## TL;DR

> **Quick Summary**: Integrate RTK (Rust Token Killer) as shell middleware with full lifecycle management — runtime UI toggle, daily update checks, and graceful fallback.
> 
> **Deliverables**: 
> - RTK rewrite helper in `src/lib/skills/rtkUtils.ts`
> - Settings toggle (`RTK_ENABLED`) via Dashboard + env var
> - Status utility (install check, version, gain stats)
> - Daily update check (GitHub releases, cached 24h)
> - Integration into `execute_command` in `builtins.ts`
> 
> **Estimated Effort**: Medium (6-8 hours)
> **Parallel Execution**: NO - sequential (settings UI depends on rtkUtils)
> **Critical Path**: rtkUtils → builtins integration → Settings UI → daily job

---

## Context

### Original Request
Integrate RTK into OmniRoute with management capabilities:
- Enable/disable toggle
- Version status & update detection
- Graceful fallback when unavailable

### Research Findings

**What is RTK?**
- High-performance CLI proxy (Rust binary), ~10ms startup, <5MB memory
- 60-90% token savings on 100+ commands (git, cargo, npm, pytest, etc.)
- Source: [rtk-ai/rtk](https://github.com/rtk-ai/rtk)

**Existing Integration Patterns**
- OpenCode plugin: `hooks/opencode/rtk.ts` - calls `rtk rewrite <command>`
- OpenClaw plugin: `openclaw/index.ts` - same pattern

**RTK Management Commands Available**
```bash
rtk --version     # Version check (e.g., "rtk 0.28.2")
rtk rewrite <cmd> # Get rewritten command
rtk gain          # Show token savings stats
rtk verify        # Verify installation
```

### Metis Review

**Identified Gaps (addressed)**:
- Gap 1: No way to know RTK status → Add `getRtkStatus()` returning installed/version/enabled
- Gap 2: No update detection → Add `checkRtkUpdate()` comparing versions
- Gap 3: User can't toggle from UI → Add settings toggle support
- Gap 4: Fallback behavior unclear → Document: passthrough when unavailable

---

## Work Objectives

### Core Objective
Integrate RTK with full management — not just on/off, but observable and controllable.

### Concrete Deliverables

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | `buildRtkCommand()` | Builds RTK-rewritten command array for sandbox |
| 2 | `getRtkStatus()` | Returns `{ installed, version, enabled, rewriteAvailable, updateAvailable, latestVersion }` |
| 3 | `checkRtkUpdate()` | GitHub release compare → `{ updateAvailable, currentVersion, latestVersion, releaseUrl }` |
| 4 | `getRtkGain()` | Token savings stats: `{ totalSaved, commandsRun }` |
| 5 | Settings DB integration | `rtk_enabled` boolean key; Dashboard Settings toggle UI |
| 6 | Daily update job | Background job runs once daily, caches result 24h, manual refresh |
| 7 | Documentation | `.env.example` entry + usage notes |

### Definition of Done
- [ ] All functions compile without TypeScript errors
- [ ] `RTK_ENABLED` env var OR Dashboard toggle controls rewrite
- [ ] `RTK_ENABLED=false`/off → original behavior (backward compatible)
- [ ] `getRtkStatus()` returns complete object with install+version+enabled+updateAvailable
- [ ] Update check runs daily (or on-demand) and caches 24h
- [ ] Commands execute normally when RTK unavailable or disabled
- [ ] Dashboard Settings page shows RTK toggle with immediate Save feedback

### Must Have
- Enable/disable via `RTK_ENABLED` env var **or** Dashboard Settings toggle (both supported)
- `getRtkStatus()` exposes installation state + version + updateAvailable
- Daily update check runs automatically (once per day, cached 24h)
- Graceful fallback when RTK unavailable/disabled

### Must NOT Have (Guardrails)
- **No breaking changes**: Disabled/unavailable = original behavior
- **No required dependency**: User installs RTK separately
- **No blocking checks**: Async with timeout, non-blocking
- **No intrusive notifications**: Update available shown in status, not popups/alerts
- **No background service registration**: Daily job uses simple interval, no external cron

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES - Node.js test runner
- **Automated tests**: NO - Agent-executed QA only
- **Framework**: N/A

### QA Policy
Agent-executed scenarios verifying all management features.

---

## Execution Strategy

### Wave Structure

```
Wave 1 (Foundation):
├── Task 1: RTK utilities module (getRtkStatus, buildRtkCommand, checkRtkUpdate, getRtkGain)
└── Task 2: execute_command integration (import + command array rewrite)

Wave 2 (Management & Visibility):
├── Task 3: Settings toggle UI + DB (RtkShellTab component, settings key)
└── Task 4: Daily update check + GitHub integration (cached, manual refresh)

Wave 3 (Optional cleanup / docs):
└── (no implementation tasks — verification covers all)
```

### Dependency Matrix

- **Task 1** → Tasks 2, 3, 4 (all depend on rtkUtils exports)
- **Task 2** → — (standalone after Task 1)
- **Task 3** → Task 1 (depends on getRtkStatus, checkRtkUpdate)
- **Task 4** → Task 1 (depends on checkRtkUpdate), independent of Task 3 (parallel possible after Task 1)
- **Final Verification** → Tasks 1–4 (verifies complete integration)

**Parallel Execution**: Tasks 3 and 4 can run in parallel after Task 1 completes.
**Critical Path**: Task 1 → Task 2 → Task 3 & 4 (parallel) → Final Verification

---

## TODOs

### Wave 1: Foundation

- [ ] 1. Create RTK utilities module

  **What to do**:
  - Create `src/lib/skills/rtkUtils.ts`
  - Export 4 functions:

  ```typescript
  // src/lib/skills/rtkUtils.ts
  import { execSync } from "node:child_process";
  import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
  
  /**
   * Get RTK installation and status
   */
  export function getRtkStatus(): {
    installed: boolean;
    version: string | null;
    enabled: boolean;
    rewriteAvailable: boolean;
  } {
    const enabled = process.env.RTK_ENABLED === "true";
    
    if (!enabled) {
      return { installed: false, version: null, enabled: false, rewriteAvailable: false };
    }
    
    try {
      execSync("which rtk", { stdio: "ignore", timeout: 2000 });
      const version = execSync("rtk --version", { 
        encoding: "utf-8", 
        timeout: 3000 
      }).trim();
      
      return { 
        installed: true, 
        version, 
        enabled: true, 
        rewriteAvailable: true 
      };
    } catch {
      return { installed: false, version: null, enabled: true, rewriteAvailable: false };
    }
  }
  ...
  ```

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Reason**: Well-scoped new module, clear pattern

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 2 (imports these functions)

  **References**:
  - `src/lib/skills/builtins.ts:1-10` - Import style for node:child_process (need to add execSync)
  - `hooks/opencode/rtk.ts` (rtk-ai/rtk repo) - Rewrite pattern
  - `openclaw/index.ts` (rtk-ai/rtk repo) - execSync usage pattern
  - `src/lib/skills/sandbox.ts:53-58` - `sandboxRunner.run()` signature: `run(image, command: string[], env, configOverride)`

  **WHY Each Reference Matters**:
  - builtins.ts imports: shows existing import style; we'll add `import { execSync } from "node:child_process";` to rtkUtils.ts
  - hooks/opencode/rtk.ts: shows `rtk rewrite` invocation with `JSON.stringify(command)` for safety
  - sandbox.run signature: confirms second argument is `string[]` array → critical for correct integration

  **Acceptance Criteria**:
  - [ ] TypeScript compiles (`npm run typecheck:core`)
  - [ ] `getRtkStatus()` returns `{ installed, version, enabled, rewriteAvailable }` where `enabled` respects `RTK_ENABLED` env var if set, otherwise reads `settings.rtk_enabled`
  - [ ] `buildRtkCommand()` returns `["sh","-c","rtk rewrite <cmd>"]` when RTK enabled+installed
  - [ ] `buildRtkCommand()` returns `null` when RTK disabled or not installed
  - [ ] `checkRtkUpdate()` fetches GitHub releases and returns `{ updateAvailable, currentVersion, latestVersion, releaseUrl }`
  - [ ] `getRtkGain()` returns `{ totalSaved: number, commandsRun: number }`

- [ ] 2. Integrate into execute_command

  **What to do**:
  - Import `buildRtkCommand` from rtkUtils
  - Build command before sandbox execution
  - Use RTK-rewritten array if available, else original

  **Implementation** (in builtins.ts):
  ```typescript
  import { buildRtkCommand } from "./rtkUtils.js";
  
  // Inside execute_command, around line 461-468:
  const normalizedArgs = normalizeArgs(args);
  const selectedImage = normalizeImage(image, DEFAULT_COMMAND_IMAGE);
  
  // Build command array: RTK rewrite returns ["sh","-c","rtk ..."] or null
  const rtkCommand = buildRtkCommand(command, normalizedArgs);
  const commandArray = rtkCommand ?? [command, ...normalizedArgs];
  
  const result = await sandboxRunner.run(
    selectedImage,
    commandArray,
    {},
    sandboxConfig({ timeoutMs, networkEnabled })
  );
  // rest unchanged...
  ```

  **Key Points**:
  - `buildRtkCommand()` returns a complete `string[]` ready for `sandboxRunner.run()`
  - When RTK unavailable, uses `[command, ...normalizedArgs]` (original behavior)
  - No change to result parsing or return shape

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Reason**: Small, focused change to existing code

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Sequential after**: Task 1
  - **Blocks**: Task 3 (settings depend on this working)

   **References**:
   - `src/lib/skills/builtins.ts:461-468` — exact integration point (command array before sandbox)
   - `src/lib/skills/sandbox.ts:53-58` — confirms `sandboxRunner.run(image, command: string[], ...)` signature
   - `src/lib/db/settings.ts:44-86` — `getSettings()` returns KV store; RTK reads `settings.rtk_enabled`
   - `hooks/opencode/rtk.ts` (rtk-ai/rtk repo) — rewrite pattern (`rtk rewrite <cmd>`)
   - `openclaw/index.ts` (rtk-ai/rtk repo) — `execSync` usage pattern
   - `src/lib/skills/sandbox.ts` — module structure for utilities placement

  **Acceptance Criteria**:
  - [ ] `npm run check` passes (lint + typecheck)
  - [ ] Command array uses `["sh","-c","rtk ..."]` when RTK enabled and installed
  - [ ] Command array uses `[command, ...normalizedArgs]` when RTK disabled/missing
  - [ ] Original functionality preserved unchanged when RTK unavailable

### Wave 2: Management & Visibility

- [ ] 3. Runtime toggle + Settings UI integration

   **What to do**:
   - Extend `src/lib/db/settings.ts`: add `rtk_enabled: false` to `getSettings()` defaults (no migration needed — key-value store)
   - Extend `src/shared/validation/settingsSchemas.ts`: add `rtk_enabled: z.boolean().optional()` to `updateSettingsSchema` object
   - Create new API route `src/app/api/settings/rtk-config/route.ts`:
     - GET: calls `getSettings()`, returns `{ rtk_enabled, rtk_last_check_ts, rtk_latest_version, rtk_latest_url }`
     - PATCH: requires `requireManagementAuth`, validates against `updateSettingsSchema`, calls `updateSettings({ rtk_enabled })`, returns updated partial
   - Create `src/app/(dashboard)/dashboard/settings/components/RtkShellTab.tsx` — settings card:
     - Title: "RTK Shell Middleware"
     - Description: "Token-optimized command output (~80% savings on git, cargo, npm, etc.)"
     - Switch toggle: `checked={settings.rtk_enabled}`, onToggle → `PUT /api/settings/rtk-config { rtk_enabled: boolean }`
     - Status display: current RTK version, `updateAvailable` badge if newer release exists
     - "Check for Updates" button → calls `checkRtkUpdate({ force: true })` then refreshes status from API
    - Add to Advanced tab: import `RtkShellTab` in `src/app/(dashboard)/dashboard/settings/page.tsx` and include inside `{activeTab === "advanced"}` block before PayloadRulesTab
    - Env var `RTK_ENABLED` takes precedence at server startup (overrides DB value in `getRtkStatus()`)

   **Implementation notes**:
   - `RtkShellTab.tsx`: client component uses `useState` + `useEffect` to GET `/api/settings/rtk-config` on mount; PUT on toggle change
   - API route uses `requireManagementAuth` (same as other settings endpoints)
   - Settings key stored as `rtk_enabled: boolean` in key-value `settings` namespace
   - On server startup (Task 1 init): `getRtkStatus()` reads `process.env.RTK_ENABLED` first, then falls back to `settings.rtk_enabled`

   **References**:
   - `src/app/api/settings/cache-config/route.ts` — GET/PUT pattern for settings with auth + schema validation
   - `src/app/(dashboard)/dashboard/settings/components/CacheSettingsTab.tsx` — client component pattern: fetch config, PUT updates, toggle UI
   - `src/lib/db/settings.ts:44-86` — `getSettings()`/`updateSettings()` key-value API
   - `src/shared/validation/settingsSchemas.ts:30-113` — `updateSettingsSchema` where `rtk_enabled` must be added
   - `.env.example` — entry location (Section 9: CLI TOOL INTEGRATION)

   **Recommended Agent Profile**:
   - **Category**: `visual-engineering`
   - **Skills**: []
   - **Reason**: UI component + API route; simple HTML toggle + data fetching

   **Parallelization**:
   - **Can Run In Parallel**: NO
   - **Sequential after**: Task 2
   - **Blocks**: Task 4 (UI needs status from update check)

   **Acceptance Criteria**:
  - [ ] `settings.ts`: `getSettings()` returns `rtk_enabled: false` default (no migration required)
  - [ ] `settingsSchemas.ts`: `updateSettingsSchema` includes `rtk_enabled: z.boolean().optional()`
  - [ ] `src/app/api/settings/rtk-config/route.ts` created:
    - GET returns `{ rtk_enabled, rtk_last_check_ts, rtk_latest_version, rtk_latest_url }` (authenticated)
    - PATCH validates `{ rtk_enabled }`, calls `updateSettings()`, returns updated settings
  - [ ] `RtkShellTab.tsx` renders with toggle + status display + "Check for Updates" button
  - [ ] Settings page Advanced tab includes `<RtkShellTab />` (import added)
  - [ ] Toggle persists in DB via API PUT and reflects in `getRtkStatus().enabled`
  - [ ] `.env.example` updated with `RTK_ENABLED` entry (Section 9: CLI TOOL INTEGRATION)

- [ ] 4. Daily update check + GitHub releases integration

  **What to do**:
  - `checkRtkUpdate()` in `rtkUtils.ts`: async fetch to GitHub releases API, compare with `rtk --version`, cache result in memory + DB settings keys:
    - `rtk_last_check_ts` (ISO string)
    - `rtk_latest_version` (string like "0.28.2")
    - `rtk_latest_url` (release html_url)
  - Daily job: `setInterval` in `rtkUtils.ts` module scope (or `builtins.ts` registration) — runs once every 24h, with ±5 min jitter randomized on first run
  - First check: on server startup (after 30s warm-up) or first call to `getRtkStatus()` if not yet cached
  - Manual refresh: `RtkShellTab` "Check for Updates" button calls `checkRtkUpdate({ force: true })` bypasses cache
  - `getRtkStatus()` extends return type with `updateAvailable: boolean` based on cached comparison

  **GitHub API**:
  ```typescript
  const res = await fetch('https://api.github.com/repos/rtk-ai/rtk/releases/latest');
  const { tag_name, html_url } = await res.json();
  // tag_name is like "v0.28.2" — strip "v" prefix to match `rtk --version` output
  ```

   **Rate limiting**: Unauthenticated = 60 req/hr. Daily check + manual refresh well within limits.
   Cache invalidation: If cached `last_check` < now - 24h, allow network call; otherwise return cache.

   **References**:
   - `src/lib/skills/rtkUtils.ts` — `checkRtkUpdate()` implementation location
   - `src/lib/db/settings.ts` — DB keys: `rtk_last_check_ts`, `rtk_latest_version`, `rtk_latest_url`
   - GitHub API: `https://api.github.com/repos/rtk-ai/rtk/releases/latest` — returns `{ tag_name, html_url }`

   **Acceptance Criteria**:
  - [ ] `checkRtkUpdate()` returns `{ updateAvailable, currentVersion, latestVersion, releaseUrl }`
  - [ ] Daily interval job runs every ~24h (±5 min jitter), logs "RTK update check: ..."
  - [ ] Cached values stored in DB settings; manual refresh updates cache immediately
   - [ ] `getRtkStatus().updateAvailable` reflects cached result

### Comprehensive QA Suite (for F4 Real Manual QA)

All scenarios must be executed during Final Verification Wave F4.

**Evidence Directory**: `.sisyphus/evidence/rtk/`

**QA Scenarios**:

```
Scenario: Disabled by default (baseline)
  Tool: Bash
  Preconditions: RTK_ENABLED not set
  Steps:
    1. Run getRtkStatus() inside project
    2. Verify enabled === false
    3. Execute any command via exec tool
  Expected Result: Original behavior, no rewrite
  Evidence: .sisyphus/evidence/rtk/disabled-default.txt

Scenario: Enabled - RTK installed
  Tool: Bash
  Preconditions: RTK_ENABLED=true, RTK installed and in PATH
  Steps:
    1. export RTK_ENABLED=true
    2. Run git status via exec tool
    3. Capture output and compare token count (compressed vs raw)
  Expected Result: Compressed output (~80% fewer tokens)
  Evidence: .sisyphus/evidence/rtk/enabled-installed.txt

Scenario: Enabled - RTK NOT installed (graceful fallback)
  Tool: Bash
  Preconditions: RTK_ENABLED=true, RTK not in PATH
  Steps:
    1. export RTK_ENABLED=true
    2. Run command (e.g., ls or git status)
    3. Verify command still executes (original output, no errors)
  Expected Result: Full output returned, no errors, exit code preserved
  Evidence: .sisyphus/evidence/rtk/enabled-missing.txt

Scenario: Status check accuracy
  Tool: Bash
  Preconditions: RTK_ENABLED set appropriately
  Steps:
    1. Import rtkUtils and call getRtkStatus()
    2. Examine returned object
  Expected Result: Object includes { installed, version, enabled, rewriteAvailable } with correct boolean/string values
  Evidence: .sisyphus/evidence/rtk/status-check.txt

Scenario: Update detection (GitHub API)
  Tool: Bash
  Preconditions: RTK_ENABLED=true, internet connectivity
  Steps:
    1. Call checkRtkUpdate()
    2. Verify fields { updateAvailable, currentVersion, latestVersion, releaseUrl }
  Expected Result: currentVersion matches `rtk --version`; latestVersion from GitHub; updateAvailable false if versions equal
  Evidence: .sisyphus/evidence/rtk/update-check.txt

Scenario: Gain stats retrieval
  Tool: Bash
  Preconditions: RTK_ENABLED=true, RTK installed, several commands already executed
  Steps:
    1. Run a few RTK-enabled commands (git status, git log, npm ls)
    2. Call getRtkGain()
    3. Verify shape { totalSaved: number, commandsRun: number }
  Expected Result: Numbers returned; commandsRun increased vs zero
  Evidence: .sisyphus/evidence/rtk/gain-stats.txt

Scenario: Runtime UI toggle - enable
  Tool: Playwright
  Preconditions: Logged into dashboard, navigate to Settings → Advanced tab
  Steps:
    1. Locate RTK Shell Middleware card/section
    2. Toggle switch to ON
    3. Click Save
    4. Navigate to Cli Tools page
    5. Execute a command (e.g., git status)
    6. Refresh Settings page; verify toggle persists
  Expected Result: Toggle ON persists; command output compressed (fewer tokens vs raw)
  Evidence: .sisyphus/evidence/rtk/ui-toggle-enable.png

Scenario: Runtime UI toggle - disable
  Tool: Playwright
  Preconditions: RTK enabled in UI
  Steps:
    1. Navigate to Settings → Advanced → RTK section
    2. Toggle to OFF
    3. Click Save
    4. Execute command via Cli Tools
    5. Refresh Settings page; verify toggle persists OFF
  Expected Result: Toggle OFF persists; command output full/uncompressed
  Evidence: .sisyphus/evidence/rtk/ui-toggle-disable.png

Scenario: Daily update check runs automatically
  Tool: Bash
  Preconditions: Server running, RTK installed, sufficient uptime (>24h)
  Steps:
    1. Check server logs for "RTK update check completed" entry
    2. Verify timestamp within last 24h
    3. Call getRtkStatus() → confirm updateAvailable reflects cached result
  Expected Result: Daily job logged at roughly 24h intervals; status includes update check result
  Evidence: .sisyphus/evidence/rtk/daily-check-log.txt

Scenario: Daily update check cache behavior (no network call)
  Tool: Bash
  Preconditions: Previous check within 24h (fresh cache)
  Steps:
    1. Call checkRtkUpdate() (should use cache)
    2. Monitor network traffic / logs for GitHub API call
    3. Verify result matches last check (same version fields)
  Expected Result: Cache used; no GitHub API network call
  Evidence: .sisyphus/evidence/rtk/cache-hit.txt
```

**Evidence to Capture**:
- Save each scenario output to respective file
- Ensure `.sisyphus/evidence/rtk/` directory exists before writing
- Playwright screenshots saved as PNG; Bash outputs saved as plain text

## Final Verification Wave

 - [ ] F1. **Plan Compliance Audit** - `oracle`

  Verify:
  - All 4 implementation tasks have acceptance criteria
  - RTK utilities module created (Task 1)
  - execute_command integration working (Task 2)
  - Runtime UI toggle + settings DB (Task 3)
  - Daily update check + GitHub integration (Task 4)
  Output: `Compliance [4/4] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** - `quick`

  Run:
  ```bash
  npm run check
  npm run typecheck:core
  ```
  Output: `Pass | Fail`

- [ ] F3. **Scope Fidelity Check** - `quick`

  Verify:
  - All 4 implementation tasks have acceptance criteria met (Task 1–4)
  - RTK utilities module created (Task 1)
  - execute_command integration working (Task 2)
  - Runtime UI toggle + settings DB (Task 3)
  - Daily update check + GitHub integration (Task 4)
  Output: `Compliance [4/4] | VERDICT: APPROVE/REJECT`

- [ ] F4. **Real Manual QA** - `unspecified-high` (+ `playwright` skill if UI)

  Execute ALL QA scenarios from the **Comprehensive QA Suite** section above. Follow exact steps:
  - Bash scenarios: run via interactive shell, capture stdout/stderr to `.sisyphus/evidence/rtk/<scenario-name>.txt`
  - Playwright scenarios: navigate Settings page, toggle RTK, execute Cli Tools command, save screenshots to `.sisyphus/evidence/rtk/<scenario-name>.png`
  - Verify daily job log entry exists; confirm cache hit/miss behavior via logs
  - Cross-check: `getRtkStatus()` output matches actual RTK installation + version state
  - Include negative tests: RTK disabled (original output), RTK enabled but missing binary (fallback OK)
  Output: `Scenarios [N/N pass] | Integration [OK] | VERDICT`

---

## Commit Strategy

- **Single commit**: `feat: add RTK shell middleware with full lifecycle management`
- **Files**: 
  - `src/lib/skills/rtkUtils.ts` (new — core utilities)
  - `src/lib/skills/builtins.ts` (modified: import + execute_command integration at line ~465)
  - `src/lib/db/settings.ts` (modified: add `rtk_enabled: false` default in getSettings)
  - `src/shared/validation/settingsSchemas.ts` (modified: add `rtk_enabled: z.boolean().optional()` to updateSettingsSchema)
  - `src/app/api/settings/rtk-config/route.ts` (new — GET/PUT API for RTK settings)
  - `src/app/(dashboard)/dashboard/settings/components/RtkShellTab.tsx` (new — settings UI card)
  - `src/app/(dashboard)/dashboard/settings/page.tsx` (modified: import RtkShellTab, add to Advanced tab)
  - `.env.example` (updated: RTK_ENABLED entry in Section 9)
- **Pre-commit**: `npm run check && npm run typecheck:core`

---

## Success Criteria

### Verification Commands
```bash
npm run check                    # Pass: lint + formatting
npm run typecheck:core          # Pass: no TypeScript errors
```

### Management Features Summary

| Feature | Control | Description |
|---------|---------|------------|
| **Enable** | `RTK_ENABLED=true` (env) OR Dashboard Settings toggle | Turn on rewrite |
| **Disable** | `RTK_ENABLED=false` / toggle OFF | Use normal commands |
| **Status** | `getRtkStatus()` | Check install + enabled state + version |
| **Update** | `checkRtkUpdate()` (daily auto + manual) | Check for new version, cached 24h |
| **Stats** | `getRtkGain()` | Token savings metrics (totalSaved, commandsRun) |

### Environment Variables

```bash
# .env.example additions:

# RTK Shell Middleware (optional)
# Enable token-optimized command output for ~80% token savings.
# Requires: brew install rtk (or curl -fsSL .../install.sh | sh)
# RTK_ENABLED=true
```

### Final Checklist
- [ ] Enable via `RTK_ENABLED` environment variable or Dashboard toggle
- [ ] Disable via env var false or toggle OFF
- [ ] Status check shows installation + enabled state + version
- [ ] Update detection runs daily, cached 24h, manual refresh available
- [ ] UI toggle in Settings page persists across sessions
- [ ] Graceful fallback when RTK unavailable or disabled
- [ ] Backward compatibility preserved (env var precedence)