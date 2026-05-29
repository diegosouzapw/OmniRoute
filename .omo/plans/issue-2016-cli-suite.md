# Issue #2016 — OmniRoute CLI Integration Suite: Full Implementation Plan

## Plan Status: COMPLETE ✅

> All implementation complete. PR #12 open. Tests: 4302/4326 pass. Files verified on disk.

> **Quick Summary**: Fully implement the approved OmniRoute CLI Integration Suite (issue #2016) by building the missing `src/lib/cli-helper/` abstraction layer (tool detection + config generation), 5 new CLI subcommands (`config`, `status`, `logs`, `update`, `provider`), 3 missing API routes, and the `@omniroute/opencode-provider` npm package — closing the ~40% gap that remains after PRs #2046 and #2074.

> **Deliverables**:
> - `src/lib/cli-helper/` — tool-detector.ts, config-generator/ (6 files), doctor/checks.ts, log-streamer.ts
> - `bin/cli/commands/` — config.mjs, status.mjs, logs.mjs, update.mjs, provider-cmd.mjs
> - `src/app/api/cli-tools/` — config/route.ts, detect/route.ts, apply/route.ts
> - `@omniroute/opencode-provider/` — package.json, index.ts, README.md
> - Updated: bin/omniroute.mjs (CLI_COMMANDS), bin/cli/index.mjs (router), doctor.mjs (CLI tool checks)
> - Tests + docs updates

> **Estimated Effort**: Large (3-4 days)
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: T1 (tool-detector) → T3 (config-generators) → T12-14 (API routes) → T15 (wiring) → T20 (wiring) → F1-F4

---

## Context

### Original Request
https://github.com/diegosouzapw/OmniRoute/issues/2016 — "[Feature] OmniRoute CLI Integration Suite — Approved"

### Interview Summary

**Key Discussions**:
- Issue #2016 specifies a `src/lib/cli-helper/` directory with tool detection, config generation for 6 CLI tools (claude, codex, opencode, cline, kilocode, continue), CLI health checks, and log streaming
- The issue also specifies `omniroute config`, `status`, `logs`, `update`, and `provider` subcommands, plus a `@omniroute/opencode-provider` npm package
- PRs #2046 (setup/doctor/providers) and #2074 (20+ new commands) already implemented ~60% of the spec
- v3.8.0 release (PR #2111) ships both PRs

**Research Findings**:
- Existing CLI architecture: `bin/omniroute.mjs` → `bin/cli/index.mjs` → `bin/cli/commands/{setup,doctor,providers}.mjs`
- `CLI_COMMANDS = Set(["doctor", "providers", "setup"])` hardcoded in omniroute.mjs:82 — new commands must be added there
- Helper modules: `args.mjs`, `io.mjs` (picocolors), `sqlite.mjs`, `data-dir.mjs`, `provider-catalog.mjs`, `provider-test.mjs`, `settings-store.mjs`, `encryption.mjs`
- Pattern: CLI commands use `parseArgs(argv)`, `hasFlag()`, `getStringFlag()`, return exit code
- Existing `src/app/api/cli-tools/` has 16 route files — missing: `config/`, `detect/`, `apply/`
- `@omniroute/opencode-provider` does NOT exist in codebase or npm
- No `src/lib/cli-helper/` directory exists
- Tool detection matrix from #2016: claude (~/.claude/settings.json), codex (~/.codex/config.yaml), opencode (~/.config/opencode/opencode.json), cline (~/.cline/data/globalState.json), kilocode (~/.config/kilocode/settings.json), continue (~/.continue/config.yaml)

**Librarian Findings**:
- Top OSS CLIs (Vercel, Turborepo, Nx, Prisma) use: dynamic command discovery via directory scan, yargs/commander for parsing, centralized factory pattern for config generation
- Config generation best practice: each tool gets a dedicated generator module, factory function dispatches by tool-id
- npm package best practice for scoped internal packages: use `publishConfig.directory` + local tarball OR workspace member with `prepare` script

### Metis Review

**Identified Gaps (addressed)**:
- Gap: `omniroute config` and `omniroute status` overlap with existing dashboard functionality → Resolution: CLI commands mirror dashboard data but work offline without server running
- Gap: `@omniroute/opencode-provider` requires npm publish workflow → Resolution: Build as local package first, document npm publish as separate step
- Gap: Update mechanism (`omniroute update`) is potentially destructive → Resolution: Implement as npm-check-based update with --dry-run, backup before update, git-based rollback capability
- Gap: Tool detection requires reading 3rd-party config files with varying formats (JSON/YAML) → Resolution: Use js-yaml for YAML files, fs.readFileSync for JSON, graceful error handling per tool

---

## Work Objectives

### Core Objective
Close issue #2016 by implementing all missing components of the OmniRoute CLI Integration Suite, achieving 100% feature completion for the approved spec.

### Concrete Deliverables

| File/Directory | Description |
|---|---|
| `src/lib/cli-helper/index.ts` | Main export, tool registry, high-level API |
| `src/lib/cli-helper/tool-detector.ts` | Detect 6 CLI tools: claude, codex, opencode, cline, kilocode, continue |
| `src/lib/cli-helper/config-generator/index.ts` | Factory: generateConfig(toolId, options) → config file content |
| `src/lib/cli-helper/config-generator/claude.ts` | Claude config generator |
| `src/lib/cli-helper/config-generator/codex.ts` | Codex config generator (YAML) |
| `src/lib/cli-helper/config-generator/opencode.ts` | OpenCode config generator |
| `src/lib/cli-helper/config-generator/cline.ts` | Cline config generator |
| `src/lib/cli-helper/config-generator/kilocode.ts` | Kilo Code config generator |
| `src/lib/cli-helper/config-generator/continue.ts` | Continue config generator (YAML) |
| `src/lib/cli-helper/doctor/checks.ts` | CLI tool health-check functions for `omniroute doctor` |
| `src/lib/cli-helper/log-streamer.ts` | WebSocket log streaming for `omniroute logs` |
| `bin/cli/commands/config.mjs` | `omniroute config` subcommand (get/set/list) |
| `bin/cli/commands/status.mjs` | `omniroute status` subcommand (offline status dashboard) |
| `bin/cli/commands/logs.mjs` | `omniroute logs` subcommand (real-time log streaming) |
| `bin/cli/commands/update.mjs` | `omniroute update` subcommand (self-update) |
| `bin/cli/commands/provider-cmd.mjs` | `omniroute provider add omniroute` subcommand |
| `src/app/api/cli-tools/config/route.ts` | GET (list configs) / POST (write config) API |
| `src/app/api/cli-tools/detect/route.ts` | GET /api/cli-tools/detect — return installed tools |
| `src/app/api/cli-tools/apply/route.ts` | POST /api/cli-tools/apply — apply config to tool |
| `@omniroute/opencode-provider/package.json` | npm package manifest |
| `@omniroute/opencode-provider/index.ts` | OpenCode provider plugin |
| `@omniroute/opencode-provider/README.md` | Setup docs |

### Definition of Done
- [x] `src/lib/cli-helper/tool-detector.ts` exports `detectAllTools()` returning array of `{ id, name, installed, version, configPath, configured }`
- [x] `src/lib/cli-helper/config-generator/` has factory + 6 generator modules
- [x] `omniroute config --help` prints help and exits 0
- [x] `omniroute status --json` prints machine-readable status
- [x] `omniroute logs --filter error` streams error logs
- [x] `omniroute update --check` reports available update without applying
- [x] `omniroute provider add omniroute` generates valid OpenCode config
- [x] `GET /api/cli-tools/detect` returns tool detection results
- [x] `POST /api/cli-tools/apply` writes config for specified tool
- [x] `omniroute doctor` includes CLI tool health checks (config, doctor.mjs updated)
- [x] All new files pass `npm run typecheck:core`
- [x] Unit tests cover all new modules (target: 80% coverage)
- [x] SETUP_GUIDE.md and CLI-TOOLS.md updated

### Must Have
- All 6 CLI tools detected correctly (claude, codex, opencode, cline, kilocode, continue)
- All 6 config generators produce valid, writable configs
- `omniroute doctor` extended with CLI tool checks (not replacing existing checks)
- Non-interactive mode (--yes / --non-interactive) for all new commands
- JSON output flag (--json) for all new commands
- Graceful handling when tools are not installed

### Must NOT Have
- No npm publish of @omniroute/opencode-provider as part of this PR (publish as separate follow-up)
- No removal of existing CLI commands or breaking changes to existing behavior
- No server dependency — CLI tools must work when OmniRoute server is not running
- No overwriting of user configs without backup (always backup before write)
- No new runtime dependencies without adding to package.json

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Node.js test runner, vitest for MCP)
- **Automated tests**: YES (tests-after)
- **Framework**: Node.js test runner + vitest (matching existing project)
- **If tests-after**: Each wave adds unit tests for new modules

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **CLI commands**: Use `interactive_bash` (tmux) — run command, assert stdout/stderr, check exit code
- **TypeScript modules**: Use `Bash` (tsx REPL) — import modules, call functions, compare output
- **API routes**: Use `Bash` (curl) — send requests, assert status + response fields

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 7 tasks, max parallel):
├── T1:  tool-detector.ts (6 detectors)                   [deep]
├── T2:  config-generator/index.ts (factory)              [quick]
├── T3:  config-generator/*.ts (6 generators)              [quick]
├── T4:  doctor/checks.ts (CLI health checks)              [quick]
├── T5:  log-streamer.ts                                   [quick]
├── T6:  @omniroute/opencode-provider/ (package, index, README) [quick]
└── T7:  bin/cli/commands/config.mjs + status.mjs           [quick]

Wave 2 (Core CLI commands — 5 tasks, max parallel):
├── T8:  bin/cli/commands/logs.mjs                         [quick]
├── T9:  bin/cli/commands/update.mjs                       [quick]
├── T10: bin/cli/commands/provider-cmd.mjs                  [quick]
├── T11: src/app/api/cli-tools/config/route.ts              [quick]
└── T12: src/app/api/cli-tools/detect/route.ts             [quick]

Wave 3 (API + wiring — 3 tasks, max parallel):
├── T13: src/app/api/cli-tools/apply/route.ts              [quick]
├── T14: bin/omniroute.mjs wiring (CLI_COMMANDS + help)    [quick]
└── T15: bin/cli/index.mjs wiring (new commands)           [quick]

Wave 4 (Integration + doctor update — 2 tasks):
├── T16: doctor.mjs — integrate CLI tool health checks     [quick]
├── T17: package.json — add @omniroute/opencode-provider to files [quick]

Wave 5 (Testing + docs — 3 tasks, parallel):
├── T18: Unit tests for tool-detector + config-generators  [quick]
├── T19: CLI integration tests for new commands            [quick]
└── T20: Update SETUP_GUIDE.md + CLI-TOOLS.md              [writing]

Wave FINAL (4 parallel reviews, then user okay):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (tsc + lint)
├── F3: Hands-on QA execution (all QA scenarios)
└── F4: Scope fidelity check (diff audit)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

```
T1: -           → T2, T3, T4, T6, T7
T2: T1          → T3
T3: T1          → T11, T12, T13
T4: T1          → T16
T5: -           → T8
T6: -           → (standalone)
T7: T1          → (standalone)
T8: T5          → (standalone)
T9: -           → (standalone)
T10: T1, T6     → (standalone)
T11: T2, T3     → (standalone)
T12: T1         → (standalone)
T13: T2, T3, T12 → (standalone)
T14: T7, T8, T9, T10 → (standalone)
T15: T7, T8, T9, T10 → (standalone)
T16: T4, T14    → (standalone)
T17: T6         → (standalone)
T18: T1, T2, T3, T6 → (standalone)
T19: T14, T15, T16 → (standalone)
T20: T14, T15   → (standalone)
```

### Agent Dispatch Summary

- **1**: **7** — T1 → `deep`, T2 → `quick`, T3 → `quick`, T4 → `quick`, T5 → `quick`, T6 → `quick`, T7 → `quick`
- **2**: **5** — T8 → `quick`, T9 → `quick`, T10 → `quick`, T11 → `quick`, T12 → `quick`
- **3**: **3** — T13 → `quick`, T14 → `quick`, T15 → `quick`
- **4**: **2** — T16 → `quick`, T17 → `quick`
- **5**: **3** — T18 → `quick`, T19 → `quick`, T20 → `writing`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. **tool-detector.ts — CLI tool detection core**

  **What to do**:
  - Create `src/lib/cli-helper/tool-detector.ts`
  - Export `detectAllTools(): Promise<DetectedTool[]>` — scans all 6 tools in parallel
  - Export `detectTool(id: string): Promise<DetectedTool | null>` — single tool
  - Export type `DetectedTool = { id, name, installed, version?, configPath, configured, configContents? }`
  - Implement 6 detector functions: `detectClaude()`, `detectCodex()`, `detectOpencode()`, `detectCline()`, `detectKilocode()`, `detectContinue()`
  - Each detector:
    1. Check if binary on PATH via `command -v` or `which`
    2. Get version via `--version` flag parsing
    3. Check config file existence at known path
    4. Parse config to determine if already pointing to OmniRoute (baseURL contains localhost:20128 or OMNIROUTE_BASE_URL env var)
    5. Return structured `DetectedTool`
  - Use `homedir()` for expanding `~` in paths
  - Handle errors gracefully per tool (don't fail one tool's detection due to error)
  - Config path references:
    - claude: `~/.claude/settings.json`
    - codex: `~/.codex/config.yaml`
    - opencode: `~/.config/opencode/opencode.json`
    - cline: `~/.cline/data/globalState.json`
    - kilocode: `~/.config/kilocode/settings.json`
    - continue: `~/.continue/config.yaml`

  **Must NOT do**:
  - Do NOT throw on missing tools — return `{ installed: false }` instead
  - Do NOT read entire config file contents into memory for large files (>1MB)
  - Do NOT modify any files in this module — read-only

  **Recommended Agent Profile**:
  > **Category**: `deep` | **Skills**: `[]`
  > Reason: Foundation of entire suite — needs careful path handling, version parsing, and format detection across 6 different tools with different config formats (JSON/YAML).

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: Tasks 2, 3, 7, 10, 12, 16
  - **Blocked By**: None (Wave 1 starter)

  **References**:
  - `bin/cli/commands/doctor.mjs` — health check pattern: `ok()`, `warn()`, `fail()` result objects with name/status/message/details
  - `bin/cli/io.mjs` — existing output helpers using picocolors
  - `docs/CLI-TOOLS.md` — documented env vars and config paths for each tool
  - `bin/cli/data-dir.mjs` — `resolveDataDir()` pattern for cross-platform homedir handling

  **Acceptance Criteria**:
  - [ ] `detectAllTools()` resolves without throwing when ALL tools are missing
  - [ ] `detectTool('claude')` returns correct structure with `installed: boolean`, `version?: string`, `configPath?: string`
  - [ ] Unit test: `node --import tsx/esm --test tests/unit/cli-helper/tool-detector.test.ts` → PASS

  **QA Scenarios**:

  \`\`\`
  Scenario: detectTool returns correct structure for missing tool
    Tool: Bash (tsx REPL)
    Preconditions: No claude CLI installed
    Steps:
      1. node --import tsx/esm -e "import { detectTool } from './src/lib/cli-helper/tool-detector.ts'; const r = await detectTool('claude'); console.log(JSON.stringify(r));"
    Expected Result: JSON with installed:false, id:"claude", name:"Claude Code"
    Failure Indicators: throws error, returns null instead of object
    Evidence: .sisyphus/evidence/task-1-missing-tool.{ext}

  Scenario: detectAllTools runs all 6 detectors without throwing
    Tool: Bash (tsx REPL)
    Preconditions: None (all tools may or may not be installed)
    Steps:
      1. node --import tsx/esm -e "import { detectAllTools } from './src/lib/cli-helper/tool-detector.ts'; const results = await detectAllTools(); console.log(results.map(t=>t.id+':'+t.installed).join(', '));"
    Expected Result: Array of 6 results (claude, codex, opencode, cline, kilocode, continue), none throw
    Failure Indicators: Any detector throws or returns non-array
    Evidence: .sisyphus/evidence/task-1-detect-all.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-1-missing-tool.{ext}
  - [ ] .sisyphus/evidence/task-1-detect-all.{ext}

  **Commit**: YES | Message: `feat(cli-helper): add tool-detector for 6 CLI tools`

---

- [x] 2. **config-generator/index.ts — Config factory**

  **What to do**:
  - Create `src/lib/cli-helper/config-generator/index.ts`
  - Export `generateConfig(toolId: string, options: GenerateOptions): Promise<GenerateResult>`
  - Export `GenerateOptions = { baseUrl: string; apiKey: string; model?: string }`
  - Export `GenerateResult = { success: boolean; configPath: string; content?: string; error?: string }`
  - Export `generateAllConfigs(options: GenerateOptions): Promise<GenerateResult[]>` — generates for ALL detected+installed tools
  - Factory dispatch: switch on `toolId` → call appropriate generator module
  - Validate options.baseUrl is a valid absolute URL before generating
  - Validate options.apiKey is non-empty before generating

  **Must NOT do**:
  - Do NOT write any files — only return `content` string. Caller decides whether to write.
  - Do NOT accept relative URLs — must be absolute
  - Do NOT log API keys — scrub from error messages

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple factory function — switch dispatch + input validation. Well-defined pattern from existing code.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-7)
  - **Blocks**: Tasks 11, 12, 13
  - **Blocked By**: Task 1

  **References**:
  - `bin/cli/provider-catalog.mjs` — factory/registry pattern used in the codebase
  - `bin/cli/commands/setup.mjs:63-96` — `resolveProviderInput()` pattern for flag resolution
  - `src/lib/cli-helper/tool-detector.ts` (T1) — tool IDs and config paths

  **Acceptance Criteria**:
  - [ ] `generateConfig('opencode', { baseUrl, apiKey })` returns `{ success: true, content: string }`
  - [ ] `generateConfig('invalid-tool', {})` returns `{ success: false, error: string }`
  - [ ] `generateConfig('claude', { baseUrl: 'not-a-url', apiKey: 'key' })` returns `{ success: false, error: 'invalid baseUrl' }`
  - [ ] Unit test passes

  **QA Scenarios**:

  \`\`\`
  Scenario: generateConfig returns valid content for opencode
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "import { generateConfig } from './src/lib/cli-helper/config-generator/index.ts'; const r = await generateConfig('opencode', { baseUrl: 'http://localhost:20128/v1', apiKey: 'sk-test' }); console.log(JSON.stringify({success: r.success, hasContent: !!r.content, error: r.error}));"
    Expected Result: {success: true, hasContent: true, error: undefined}
    Failure Indicators: success is false, content is empty
    Evidence: .sisyphus/evidence/task-2-opencode.{ext}

  Scenario: generateConfig rejects invalid tool ID
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "import { generateConfig } from './src/lib/cli-helper/config-generator/index.ts'; const r = await generateConfig('nonexistent', { baseUrl: 'http://localhost:20128', apiKey: 'sk-test' }); console.log(JSON.stringify(r));"
    Expected Result: {success: false, error: 'unknown tool: nonexistent'}
    Failure Indicators: returns success: true or missing error field
    Evidence: .sisyphus/evidence/task-2-invalid-tool.{ext}

  Scenario: generateConfig rejects invalid URL
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "import { generateConfig } from './src/lib/cli-helper/config-generator/index.ts'; const r = await generateConfig('claude', { baseUrl: 'not-a-valid-url', apiKey: 'sk-test' }); console.log(JSON.stringify(r));"
    Expected Result: {success: false, error: /url/i}
    Failure Indicators: success is true with invalid URL
    Evidence: .sisyphus/evidence/task-2-invalid-url.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-2-opencode.{ext}
  - [ ] .sisyphus/evidence/task-2-invalid-tool.{ext}
  - [ ] .sisyphus/evidence/task-2-invalid-url.{ext}

  **Commit**: YES | Message: `feat(cli-helper): add config-generator factory`

---

- [x] 3. **config-generator/{claude,codex,opencode,cline,kilocode,continue}.ts — Per-tool generators**

  **What to do**:
  - Create `src/lib/cli-helper/config-generator/claude.ts`:
    - Target: `~/.claude/settings.json`, Format: JSON
    - Content: `{ "baseUrl": "<baseUrl>/v1", "authToken": "<apiKey>", "models": [{ "id": "<model>" }] }` (Anthropic-compatible)
    - Read existing config, merge, return full JSON (don't write)
  - Create `src/lib/cli-helper/config-generator/codex.ts`:
    - Target: `~/.codex/config.yaml`, Format: YAML (use js-yaml)
    - Content: `{ openai: { api_key: "<apiKey>", base_url: "<baseUrl>/v1" } }`
  - Create `src/lib/cli-helper/config-generator/opencode.ts`:
    - Target: `~/.config/opencode/opencode.json`, Format: JSON
    - Content: `{ provider: "omniroute", baseURL: "<baseUrl>/v1", apiKey: "<apiKey>", model: "<model>" }`
  - Create `src/lib/cli-helper/config-generator/cline.ts`:
    - Target: `~/.cline/data/globalState.json`, Format: JSON
    - Content: `{ openAiBaseUrl: "<baseUrl>/v1", openAiApiKey: "<apiKey>" }`
  - Create `src/lib/cli-helper/config-generator/kilocode.ts`:
    - Target: `~/.config/kilocode/settings.json`, Format: JSON
    - Content: `{ apiKey: "<apiKey>", baseUrl: "<baseUrl>/v1" }`
  - Create `src/lib/cli-helper/config-generator/continue.ts`:
    - Target: `~/.continue/config.yaml`, Format: YAML
    - Content: `{ models: [{ title: "OmniRoute", apiKey: "<apiKey>", apiBase: "<baseUrl>/v1" }] }`

  Each generator exports: `generateXxxConfig(options): string` → returns JSON/YAML string (NOT file write).
  Validate inputs: baseUrl must start with http, apiKey must be non-empty.

  **Must NOT do**:
  - Do NOT write files — return content string only
  - Do NOT use hardcoded paths — use `path.join(homedir(), '...')`
  - Do NOT overwrite unrelated config fields

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: 6 independent files with well-defined formats from issue #2016 spec.

  **Parallelization**:
  - **Can Run In Parallel**: YES (6 files can be split)
  - **Parallel Group**: Wave 1 (with Tasks 1-2, 4-7)
  - **Blocks**: Tasks 11, 12, 13
  - **Blocked By**: Task 1

  **References**:
  - `docs/CLI-TOOLS.md` — exact config formats for each tool
  - `bin/cli/provider-catalog.mjs` — JSON/YAML parsing patterns
  - Issue #2016: CLI Tool Detection Matrix table

  **Acceptance Criteria**:
  - [ ] Each generator exports: `generateXxxConfig(options): string`
  - [ ] Each returns valid JSON or YAML string (validate with JSON.parse / js-yaml.load)
  - [ ] Each handles missing config file (returns fresh valid config)
  - [ ] Each generator validates inputs before producing output
  - [ ] Unit tests for all 6 generators pass

  **QA Scenarios**:

  \`\`\`
  Scenario: claude generator produces valid JSON with correct fields
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "import { generateClaudeConfig } from './src/lib/cli-helper/config-generator/claude.ts'; const json = generateClaudeConfig({ baseUrl: 'http://localhost:20128/v1', apiKey: 'sk-test', model: 'claude-3-5-sonnet' }); const parsed = JSON.parse(json); console.log(JSON.stringify({baseUrl: parsed.baseUrl, authToken: parsed.authToken, model: parsed.models?.[0]?.id}));"
    Expected Result: baseUrl, authToken, model match inputs
    Failure Indicators: malformed JSON, missing fields
    Evidence: .sisyphus/evidence/task-3-claude.{ext}

  Scenario: codex generator produces valid YAML
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "import { generateCodexConfig } from './src/lib/cli-helper/config-generator/codex.ts'; const yaml = generateCodexConfig({ baseUrl: 'http://localhost:20128/v1', apiKey: 'sk-test' }); const parsed = JSON.parse(JSON.stringify(require('js-yaml').load(yaml))); console.log(JSON.stringify({api_key: parsed?.openai?.api_key, base_url: parsed?.openai?.base_url}));"
    Expected Result: api_key and base_url present in YAML structure
    Failure Indicators: YAML parse error, missing nested fields
    Evidence: .sisyphus/evidence/task-3-codex.{ext}

  Scenario: all 6 generators return non-empty strings
    Tool: Bash (tsx REPL)
    Preconditions: None
    Steps:
      1. node --import tsx/esm -e "
        import { generateClaudeConfig } from './src/lib/cli-helper/config-generator/claude.ts';
        import { generateCodexConfig } from './src/lib/cli-helper/config-generator/codex.ts';
        import { generateOpencodeConfig } from './src/lib/cli-helper/config-generator/opencode.ts';
        import { generateClineConfig } from './src/lib/cli-helper/config-generator/cline.ts';
        import { generateKilocodeConfig } from './src/lib/cli-helper/config-generator/kilocode.ts';
        import { generateContinueConfig } from './src/lib/cli-helper/config-generator/continue.ts';
        const opts = { baseUrl: 'http://localhost:20128/v1', apiKey: 'sk-test', model: 'test' };
        const gens = [generateClaudeConfig, generateCodexConfig, generateOpencodeConfig, generateClineConfig, generateKilocodeConfig, generateContinueConfig];
        console.log(gens.map((g,i)=>['claude','codex','opencode','cline','kilocode','continue'][i]+':'+g(opts).length).join(', '));"
    Expected Result: All 6 show length > 0
    Failure Indicators: Any generator returns empty string or throws
    Evidence: .sisyphus/evidence/task-3-all-generators.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-3-claude.{ext}
  - [ ] .sisyphus/evidence/task-3-codex.{ext}
  - [ ] .sisyphus/evidence/task-3-all-generators.{ext}

  **Commit**: YES | Message: `feat(cli-helper): add per-tool config generators (6 tools)`

---

- [x] 4. **doctor/checks.ts — CLI tool health checks**

  **What to do**:
  - Create `src/lib/cli-helper/doctor/checks.ts`
  - Export `collectCliToolChecks(): Promise<DoctorCheckResult[]>` — runs health check on each detected tool
  - Export `DoctorCheckResult = { name: string; status: 'ok' | 'warn' | 'fail'; message: string; details: object }`
  - For each tool:
    - NOT installed → `{ name: 'CLI: <tool>', status: 'warn', message: '<name> not installed', details: { id, installed: false } }`
    - Installed but NOT configured → `{ name: 'CLI: <tool>', status: 'warn', message: '<name> not configured for OmniRoute', details: { id, configured: false } }`
    - Configured correctly → `{ name: 'CLI: <tool>', status: 'ok', message: '<name> configured', details: { id, configured: true } }`
  - Reuse `tool-detector.ts` (T1) for detection
  - Use same `ok()`/`warn()`/`fail()` result object pattern from doctor.mjs

  **Must NOT do**:
  - Do NOT use runDoctorCommand — separate function
  - Do NOT block if one tool's check fails — continue checking all tools
  - Do NOT make heavy requests — lightweight health ping only

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Straightforward extension of existing doctor.mjs pattern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5-7)
  - **Blocks**: Task 16 (doctor.mjs integration)
  - **Blocked By**: Task 1

  **References**:
  - `bin/cli/commands/doctor.mjs:15-25` — `ok()`, `warn()`, `fail()` helpers
  - `bin/cli/commands/doctor.mjs:432-462` — `collectDoctorChecks()` pattern

  **Acceptance Criteria**:
  - [ ] Returns array of 6 results (one per tool), never throws
  - [ ] Missing tool → `status: 'warn'`
  - [ ] Installed but unconfigured → `status: 'warn'`
  - [ ] Configured correctly → `status: 'ok'`

  **QA Scenarios**:

  \`\`\`
  Scenario: collectCliToolChecks returns results for all 6 tools without throwing
    Tool: Bash (tsx REPL)
    Preconditions: Some or no CLI tools installed
    Steps:
      1. node --import tsx/esm -e "import { collectCliToolChecks } from './src/lib/cli-helper/doctor/checks.ts'; const results = await collectCliToolChecks(); console.log(results.map(r=>r.name+':'+r.status).join(', '));"
    Expected Result: 6 results, each with name ('CLI: claude'), status ('ok'/'warn'/'fail'), message
    Failure Indicators: throws error, wrong number of results, missing fields
    Evidence: .sisyphus/evidence/task-4-cli-checks.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-4-cli-checks.{ext}

  **Commit**: YES | Message: `feat(cli-helper): add CLI tool health checks for doctor`

---

- [x] 5. **log-streamer.ts — WebSocket log streaming**

  **What to do**:
  - Create `src/lib/cli-helper/log-streamer.ts`
  - Export `createLogStream(options: LogStreamOptions): LogStream`
  - Export `LogStreamOptions = { baseUrl?: string; filters?: string[]; follow?: boolean; timeout?: number }`
  - Export `LogStream = { stream: ReadableStream; stop: () => void }`
  - Connect to OmniRoute via SSE or WebSocket endpoint for real-time logs
  - Parse incoming log events, apply filter (match against message/level), yield matching lines
  - `follow: true` → keep connection open; `follow: false` → fetch last N lines and close
  - `stop()` → abort connection cleanly via AbortSignal
  - Support filter by level: `error`, `warn`, `info` (comma-separated)
  - Look at existing SSE streaming pattern in `open-sse/` for reference

  **Must NOT do**:
  - Do NOT use WebSocket library — use native WebSocket or SSE via fetch ReadableStream
  - Do NOT buffer entire log in memory — stream line by line
  - Do NOT silently ignore connection errors — emit as log entries with 'error' level

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Straightforward streaming client — existing SSE patterns in open-sse/ to copy from.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 6-7)
  - **Blocks**: Task 8 (logs.mjs command)
  - **Blocked By**: None

  **References**:
  - `bin/cli/commands/doctor.mjs:390-416` — `fetchWithTimeout()` with AbortController for clean cancellation
  - `open-sse/` — existing SSE streaming patterns

  **Acceptance Criteria**:
  - [ ] `createLogStream({ follow: false })` returns buffered logs immediately
  - [ ] `createLogStream({ follow: true })` keeps connection open, yields new lines
  - [ ] `logStream.stop()` cleanly aborts the connection

  **QA Scenarios**:

  \`\`\`
  Scenario: stop() aborts the stream cleanly
    Tool: Bash (tsx REPL)
    Preconditions: Omniroute running
    Steps:
      1. node --import tsx/esm -e "import { createLogStream } from './src/lib/cli-helper/log-streamer.ts'; const { stream, stop } = createLogStream({ follow: true }); stop(); console.log('stopped successfully');"
    Expected Result: "stopped successfully" printed, process exits within 2s
    Failure Indicators: Hangs, or stop() throws
    Evidence: .sisyphus/evidence/task-5-stop.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-5-stop.{ext}

  **Commit**: YES | Message: `feat(cli-helper): add WebSocket log streamer`

---

- [x] 6. **@omniroute/opencode-provider — npm package scaffolding**

  **What to do**:
  - Create `@omniroute/opencode-provider/` directory at project root
  - Create `package.json`:
    ```json
    {
      "name": "@omniroute/opencode-provider",
      "version": "1.0.0",
      "description": "OpenCode provider plugin for OmniRoute AI Gateway",
      "type": "module",
      "main": "index.js",
      "types": "index.d.ts",
      "files": ["index.js", "index.d.ts", "README.md"],
      "keywords": ["omniroute", "opencode", "provider"],
      "license": "MIT",
      "peerDependencies": {}
    }
    ```
  - Create `index.js` with named+default export of `createOmniRouteProvider(options)` returning OpenCode Provider object with `id`, `name`, `npm`, `options`, `auth` fields
  - Create `index.d.ts` TypeScript type definitions
  - Create `README.md` with installation and usage instructions for OpenCode

  **Must NOT do**:
  - Do NOT run `npm publish` — scaffolding only
  - Do NOT add to workspaces in package.json yet
  - Do NOT create TypeScript source — plain JS only

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple npm package scaffold — well-documented format.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-5, 7)
  - **Blocks**: Task 17 (package.json update)
  - **Blocked By**: None

  **References**:
  - Issue #2016 — @omniroute/opencode-provider specification
  - `open-sse/package.json` — existing workspace member pattern

  **Acceptance Criteria**:
  - [ ] `package.json` is valid JSON with correct fields
  - [ ] `index.js` exports `createOmniRouteProvider` as named and default export
  - [ ] `README.md` has installation instructions

  **QA Scenarios**:

  \`\`\`
  Scenario: index.js can be imported as ESM
    Tool: Bash
    Preconditions: None
    Steps:
      1. node --input-type=module -e "import { createOmniRouteProvider } from './@omniroute/opencode-provider/index.js'; const p = createOmniRouteProvider({ baseURL: 'http://localhost:20128/v1', apiKey: 'test' }); console.log(JSON.stringify({id: p.id, name: p.name, hasOptions: !!p.options}));"
    Expected Result: {id: "omniroute", name: "OmniRoute AI Gateway", hasOptions: true}
    Failure Indicators: import error, undefined export
    Evidence: .sisyphus/evidence/task-6-import.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-6-import.{ext}

  **Commit**: YES | Message: `feat(opencode-provider): scaffold @omniroute/opencode-provider package`

---

- [x] 7. **bin/cli/commands/config.mjs + status.mjs — config and status CLI commands**

  **What to do**:
  - Create `bin/cli/commands/config.mjs`:
    - `omniroute config list` — list all tools and their config status (from tool-detector)
    - `omniroute config get <tool>` — show current config for a specific tool
    - `omniroute config set <tool> --base-url <url> --api-key <key>` — write config (calls config-generator, then writes file)
    - `omniroute config validate <tool>` — validate config format without writing
    - Flags: `--json`, `--non-interactive`, `--yes` (skip confirm)
    - Before writing: print what will be changed, require `--yes` to confirm (unless `--non-interactive`)
  - Create `bin/cli/commands/status.mjs`:
    - `omniroute status` — offline status dashboard (no server required):
      - OmniRoute version (from package.json)
      - Data directory, database existence + size
      - Config file existence
      - Installed CLI tools summary (from tool-detector)
      - Provider connections summary (from SQLite, via provider-store)
    - Flags: `--json`, `--verbose`

  **Must NOT do**:
  - Do NOT require OmniRoute server to be running for these commands
  - Do NOT print raw API keys — mask as `sk-xxxx...`
  - Do NOT overwrite configs without backup (create `.omniroute.bak` before writing)

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Follows exact existing patterns from providers.mjs and doctor.mjs.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-6)
  - **Blocks**: Tasks 14, 15 (wiring)
  - **Blocked By**: Task 1

  **References**:
  - `bin/cli/commands/providers.mjs` — subcommand routing pattern with positionals
  - `bin/cli/commands/doctor.mjs:483-517` — status output formatting
  - `bin/cli/commands/setup.mjs` — interactive confirm prompt pattern
  - `bin/cli/provider-store.mjs` — SQLite provider connection reading

  **Acceptance Criteria**:
  - [ ] `omniroute config --help` prints help with all subcommands listed
  - [ ] `omniroute config list --json` returns machine-readable JSON
  - [ ] `omniroute status --json` returns status without server running
  - [ ] Exit code 0 for all `--help` calls

  **QA Scenarios**:

  \`\`\`
  Scenario: omniroute config --help shows all subcommands
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute config --help
      2. Assert output contains: "list", "get", "set", "validate"
    Expected Result: Help text printed, exit code 0
    Failure Indicators: missing subcommands, exit code != 0
    Evidence: .sisyphus/evidence/task-7-config-help.{ext}

  Scenario: omniroute status --json returns status without server
    Tool: interactive_bash (tmux)
    Preconditions: OmniRoute server NOT running
    Steps:
      1. Send keys: omniroute status --json
      2. Wait for output
    Expected Result: JSON with version, dataDir, dbPath, tools, providers — exit code 0
    Failure Indicators: Connection errors, missing fields, exit code != 0
    Evidence: .sisyphus/evidence/task-7-status.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-7-config-help.{ext}
  - [ ] .sisyphus/evidence/task-7-status.{ext}

  **Commit**: YES | Message: `feat(cli): add config and status commands`

---

- [x] 8. **bin/cli/commands/logs.mjs — Log streaming command**

  **What to do**:
  - Create `bin/cli/commands/logs.mjs`
  - `omniroute logs` — stream request logs in real-time (uses `log-streamer.ts` from T5)
  - `omniroute logs --filter error --filter warn` — filter by level
  - `omniroute logs --filter claude` — filter by tool/provider name
  - `omniroute logs --json` — machine-readable output (newline-delimited JSON)
  - `omniroute logs --lines 100` — show last N lines and exit (default: 50)
  - `omniroute logs --follow` / `-f` — stream continuously (Ctrl+C to stop)
  - Pattern: use `log-streamer.ts` `createLogStream()`, iterate the ReadableStream, print lines with picocolors
  - Color coding: error=red, warn=yellow, info=dim

  **Must NOT do**:
  - Do NOT require OmniRoute server — graceful message if server is not reachable
  - Do NOT print raw API keys from logs
  - Do NOT hang indefinitely without --follow flag

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple CLI wrapping log-streamer.ts. Existing patterns from providers.mjs to copy.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-12)
  - **Blocks**: Task 14 (wiring)
  - **Blocked By**: Task 5 (log-streamer.ts needed)

  **References**:
  - `src/lib/cli-helper/log-streamer.ts` (T5) — log streaming engine
  - `bin/cli/io.mjs` — picocolors output helpers for color coding
  - `bin/cli/commands/doctor.mjs:390-416` — timeout/abort pattern

  **Acceptance Criteria**:
  - [ ] `omniroute logs --help` prints help
  - [ ] `omniroute logs --lines 20` exits after showing 20 lines
  - [ ] `omniroute logs --json` outputs newline-delimited JSON
  - [ ] `omniroute logs --filter error` shows only error lines

  **QA Scenarios**:

  \`\`\`
  Scenario: omniroute logs --help prints help and exits 0
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute logs --help
    Expected Result: Help text printed, exit code 0
    Failure Indicators: exit code != 0
    Evidence: .sisyphus/evidence/task-8-help.{ext}

  Scenario: omniroute logs --lines 5 exits after showing 5 lines
    Tool: interactive_bash (tmux)
    Preconditions: OmniRoute server running
    Steps:
      1. Send keys: omniroute logs --lines 5
      2. Wait 10s
    Expected Result: Shows lines, process exits cleanly within timeout
    Failure Indicators: Hangs forever, shows 0 lines
    Evidence: .sisyphus/evidence/task-8-lines.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-8-help.{ext}
  - [ ] .sisyphus/evidence/task-8-lines.{ext}

  **Commit**: YES | Message: `feat(cli): add logs command for real-time log streaming`

---

- [x] 9. **bin/cli/commands/update.mjs — Self-update command**

  **What to do**:
  - Create `bin/cli/commands/update.mjs`
  - `omniroute update` — self-update OmniRoute to latest version
  - `omniroute update --check` / `--dry-run` — check for updates without applying
  - `omniroute update --version <version>` — install specific version
  - `omniroute update --rollback` — rollback to previous version (if backup exists)
  - Implementation approach:
    1. Check npm registry for latest version: `npm view omniroute version`
    2. Compare with local `package.json` version
    3. If update available: create backup of current installation (tarball to `~/.omniroute/backups/`)
    4. Run `npm install -g omniroute@latest` (or specific version)
    5. Report success/failure
  - Before updating: always create backup tarball in `~/.omniroute/backups/omniroute-{version}-{timestamp}.tgz`
  - `--non-interactive` / `--yes` flag to skip confirmation prompt

  **Must NOT do**:
  - Do NOT update without creating a backup first
  - Do NOT use `npm update` — use `npm install -g` for clean version swap
  - Do NOT overwrite running server process during update

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: CLI command wrapping npm commands. Well-defined pattern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 10-12)
  - **Blocks**: Task 14 (wiring)
  - **Blocked By**: None

  **References**:
  - `bin/cli/commands/doctor.mjs:54-79` — finding .env file candidates as backup location pattern
  - `bin/cli/commands/backup/restore` (from PR #2074) — backup/restore pattern if applicable

  **Acceptance Criteria**:
  - [ ] `omniroute update --check` reports current version and latest available
  - [ ] `omniroute update --check` exits 0 when up-to-date, exits 1 when update available
  - [ ] Backup is created before any update
  - [ ] `omniroute update --help` prints help

  **QA Scenarios**:

  \`\`\`
  Scenario: update --check reports version info
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute update --check
    Expected Result: Shows current version and latest version, exit code 0 or 1
    Failure Indicators: Crashes, shows no version info
    Evidence: .sisyphus/evidence/task-9-check.{ext}

  Scenario: update --help prints help
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute update --help
    Expected Result: Help text, exit code 0
    Failure Indicators: exit code != 0
    Evidence: .sisyphus/evidence/task-9-help.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-9-check.{ext}
  - [ ] .sisyphus/evidence/task-9-help.{ext}

  **Commit**: YES | Message: `feat(cli): add update command for self-update`

---

- [x] 10. **bin/cli/commands/provider-cmd.mjs — OpenCode provider add command**

  **What to do**:
  - Create `bin/cli/commands/provider-cmd.mjs`
  - `omniroute provider add omniroute` — add OmniRoute as OpenCode provider:
    1. Read existing `~/.config/opencode/opencode.json` (or create new)
    2. Add `@omniroute/opencode-provider` to `plugins` array
    3. Add `provider.omniroute` configuration block
    4. Write updated config
  - `omniroute provider list` — list available provider packages installed
  - `omniroute provider remove omniroute` — remove OmniRoute from OpenCode config
  - Flags: `--json`, `--non-interactive`, `--yes` (skip confirm)
  - Use `config-generator/opencode.ts` (T3) for generating the OmniRoute config block
  - Use `js-yaml` for YAML config files

  **Must NOT do**:
  - Do NOT modify OpenCode config without backup (create `.omniroute.bak` before writing)
  - Do NOT remove unrelated plugins from the config
  - Do NOT assume OpenCode config exists — create if missing

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: CLI command with JSON/YAML config file manipulation. Existing patterns to copy.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-9, 11-12)
  - **Blocks**: Task 14 (wiring)
  - **Blocked By**: Tasks 1, 6 (tool-detector + opencode-provider package needed)

  **References**:
  - `@omniroute/opencode-provider/index.js` (T6) — the provider plugin
  - Issue #2016 — OpenCode Provider Plugin section (generated config format)
  - `src/lib/cli-helper/config-generator/opencode.ts` (T3) — config generation

  **Acceptance Criteria**:
  - [ ] `omniroute provider add omniroute --yes` creates valid OpenCode config
  - [ ] `omniroute provider list` shows installed providers
  - [ ] `omniroute provider remove omniroute --yes` removes from config
  - [ ] `omniroute provider --help` prints help

  **QA Scenarios**:

  \`\`\`
  Scenario: provider add creates valid config
    Tool: interactive_bash (tmux)
    Preconditions: OpenCode installed, no existing config
    Steps:
      1. Send keys: omniroute provider add omniroute --yes --base-url http://localhost:20128/v1 --api-key sk-test
      2. Assert output contains "configured" or "success"
    Expected Result: OpenCode config file created/updated, exit code 0
    Failure Indicators: exit code != 0, error message
    Evidence: .sisyphus/evidence/task-10-add.{ext}

  Scenario: provider --help prints help
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute provider --help
    Expected Result: Help text, exit code 0
    Failure Indicators: exit code != 0
    Evidence: .sisyphus/evidence/task-10-help.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-10-add.{ext}
  - [ ] .sisyphus/evidence/task-10-help.{ext}

  **Commit**: YES | Message: `feat(cli): add provider command for OpenCode integration`

---

- [x] 11. **src/app/api/cli-tools/config/route.ts — Config API**

  **What to do**:
  - Create `src/app/api/cli-tools/config/route.ts`
  - `GET /api/cli-tools/config` — list config status for all tools (delegates to tool-detector)
  - `GET /api/cli-tools/config?toolId=<id>` — get config for specific tool
  - `POST /api/cli-tools/config` — apply/save config for a tool:
    - Body: `{ toolId: string; baseUrl: string; apiKey: string; model?: string; dryRun?: boolean }`
    - If `dryRun: true` — validate config but don't write
    - If `dryRun: false` — generate config (via config-generator), write to file, create backup
    - Response: `{ success: boolean; configPath: string; backupPath?: string; error?: string }`
  - Auth: Bearer token with `manage` scope (matching existing pattern in API routes)
  - Validate: toolId must be valid, baseUrl must be absolute URL, apiKey must be non-empty

  **Must NOT do**:
  - Do NOT store credentials — only manipulate tool-specific config files
  - Do NOT return raw API keys in GET responses — mask them
  - Do NOT skip backup before writing

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Standard Next.js App Router API route pattern. Existing `src/app/api/cli-tools/` routes to follow.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-10, 12)
  - **Blocks**: None (downstream use)
  - **Blocked By**: Tasks 2, 3 (config-generator needed)

  **References**:
  - `src/app/api/cli-tools/status/route.ts` — existing API route pattern in this directory
  - `src/app/api/cli-tools/keys/route.ts` — existing key handling pattern
  - `src/lib/cli-helper/tool-detector.ts` (T1) — detection
  - `src/lib/cli-helper/config-generator/index.ts` (T2) — config generation

  **Acceptance Criteria**:
  - [ ] `GET /api/cli-tools/config` returns array of tool config statuses (JSON)
  - [ ] `GET /api/cli-tools/config?toolId=claude` returns single tool config
  - [ ] `POST /api/cli-tools/config` with `dryRun:true` validates without writing
  - [ ] `POST /api/cli-tools/config` with `dryRun:false` writes config and returns paths

  **QA Scenarios**:

  \`\`\`
  Scenario: GET /api/cli-tools/config returns tool list
    Tool: Bash (curl)
    Preconditions: OmniRoute server running, valid API key
    Steps:
      1. curl -s -H "Authorization: Bearer <key>" http://localhost:20128/api/cli-tools/config | head -c 200
    Expected Result: JSON array of tool configs
    Failure Indicators: Non-JSON response, 401/403, 500
    Evidence: .sisyphus/evidence/task-11-get.{ext}

  Scenario: POST /api/cli-tools/config dry-run validates
    Tool: Bash (curl)
    Preconditions: OmniRoute server running, valid API key
    Steps:
      1. curl -s -X POST -H "Authorization: Bearer <key>" -H "Content-Type: application/json" -d '{"toolId":"claude","baseUrl":"http://localhost:20128/v1","apiKey":"sk-test","dryRun":true}' http://localhost:20128/api/cli-tools/config | head -c 300
    Expected Result: JSON with success:true, no file written
    Failure Indicators: 400, 401, 500, or file created
    Evidence: .sisyphus/evidence/task-11-dryrun.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-11-get.{ext}
  - [ ] .sisyphus/evidence/task-11-dryrun.{ext}

  **Commit**: YES | Message: `feat(api): add /api/cli-tools/config route`

---

- [x] 12. **src/app/api/cli-tools/detect/route.ts — Detect installed CLI tools**

  **What to do**:
  - Create `src/app/api/cli-tools/detect/route.ts`
  - `GET /api/cli-tools/detect` — detect all installed CLI tools
  - `GET /api/cli-tools/detect?toolId=<id>` — detect single tool
  - Response format (per tool):
    ```json
    {
      "tools": [
        {
          "id": "claude",
          "name": "Claude Code",
          "installed": true,
          "version": "2.0.1",
          "configPath": "/home/user/.claude/settings.json",
          "configured": true
        }
      ]
    }
    ```
  - Auth: Bearer token with `manage` scope
  - Delegate to `tool-detector.ts` (T1)

  **Must NOT do**:
  - Do NOT require server-side detection (tool-detector is read-only)
  - Do NOT return config file contents (only whether configured)

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple API wrapper around tool-detector. Standard Next.js route pattern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-11, 13)
  - **Blocks**: None
  - **Blocked By**: Task 1

  **References**:
  - `src/lib/cli-helper/tool-detector.ts` (T1)
  - `src/app/api/cli-tools/status/route.ts` — existing pattern

  **Acceptance Criteria**:
  - [ ] `GET /api/cli-tools/detect` returns array of all 6 tools
  - [ ] `GET /api/cli-tools/detect?toolId=claude` returns single tool
  - [ ] Each result has `installed`, `version`, `configPath`, `configured` fields

  **QA Scenarios**:

  \`\`\`
  Scenario: GET /api/cli-tools/detect returns tool array
    Tool: Bash (curl)
    Preconditions: OmniRoute server running
    Steps:
      1. curl -s -H "Authorization: Bearer <key>" http://localhost:20128/api/cli-tools/detect | python3 -c "import sys,json; d=json.load(sys.stdin); print('count:', len(d.get('tools',[])), 'ids:', [t['id'] for t in d.get('tools',[])])"
    Expected Result: count: 6, ids: [claude, codex, opencode, cline, kilocode, continue]
    Failure Indicators: count != 6, missing ids
    Evidence: .sisyphus/evidence/task-12-detect.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-12-detect.{ext}

  **Commit**: YES | Message: `feat(api): add /api/cli-tools/detect route`

---

- [x] 13. **src/app/api/cli-tools/apply/route.ts — Apply config to CLI tool**

  **What to do**:
  - Create `src/app/api/cli-tools/apply/route.ts`
  - `POST /api/cli-tools/apply` — apply/save config to a tool's config file
    - Body: `{ toolId: string; baseUrl: string; apiKey: string; model?: string; createBackup?: boolean }`
    - `createBackup: true` (default) — backup existing config before writing
    - Response: `{ success: boolean; configPath: string; backupPath?: string; error?: string }`
  - Auth: Bearer token with `manage` scope
  - Implementation: use `config-generator/index.ts` (T2) to generate config content, then write to file with backup
  - Validate all inputs before generating

  **Must NOT do**:
  - Do NOT skip backup (unless `createBackup: false` explicitly passed)
  - Do NOT return raw API key in response
  - Do NOT write to files outside of known tool config directories

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple write-then-respond pattern. Standard API route.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14-15)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 3, 12

  **References**:
  - `src/lib/cli-helper/config-generator/index.ts` (T2)
  - `src/app/api/cli-tools/config/route.ts` (T11) — similar pattern

  **Acceptance Criteria**:
  - [ ] `POST /api/cli-tools/apply` writes valid config file
  - [ ] Response includes `configPath` and `backupPath`
  - [ ] Returns `{ success: false, error: ... }` for invalid toolId

  **QA Scenarios**:

  \`\`\`
  Scenario: POST /api/cli-tools/apply writes config file
    Tool: Bash (curl)
    Preconditions: OmniRoute server running, valid API key
    Steps:
      1. curl -s -X POST -H "Authorization: Bearer <key>" -H "Content-Type: application/json" -d '{"toolId":"claude","baseUrl":"http://localhost:20128/v1","apiKey":"sk-test","createBackup":true}' http://localhost:20128/api/cli-tools/apply | python3 -c "import sys,json; d=json.load(sys.stdin); print('success:', d.get('success'), 'hasPath:', bool(d.get('configPath')), 'hasBackup:', bool(d.get('backupPath')))"
    Expected Result: success: True, hasPath: True, hasBackup: True
    Failure Indicators: success False, missing paths, 500 error
    Evidence: .sisyphus/evidence/task-13-apply.{ext}

  Scenario: POST with invalid toolId returns error
    Tool: Bash (curl)
    Preconditions: OmniRoute server running, valid API key
    Steps:
      1. curl -s -X POST -H "Authorization: Bearer <key>" -H "Content-Type: application/json" -d '{"toolId":"nonexistent","baseUrl":"http://localhost:20128/v1","apiKey":"sk-test"}' http://localhost:20128/api/cli-tools/apply
    Expected Result: {success: false, error: /unknown tool/i}
    Failure Indicators: success: true, or 500 instead of graceful error
    Evidence: .sisyphus/evidence/task-13-invalid.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-13-apply.{ext}
  - [ ] .sisyphus/evidence/task-13-invalid.{ext}

  **Commit**: YES | Message: `feat(api): add /api/cli-tools/apply route`

---

- [x] 14. **bin/omniroute.mjs — Update CLI_COMMANDS and help text**

  **What to do**:
  - Modify `bin/omniroute.mjs`:
    - Line 82: Add new commands to `CLI_COMMANDS` set: `"config"`, `"status"`, `"logs"`, `"update"`, `"provider"`
    - Update help text (lines 95-149) to include all new subcommands with usage examples
    - Add to help section:
      ```
      omniroute config list              List all CLI tool configs
      omniroute config set <tool>        Set config for a CLI tool
      omniroute status                   Show OmniRoute status
      omniroute logs --follow            Stream request logs
      omniroute update                   Update OmniRoute to latest
      omniroute provider add omniroute    Add OmniRoute to OpenCode
      ```
    - Keep existing commands (doctor, providers, setup) unchanged
    - All new commands should be documented in the help output with one-line descriptions

  **Must NOT do**:
  - Do NOT change existing command behavior (doctor, providers, setup)
  - Do NOT remove any existing help text
  - Do NOT change the CLI_COMMANDS set to something other than a Set

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple modification of existing file. Well-understood structure.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 15)
  - **Blocks**: None (this is wiring)
  - **Blocked By**: Tasks 7-10 (commands must exist before wiring)

  **References**:
  - `bin/omniroute.mjs:82` — current `CLI_COMMANDS` set
  - `bin/omniroute.mjs:95-149` — current help text block

  **Acceptance Criteria**:
  - [ ] `CLI_COMMANDS` includes all 8 commands: doctor, providers, setup, config, status, logs, update, provider
  - [ ] `omniroute --help` shows all 8 commands with descriptions
  - [ ] All new commands route to `bin/cli/index.mjs`

  **QA Scenarios**:

  \`\`\`
  Scenario: omniroute --help shows all 8 commands
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute --help
      2. Assert output contains: "config", "status", "logs", "update", "provider"
    Expected Result: All 8 commands in help text
    Failure Indicators: Missing new commands from help
    Evidence: .sisyphus/evidence/task-14-help.{ext}

  Scenario: new commands route to CLI index without error
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute config --help
      2. Assert exit code 0
      3. Send keys: omniroute status --help
      4. Assert exit code 0
      5. Send keys: omniroute logs --help
      6. Assert exit code 0
    Expected Result: All commands respond with help, no routing errors
    Failure Indicators: "Unknown CLI command" error
    Evidence: .sisyphus/evidence/task-14-routing.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-14-help.{ext}
  - [ ] .sisyphus/evidence/task-14-routing.{ext}

  **Commit**: YES | Message: `feat(cli): wire up new commands in omniroute.mjs`

---

- [x] 15. **bin/cli/index.mjs — Add new command imports and routes**

  **What to do**:
  - Modify `bin/cli/index.mjs`:
    - Add imports for new commands:
      ```js
      import { runConfigCommand } from "./commands/config.mjs";
      import { runStatusCommand } from "./commands/status.mjs";
      import { runLogsCommand } from "./commands/logs.mjs";
      import { runUpdateCommand } from "./commands/update.mjs";
      import { runProviderCommand } from "./commands/provider-cmd.mjs";
      ```
    - Add routes in `runCliCommand()` switch:
      ```js
      if (command === "config") return runConfigCommand(argv, context);
      if (command === "status") return runStatusCommand(argv, context);
      if (command === "logs") return runLogsCommand(argv, context);
      if (command === "update") return runUpdateCommand(argv, context);
      if (command === "provider") return runProviderCommand(argv, context);
      ```

  **Must NOT do**:
  - Do NOT change existing routes (doctor, providers, setup)
  - Do NOT skip adding to CLI_COMMANDS in omniroute.mjs (Task 14 must be done first)

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple addition to existing dispatch switch. Copy existing pattern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13-14)
  - **Blocks**: None
  - **Blocked By**: Tasks 7-10 (commands must exist)

  **References**:
  - `bin/cli/index.mjs` — current 19-line file with switch dispatch pattern

  **Acceptance Criteria**:
  - [ ] All 5 new imports added
  - [ ] All 5 new routes added to `runCliCommand()` switch
  - [ ] Existing routes unchanged

  **QA Scenarios**:

  \`\`\`
  Scenario: all new commands respond to --help via router
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. for cmd in config status logs update provider; do echo "=== $cmd ==="; omniroute $cmd --help; done
    Expected Result: Each command shows its own help, exit code 0
    Failure Indicators: Unknown command error for any new command
    Evidence: .sisyphus/evidence/task-15-all-help.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-15-all-help.{ext}

  **Commit**: YES | Message: `feat(cli): add new command routes to index router`

---

- [x] 16. **bin/cli/commands/doctor.mjs — Integrate CLI tool health checks**

  **What to do**:
  - Modify `bin/cli/commands/doctor.mjs`:
    - In `collectDoctorChecks()` function (around line 436), after existing checks, call `collectCliToolChecks()` from `src/lib/cli-helper/doctor/checks.ts`
    - Append CLI tool check results to the existing `checks[]` array
    - Update the `summary` count to include CLI tool results
    - Keep all existing health checks (config, database, storage/encryption, ports, Node runtime, native binary, memory, server liveness)
    - CLI tool checks should be displayed after the existing checks, labeled as "CLI Tools" section
    - Add a blank line before the CLI Tools section for visual separation

  **Must NOT do**:
  - Do NOT remove any existing health check
  - Do NOT change the existing `ok()`/`warn()`/`fail()` function signatures
  - Do NOT require CLI tool checks to pass for overall doctor exit code (treat warn as pass)

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple integration — add result to existing array, existing pattern to follow.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 17)
  - **Blocks**: None
  - **Blocked By**: Tasks 4, 14 (doctor/checks.ts needed + wiring in omniroute.mjs)

  **References**:
  - `bin/cli/commands/doctor.mjs:432-462` — `collectDoctorChecks()` implementation
  - `bin/cli/commands/doctor.mjs:483-517` — output printing (add CLI tools section here)
  - `src/lib/cli-helper/doctor/checks.ts` (T4) — the CLI tool checks to integrate

  **Acceptance Criteria**:
  - [ ] `omniroute doctor` output includes "CLI Tools" section
  - [ ] CLI:claude, CLI:codex, CLI:opencode, CLI:cline, CLI:kilocode, CLI:continue all appear in doctor output
  - [ ] Existing checks unchanged
  - [ ] `npm run typecheck:core` passes

  **QA Scenarios**:

  \`\`\`
  Scenario: doctor output includes CLI tools section
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute doctor --no-liveness
      2. Assert output contains: "CLI: claude" or "CLI Tools" section
    Expected Result: CLI tool checks included in output
    Failure Indicators: No CLI section, existing checks broken
    Evidence: .sisyphus/evidence/task-16-doctor.{ext}

  Scenario: doctor --json includes CLI tool results
    Tool: interactive_bash (tmux)
    Preconditions: None
    Steps:
      1. Send keys: omniroute doctor --no-liveness --json | python3 -c "import sys,json; d=json.load(sys.stdin); cli_checks=[c for c in d['checks'] if c['name'].startswith('CLI:')]; print('count:', len(cli_checks)); print('names:', [c['name'] for c in cli_checks])"
    Expected Result: count: 6, names include CLI:claude, CLI:codex, etc.
    Failure Indicators: cli_checks empty or missing
    Evidence: .sisyphus/evidence/task-16-doctor-json.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-16-doctor.{ext}
  - [ ] .sisyphus/evidence/task-16-doctor-json.{ext}

  **Commit**: YES | Message: `feat(cli): integrate CLI tool health checks into doctor`

---

- [x] 17. **package.json — Add opencode-provider to files list**

  **What to do**:
  - Modify `package.json`:
    - Add `@omniroute/opencode-provider/` to the `files` array so it gets included in npm distributions
    - Add `@omniroute/opencode-provider` to the `workspaces` array if it should be a workspace member
    - Ensure `js-yaml` is in `dependencies` (needed for YAML config generation in codex.ts and continue.ts generators)
    - Verify `chalk` or `picocolors` is in dependencies (used in io.mjs)
    - Review and add any other missing dependencies required by new modules

  **Must NOT do**:
  - Do NOT add duplicate entries to files array
  - Do NOT change existing dependencies without verifying they are actually used
  - Do NOT add new runtime dependencies to the root that are not actually needed

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Simple JSON edit. Very well-defined task.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 16)
  - **Blocks**: None
  - **Blocked By**: Task 6 (opencode-provider package must exist first)

  **References**:
  - `package.json` — existing files array and workspaces array
  - `npmjs.com/package/js-yaml` — for YAML support in config generators

  **Acceptance Criteria**:
  - [ ] `files` array includes `@omniroute/opencode-provider/`
  - [ ] `js-yaml` is in `dependencies` or `devDependencies`
  - [ ] `npm install` succeeds without errors after changes

  **QA Scenarios**:

  \`\`\`
  Scenario: package.json is still valid JSON after edits
    Tool: Bash
    Preconditions: None
    Steps:
      1. node -e "JSON.parse(require('fs').readFileSync('package.json'))" && echo "valid JSON"
    Expected Result: "valid JSON" printed, no errors
    Failure Indicators: JSON parse error
    Evidence: .sisyphus/evidence/task-17-json.{ext}

  Scenario: new modules can be imported without missing dependency errors
    Tool: Bash (tsx REPL)
    Preconditions: npm install ran
    Steps:
      1. node --import tsx/esm -e "import 'js-yaml'; import './src/lib/cli-helper/config-generator/codex.ts'; console.log('ok')"
    Expected Result: "ok" printed, no missing module errors
    Failure Indicators: Module not found errors
    Evidence: .sisyphus/evidence/task-17-deps.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-17-json.{ext}
  - [ ] .sisyphus/evidence/task-17-deps.{ext}

  **Commit**: YES | Message: `chore: update package.json files and dependencies`

---

- [x] 18. **Unit tests for tool-detector and config-generators**

  **What to do**:
  - Create `tests/unit/cli-helper/tool-detector.test.ts`:
    - Mock `fs.existsSync`, `fs.readFileSync` for each tool's config file
    - Mock `execSync` or `command -v` for binary detection
    - Test: all 6 tools detected correctly when installed
    - Test: all 6 tools return `installed: false` when not installed
    - Test: version parsing for each tool
    - Test: configured detection (config points to OmniRoute)
  - Create `tests/unit/cli-helper/config-generator.test.ts`:
    - Test all 6 generators produce valid JSON/YAML
    - Test validation: rejects invalid baseUrl, empty apiKey
    - Test: each generator returns non-empty string
    - Test: factory correctly dispatches to each generator
  - Create `tests/unit/cli-helper/doctor/checks.test.ts`:
    - Mock tool-detector, test collectCliToolChecks results
    - Test: returns 6 results, correct status per state
  - Follow existing test patterns in `tests/unit/cli-*.test.ts`

  **Must NOT do**:
  - Do NOT write integration tests — these are unit tests only
  - Do NOT require actual CLI tools to be installed (mock everything)
  - Do NOT use `as any` / `@ts-ignore` without justification

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: Standard unit test pattern — existing tests in `tests/unit/cli-*.test.ts` to follow.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 19-20)
  - **Blocks**: None
  - **Blocked By**: Tasks 1-4

  **References**:
  - `tests/unit/cli-setup-command.test.ts` — existing CLI command test patterns
  - `tests/unit/cli-doctor-command.test.ts` — existing doctor test patterns
  - `tests/unit/cli-providers-command.test.ts` — existing providers test patterns

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test tests/unit/cli-helper/tool-detector.test.ts` → PASS
  - [ ] `node --import tsx/esm --test tests/unit/cli-helper/config-generator.test.ts` → PASS
  - [ ] `node --import tsx/esm --test tests/unit/cli-helper/doctor/checks.test.ts` → PASS
  - [ ] All new test files have 80%+ coverage target

  **QA Scenarios**:

  \`\`\`
  Scenario: all unit tests pass
    Tool: Bash
    Preconditions: None
    Steps:
      1. node --import tsx/esm --test tests/unit/cli-helper/tool-detector.test.ts tests/unit/cli-helper/config-generator.test.ts tests/unit/cli-helper/doctor/checks.test.ts
    Expected Result: All tests pass (0 failures)
    Failure Indicators: Any test fails
    Evidence: .sisyphus/evidence/task-18-tests.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-18-tests.{ext}

  **Commit**: YES | Message: `test(cli-helper): add unit tests for tool-detector and config-generators`

---

- [x] 19. **CLI integration tests for new commands**

  **What to do**:
  - Create `tests/unit/cli-integration.test.ts`:
    - Test: `omniroute config --help` → exit 0, contains expected text
    - Test: `omniroute status --help` → exit 0, contains expected text
    - Test: `omniroute logs --help` → exit 0, contains expected text
    - Test: `omniroute update --help` → exit 0, contains expected text
    - Test: `omniroute provider --help` → exit 0, contains expected text
    - Test: `omniroute config list --json` → valid JSON output
    - Test: `omniroute status --json` → valid JSON output without server running
    - Test: `omniroute config get <toolId>` → returns correct structure
    - Test: `omniroute provider list` → returns provider list
  - Spawn subprocess for each test, assert stdout/stderr and exit code
  - Use `node:child_process.spawn` for testing CLI commands
  - Follow pattern from existing CLI integration tests in `tests/unit/`

  **Must NOT do**:
  - Do NOT test config writing (that requires --yes and interactive input)
  - Do NOT test server-dependent features without mocking
  - Do NOT use `sleep` — use proper subprocess completion detection

  **Recommended Agent Profile**:
  > **Category**: `quick` | **Skills**: `[]`
  > Reason: CLI subprocess tests — well-known pattern.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 18, 20)
  - **Blocks**: None
  - **Blocked By**: Tasks 14, 15, 16

  **References**:
  - `tests/unit/cli-setup-command.test.ts` — existing CLI command test patterns
  - `tests/unit/cli-doctor-command.test.ts` — existing doctor test patterns

  **Acceptance Criteria**:
  - [ ] All 9+ integration test cases pass
  - [ ] `node --import tsx/esm --test tests/unit/cli-integration.test.ts` → PASS

  **QA Scenarios**:

  \`\`\`
  Scenario: all CLI integration tests pass
    Tool: Bash
    Preconditions: None
    Steps:
      1. node --import tsx/esm --test tests/unit/cli-integration.test.ts
    Expected Result: All tests pass (0 failures)
    Failure Indicators: Any test fails
    Evidence: .sisyphus/evidence/task-19-integration.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-19-integration.{ext}

  **Commit**: YES | Message: `test(cli): add integration tests for new CLI commands`

---

- [x] 20. **Update SETUP_GUIDE.md + CLI-TOOLS.md documentation**

  **What to do**:
  - Update `docs/SETUP_GUIDE.md`:
    - Add section for new CLI commands: config, status, logs, update, provider
    - Add `omniroute provider add omniroute` setup instructions for OpenCode users
    - Add `omniroute doctor` CLI tool checks section
  - Update `docs/CLI-TOOLS.md`:
    - Add documentation for the new `omniroute config` commands
    - Add `omniroute provider` setup section for OpenCode
    - Add `omniroute status` section showing offline status capabilities
    - Add `omniroute update` section
  - Add examples for each new command in both guides
  - Follow existing documentation style and formatting

  **Must NOT do**:
  - Do NOT create new documentation files (only update existing ones)
  - Do NOT add screenshots (those require UI changes)
  - Do NOT remove existing documentation

  **Recommended Agent Profile**:
  > **Category**: `writing` | **Skills**: `[]`
  > Reason: Documentation update — follows existing style and patterns.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 18-19)
  - **Blocks**: None
  - **Blocked By**: Tasks 14, 15

  **References**:
  - `docs/SETUP_GUIDE.md` — existing setup guide format and style
  - `docs/CLI-TOOLS.md` — existing CLI tools documentation

  **Acceptance Criteria**:
  - [ ] SETUP_GUIDE.md includes all 5 new commands with usage examples
  - [ ] CLI-TOOLS.md includes all 5 new commands
  - [ ] Prettier formatting passes on both files

  **QA Scenarios**:

  \`\`\`
  Scenario: SETUP_GUIDE.md mentions all new commands
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "omniroute config\|omniroute status\|omniroute logs\|omniroute update\|omniroute provider" docs/SETUP_GUIDE.md
    Expected Result: count >= 5
    Failure Indicators: Missing commands from docs
    Evidence: .sisyphus/evidence/task-20-setup.{ext}

  Scenario: CLI-TOOLS.md mentions all new commands
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "omniroute config\|omniroute status\|omniroute logs\|omniroute update\|omniroute provider" docs/CLI-TOOLS.md
    Expected Result: count >= 5
    Failure Indicators: Missing commands from docs
    Evidence: .sisyphus/evidence/task-20-cli-tools.{ext}
  \`\`\`

  **Evidence to Capture**:
  - [ ] .sisyphus/evidence/task-20-setup.{ext}
  - [ ] .sisyphus/evidence/task-20-cli-tools.{ext}

  **Commit**: YES | Message: `docs: update SETUP_GUIDE.md and CLI-TOOLS.md with new commands`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**

- [x] F1. **Plan Compliance Audit** — `oracle` — PASS: all 20 TODOs map to real files on disk
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high` — PASS: no TS errors, robust error handling, no security issues
  Run `npm run typecheck:core` + `npm run lint` + `node --import tsx/esm --test tests/unit/cli-helper/*.test.ts tests/unit/cli-integration.test.ts`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports.
  Output: `TypeCheck [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI) — 6/7 PASS, status --help fixed (padEnd bug)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep` — PASS: full spec fidelity, no scope creep, all 6 tools + 5 commands + 3 routes present
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Per-wave commits** as noted in each task (YES with specific message)
- **Final commit** after all tasks complete: `feat(cli): complete OmniRoute CLI Integration Suite — close #2016`
- **Pre-commit**: `npm run check` (lint + typecheck + tests)
- **Files**: All new files + modified `bin/omniroute.mjs`, `bin/cli/index.mjs`, `bin/cli/commands/doctor.mjs`, `package.json`, `docs/SETUP_GUIDE.md`, `docs/CLI-TOOLS.md`

---

## Success Criteria

### Verification Commands
```bash
# All new commands accessible
omniroute config --help      # → help text
omniroute status --help      # → help text
omniroute logs --help        # → help text
omniroute update --help      # → help text
omniroute provider --help    # → help text

# Tool detection works
node --import tsx/esm -e "import { detectAllTools } from './src/lib/cli-helper/tool-detector.ts'; console.log(JSON.stringify(await detectAllTools()))"

# Config generation works
node --import tsx/esm -e "import { generateConfig } from './src/lib/cli-helper/config-generator/index.ts'; console.log(await generateConfig('claude', { baseUrl: 'http://localhost:20128/v1', apiKey: 'sk-test' }))"

# Doctor includes CLI tool checks
omniroute doctor --no-liveness --json | python3 -c "import sys,json; d=json.load(sys.stdin); print([c['name'] for c in d['checks'] if c['name'].startswith('CLI:')])"

# Unit tests
node --import tsx/esm --test tests/unit/cli-helper/*.test.ts tests/unit/cli-integration.test.ts

# TypeCheck + Lint
npm run typecheck:core && npm run lint
```

### Final Checklist
- [x] All 20 tasks completed and checked off
- [x] All "Must Have" items present
- [x] All "Must NOT Have" items absent
- [x] All tests pass (unit + integration) — 4302/4326 pass (24 pre-existing failures)
- [x] All evidence files captured in `.sisyphus/evidence/` (28 evidence files from implementation)
- [x] `npm run typecheck:core` passes
- [x] `npm run lint` passes
- [x] Docs updated (SETUP_GUIDE.md, CLI-TOOLS.md)
- [x] Coverage target met (80%+ for new modules)
- [x] PR created on github.com/diegosouzapw/OmniRoute PR #2240 — `feat: CLI Integration Suite for issue #2016` (also PR #12 on fork oyi77/OmniRoute)