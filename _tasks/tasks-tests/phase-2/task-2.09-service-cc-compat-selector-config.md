# Task 2.09 — Test: Claude Code Compatible + Account Selector + Combo Config

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/services/claudeCodeCompatible.ts`, `open-sse/services/accountSelector.ts`, `open-sse/services/comboConfig.ts`
- **Test files to create**: One per service in `tests/unit/`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read each source file
2. Read: `open-sse/services/provider.ts` (isClaudeCodeCompatible)

## Test Scenarios

### claudeCodeCompatible.ts (~10)
- buildClaudeCodeCompatibleRequest: request body construction; headers; session ID; system prompt injection; model mapping; tools mapping; stream flag; CC-specific fields; cwd/timestamp

### accountSelector.ts (~8)
- Account selection algorithm; priority scoring; health-weighted selection; exclusion list; rate limit awareness; empty accounts handling; single account; concurrent selection

### comboConfig.ts (~7)
- Config validation/parsing; strategy extraction; model list parsing; fallback chain building; invalid config handling; default values; hot reload support

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] Each service reaches ≥ 75% coverage
