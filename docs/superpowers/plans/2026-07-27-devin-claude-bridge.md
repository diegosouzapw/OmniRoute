# Devin Claude Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fail-closed `devin-cli-agentic` provider that serves local Anthropic Messages requests through Devin CLI ACP stdio while preserving Claude Code tool-use semantics.

**Architecture:** Add a separate Claude-format provider and executor instead of changing the existing OpenAI-format `devin-cli` summarizer. Keep parsing, prompt serialization, Anthropic response rendering, and ACP process handling in focused files under `open-sse/executors/devin-agentic/`, then wire them into the existing provider and executor registries.

**Tech Stack:** TypeScript ES modules, Node child process stdio, Anthropic Messages JSON/SSE, JSON-RPC 2.0 ACP, Node test runner.

---

### Task 1: Agentic Bridge Core

**Files:**
- Create: `open-sse/executors/devin-agentic/types.ts`
- Create: `open-sse/executors/devin-agentic/serializer.ts`
- Create: `open-sse/executors/devin-agentic/toolParser.ts`
- Create: `open-sse/executors/devin-agentic/anthropicResponse.ts`
- Test: `tests/unit/executor-devin-cli-agentic-core.test.ts`

- [ ] **Implement and prove serialization, parsing, validation, and Anthropic rendering**

Interfaces:

```ts
export function serializeAnthropicForDevin(body: unknown): DevinPrompt;
export function parseDevinToolRequest(text: string, tools: AnthropicTool[]): ParsedToolRequest | null;
export function buildClaudeTextResponse(args: ClaudeResponseArgs): Record<string, unknown>;
export function buildClaudeToolUseResponse(args: ClaudeToolUseArgs): Record<string, unknown>;
export function buildClaudeSseFrames(message: Record<string, unknown>): string;
```

Invariants:

- Preserve `text`, `tool_use`, `tool_result`, `thinking`, and `redacted_thinking`.
- Reject `image` with a clear error.
- Reject unknown content block types.
- Allow only one tool request per model turn.
- Validate tool arguments against object JSON Schema with `required`, `type`, `properties`, `additionalProperties`, `enum`, `items`, and scalar types.
- Generate deterministic ids from tool name and canonicalized arguments.

Run: `node --import tsx/esm --test tests/unit/executor-devin-cli-agentic-core.test.ts`
Expected: core tests pass after dependencies are installed.

### Task 2: ACP Executor And Provider Wiring

**Files:**
- Create: `open-sse/executors/devin-cli-agentic.ts`
- Modify: `open-sse/executors/index.ts`
- Create: `open-sse/config/providers/registry/devin-cli-agentic/index.ts`
- Modify: `open-sse/config/providers/index.ts`
- Test: `tests/unit/executor-devin-cli-agentic-acp.test.ts`

- [ ] **Implement and prove fail-closed ACP execution**

Behavior:

- `buildUrl()` returns `devin://acp/stdio`.
- `buildHeaders()` returns `{}`.
- `execute()` spawns only `devin acp` by default or the explicit `CLI_DEVIN_AGENTIC_BIN`/`CLI_DEVIN_BIN` override.
- The child environment removes Anthropic and Claude routing credentials before spawn.
- The executor sends `initialize`, `session/new`, and `session/prompt`.
- The executor collects `agent_message_chunk` text and `session/prompt` final result.
- Non-streaming Claude clients receive native Anthropic JSON.
- Streaming Claude clients receive native Anthropic SSE lifecycle frames.
- Spawn failure, ACP error, timeout, and early exit produce non-2xx responses with sanitized messages.

Run: `node --import tsx/esm --test tests/unit/executor-devin-cli-agentic-acp.test.ts`
Expected: ACP mock tests pass after dependencies are installed.

### Task 3: Isolation Scripts And Documentation

**Files:**
- Create: `scripts/devin-bridge/verify-anthropic-isolation`
- Create: `scripts/devin-bridge/test-unit`
- Create: `scripts/devin-bridge/launch`
- Create: `docs/DEVIN_CLAUDE_BRIDGE.md`
- Modify: `.gitignore`

- [ ] **Implement offline guardrails and operator docs**

Behavior:

- `verify-anthropic-isolation` fails if `CLAUDE_CONFIG_DIR` is missing, points outside an isolated path, or if Anthropic routing env vars are present.
- `test-unit` runs the focused unit tests.
- `launch` refuses to start unless `ENABLE_LIVE_DEVIN_TESTS=1` for live Devin or `DEVIN_BRIDGE_OFFLINE=1` for offline mock mode.
- Documentation distinguishes tested offline behavior from live Devin opt-in behavior.

Run: `./scripts/devin-bridge/verify-anthropic-isolation` with explicit isolated env.
Expected: exits 0 with isolated env and non-zero without it.

### Task 4: Verification

**Files:**
- No additional source files.

- [ ] **Run proportional checks and capture real output**

Commands:

```bash
./scripts/devin-bridge/test-unit
npm test
```

Expected in this workspace before installing dependencies: both commands fail with `ERR_MODULE_NOT_FOUND` for `tsx`. Expected after `npm install`: focused tests pass; `npm test` outcome must be reported from real output.

### Task 5: Close Core Security And Protocol Gaps

**Files:**
- Modify: `open-sse/executors/devin-cli-agentic.ts`
- Modify: `open-sse/executors/devin-agentic/*.ts`
- Modify: `tests/unit/executor-devin-cli-agentic-*.test.ts`

- [ ] **Prove environment allowlisting, response-id correlation, strict standalone tool envelopes, unique ids, bounded repair, size limits, cancellation cleanup, sanitized errors, and explicit `devin://acp/stdio` validation**

Run with `HOME`, `DATA_DIR`, and `SQLITE_FILE` under `.sandbox`; expected: all focused tests pass and an outside-path test fails closed.

### Task 6: Build Reproducible Containers And Network Guard

**Files:**
- Create: `docker/devin-bridge/Dockerfile`
- Create: `docker/devin-bridge/compose.yml`
- Create: `docker/devin-bridge/network-guard/*`
- Create: `docker/devin-bridge/mock-devin/*`
- Create: `.env.devin-bridge.example`

- [ ] **Pin Claude Code 2.1.220 and Devin CLI 3000.2.17, create non-root offline/live profiles, separate auth/config volumes, explicit env allowlist, no host credential mounts, and denied-domain telemetry**

Run: `docker compose -f docker/devin-bridge/compose.yml --profile offline config`; expected: no forbidden mounts/env inheritance and only internal runtime networks.

### Task 7: Deliver Isolation And Operator Scripts

**Files:**
- Create/modify: `scripts/devin-bridge/{build,test-unit,test-contract,test-e2e-mock,verify-anthropic-isolation,login-devin,test-live-devin,launch,clean}`

- [ ] **Make every command idempotent, sandbox-scoped, fail-closed, and secret-safe**

Run: `./scripts/devin-bridge/verify-anthropic-isolation`; expected: positive offline proof passes and each deliberately removed guard returns non-zero.

### Task 8: Real Claude Code Offline E2E

**Files:**
- Create: `tests/fixtures/devin-bridge/e2e-workspace/*`
- Create: `tests/e2e/devin-claude-bridge.e2e.*`

- [ ] **Run pinned Claude Code in the offline container through local `/v1/messages` and mock ACP, proving CLAUDE.md, skill, command, hook, Read/Edit/Bash, tests, multi-turn continuation, and no Anthropic traffic**

Run: `./scripts/devin-bridge/test-e2e-mock`; expected: workspace diff and tests prove Claude Code executed tools while mock Devin only requested them.

### Task 9: Regression, Documentation, Live Gate, And Delivery

**Files:**
- Modify: `docs/DEVIN_CLAUDE_BRIDGE.md`
- Create: `docs/DEVIN_CLAUDE_BRIDGE_PROGRESS.md`

- [ ] **Run focused suites, typecheck, lint, build, docs checks, offline E2E, and isolation proof with fresh output; then run live only after official in-container Devin login**

If login is unavailable, record live as not tested and expose exactly `./scripts/devin-bridge/login-devin` followed by `./scripts/devin-bridge/test-live-devin`. Commit each reversible unit; do not merge or publish until all offline critical checks are green.

### Task 10: Close The Authenticated Live Runtime

**Files:**
- Modify: `open-sse/executors/devin-cli-agentic.ts`
- Modify: `docker/devin-bridge/compose.yml`
- Create: `docker/devin-bridge/network-guard/policy.mjs`
- Modify: `docker/devin-bridge/network-guard/proxy.mjs`
- Modify: `scripts/devin-bridge/select-live-model.mjs`
- Modify: `scripts/devin-bridge/common`
- Modify: `scripts/devin-bridge/login-devin`
- Modify: `scripts/devin-bridge/test-live-devin`
- Modify: `scripts/devin-bridge/verify-anthropic-isolation`
- Modify: `tests/unit/executor-devin-cli-agentic-acp.test.ts`
- Create: `tests/unit/devin-bridge-live-runtime.test.ts`

- [ ] **Implement and prove the authenticated network, auth, and catalog boundaries with block-level TDD**

Invariants:

- The ACP child receives proxy variables only when `DEVIN_BRIDGE_PROXY_URL` is exactly
  `http://network-guard:8080`; arbitrary inherited proxy and credential variables stay absent.
- The guard permits suffixes `.devin.ai` and `.cognition.ai`, exact hosts
  `server.codeium.com` and `unleash.codeium.com`, and nothing else.
- Claude services cannot mount `devin-auth`; non-Claude services cannot mount the Claude config.
- A zero exit from `devin auth status` is insufficient when output contains a server-fetch failure.
- `family_uid: swe-1.7-lightning` resolves to catalog id `swe-1-7-lightning`; unknown normalized
  values fail instead of becoming model ids.
- Login uses the official manual-token flow so no container loopback callback is required.

Run:

```bash
./scripts/devin-bridge/test-unit
node --import tsx/esm --test tests/unit/devin-bridge-live-runtime.test.ts
./scripts/devin-bridge/verify-anthropic-isolation --static
```

Expected: focused tests and static isolation pass; deliberate untrusted proxy, host, mount, auth
status, and model fixtures fail closed.

- [ ] **Commit the reversible live-runtime repair**

```bash
git add open-sse/executors/devin-cli-agentic.ts docker/devin-bridge \
  scripts/devin-bridge tests/unit/devin-bridge-live-runtime.test.ts \
  tests/unit/executor-devin-cli-agentic-acp.test.ts
git commit -m "fix: close Devin bridge live runtime gaps"
```

### Task 11: Prove Offline And Live Completion

**Files:**
- Modify: `docker/devin-bridge/run-claude-live-e2e.sh`
- Modify: `docs/DEVIN_CLAUDE_BRIDGE.md`
- Modify: `docs/DEVIN_CLAUDE_BRIDGE_PROGRESS.md`

- [ ] **Run the complete deterministic bridge proof before any paid request**

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
npm run typecheck:core
npm run lint
npm run build
npm run check:docs-all
```

Expected: all bridge-specific checks, typecheck, lint, build, and documentation checks pass with
isolated data paths. Any unrelated full-suite infrastructure hang is recorded separately and is
not converted into a pass.

- [ ] **Run exactly the three authorized live scenarios and the no-fallback failure probe**

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Expected: dynamic discovery selects a returned Devin catalog model; Claude Code reads without
editing, then edits and runs the fixture test, then executes the fixture command. Evidence shows
native tool use by Claude Code, only `devin-cli-agentic` routing, no allowed non-Devin egress,
and an Anthropic-shaped error after the Devin backend is deliberately made unavailable.

- [ ] **Update verified documentation and commit the evidence-backed delivery state**

```bash
git add docker/devin-bridge/run-claude-live-e2e.sh docs/DEVIN_CLAUDE_BRIDGE.md \
  docs/DEVIN_CLAUDE_BRIDGE_PROGRESS.md
git commit -m "docs: record verified Devin bridge live delivery"
```
