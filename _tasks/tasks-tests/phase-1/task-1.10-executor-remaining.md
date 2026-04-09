# Task 1.10 — Test: Remaining Executors

## Metadata
- **Phase**: 1
- **Source files**:
  - `open-sse/executors/github.ts`
  - `open-sse/executors/puter.ts`
  - `open-sse/executors/pollinations.ts`
  - `open-sse/executors/kiro.ts`
  - `open-sse/executors/antigravity.ts`
  - `open-sse/executors/codex.ts`
  - `open-sse/executors/gemini-cli.ts`
  - `open-sse/executors/opencode.ts`
  - `open-sse/executors/cliproxyapi.ts`
- **Test files to create**: One per executor in `tests/unit/`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~60 (6-8 per executor)

## Pre-requisites
1. Read each executor source file
2. Check existing: `tests/unit/qoder-executor.test.mjs`, `tests/unit/opencode-executor.test.mjs`
3. Read `open-sse/executors/index.ts` for executor registry

## Test Scenarios Summary

### Per executor, test these common patterns:
```
For each executor file:
1. buildUrl() — correct API endpoint construction
2. buildHeaders() — auth header (Bearer, x-api-key, custom)
3. transformRequest() — body transformations if any
4. refreshCredentials() — token refresh if applicable
5. Error handling specifics
6-8. Provider-specific quirks (2-3 unique tests per executor)
```

### Provider-specific quirks:

- **github.ts**: Copilot token rotation; specific model catalog; API version header
- **puter.ts**: Puter-specific auth; app-level credentials
- **pollinations.ts**: Free endpoint; no auth required; URL pattern
- **kiro.ts**: AWS Builder ID flow; session management; specific URL pattern
- **antigravity.ts**: Gemini-style auth; session ID; Antigravity API base
- **codex.ts**: Native Codex passthrough; request endpoint path; Codex-specific body format
- **gemini-cli.ts**: Deprecated provider; CLI token management; Google Cloud auth
- **opencode.ts**: OpenCode Zen/Go; specific URL patterns; see existing tests for patterns
- **cliproxyapi.ts**: CLIProxyAPI proxy routing; URL construction; header forwarding

## Testing Approach

Mock `globalThis.fetch` for all executors. Each test file can be small (~6-8 tests) since these executors mostly extend `DefaultExecutor` or `BaseExecutor` with minor overrides.

## Acceptance Criteria
- [ ] Test files for all 9 remaining executors
- [ ] ~60 total assertions pass
- [ ] Combined executor directory coverage reaches ≥ 70%
- [ ] Fix existing qoder-executor failures (5 tests) as part of this task
