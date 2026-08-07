# Devin Claude Bridge Progress

Updated: 2026-07-28

## Baseline

- Fork version: `3.8.49`.
- Starting branch: `release/v3.8.49`.
- Starting commit: `ed7db3ee5f89a144b2d931d8605534522f83de30`.
- Fixed runtime artifacts: Node `26.0.0`, Claude Code `2.1.220`, Devin CLI `3000.2.17`.
- Existing `devin-cli` remains unchanged; the new path is the separate
  `devin-cli-agentic` provider.

## Implemented architecture

- Claude Code runs only inside the non-root bridge container with its own empty config
  volume and local OmniRoute base URL.
- `devin-cli-agentic` preserves Anthropic messages, tool schemas, `tool_use`, and
  `tool_result`, then calls the official Devin CLI over ACP stdio.
- The executor starts `devin acp --agent-type summarizer`. This is the only fixed official
  ACP role in the pinned CLI that has no Devin-owned tools.
- The request is framed as an execution trace. Devin can return one strict client tool
  envelope; Claude Code executes that tool locally.
- Internal ACP `tool_call` events, unsupported blocks, invalid schemas, narrative actions,
  timeouts, cancellation, and process failure all fail closed.
- Provider and network policy prevent combo/auto/Anthropic fallback.

## Offline proof

- Focused serializer, parser, executor, ACP lifecycle, wire-format, environment, and audit
  tests pass (39/39).
- The contract suite covers Anthropic JSON/SSE, `tool_use`, `tool_result` continuation,
  fragmented ACP frames, stderr, early exit, timeout, cancellation, and fail-closed provider
  loss.
- The production bridge image builds with the pinned CLIs.
- Real Claude Code offline E2E loads `CLAUDE.md`, the project skill and slash command, fires
  hooks, executes local tools over multiple turns, observes a failed test, repairs the file,
  reruns the test, and completes.
- The isolation verifier proves non-root/read-only execution, isolated mounts and config,
  blocked Anthropic/Claude access, no host credential mounts, local-only inference, and no
  fallback.

Evidence is generated under `.sandbox/evidence` and ignored by Git.

## Regression status

- `typecheck:core`, focused ESLint, Prettier, shell/Node syntax, and the complete documentation
  accuracy suite pass.
- The broad `npm run check` is not reported as passed: after its lint phase, the repository
  test runner remained alive while an existing `ioredis` client repeatedly retried an
  unavailable local Redis endpoint after `quota-redis-store.test.ts`. The bridge-focused
  suites, production image build, offline E2E, isolation proof, and live gate do not use that
  Redis service and all pass.

## Live Devin proof

Passed with the official in-container login and discovered model
`swe-1-7-lightning`. The terminal live run completed all three scenarios:

1. Claude Code loaded the fixture instructions, issued client-owned `Read` calls, and
   returned a correct defect analysis.
2. Claude Code issued a real `Edit` changing subtraction to addition, then a client-owned
   `Bash` call running `npm test`; the test reported one pass and zero failures.
3. Claude Code initialization listed `bridge-check` and `bridge-proof`, read the corrected
   source and test, executed another client-owned `npm test`, and completed successfully.

The live evidence validator parses stream JSON and requires successful tool results. It does
not accept a textual claim that a tool ran. It also rejects terminal summaries that report a
blocker, incomplete work, or required next steps.

The final live gate reported:

```text
PASS: validated Claude evidence for LIVE_ANALYSIS_COMPLETE
PASS: validated Claude evidence for LIVE_FIX_COMPLETE
PASS: validated Claude evidence for BRIDGE_E2E_COMPLETE
PASS: three live Devin-backed Claude Code scenarios completed
PASS: live model swe-1-7-lightning was discovered and validated by three scenarios
```

The same gate validated the network audit: only the Devin guard path was used, no internal
Devin tool event was accepted, and the Claude egress audit remained empty.

## Investigation conclusion

The initial default-agent hypothesis failed because ACP permission modes do not turn the
default Devin agent into a raw inference backend. Even `ask` mode can emit Devin-owned
`tool_call` events. A discovered `allowed-tools: []` agent configuration was not consumed by
`devin acp` in CLI `3000.2.17`.

The working adaptation uses the official `summarizer` agent because it is structurally
no-tools. Its fixed summarization behavior can produce intermediate prose, so the bridge
frames requests as execution traces, detects future-action narration, performs at most one
strict repair, and otherwise fails. Live validation also exposed transient ACP timeouts;
the harness now spaces independent scenarios rather than weakening routing or retrying into
another provider.

## Safety record

No host Claude executable, configuration, login, OAuth token, Keychain, or Anthropic API was
used. The dedicated Docker volumes remain role-separated. No credential value is written to
the repository or evidence output.

During the early baseline, a focused test without isolated `DATA_DIR` initialized the
repository's normal OmniRoute database at `/Users/lucasisrael/.omniroute/storage.sqlite`.
It was not rolled back or touched again. Every bridge command now pins database and temporary
paths under the worktree's `.sandbox` directory.

## Remaining limits

- The no-tools backend has a summarizer system role rather than a neutral generation role.
- One client tool call per response is supported; parallel tool calls are rejected.
- ACP processes are per-turn and stateless.
- Live Devin availability can still produce explicit `502`/`504` failures.
- Images and unadvertised vision/effort/large-context capabilities remain unsupported.
