# Adaptive Stream Readiness Timeout

## Problem

Long Codex continue sessions can produce very large Responses API payloads (hundreds of messages, 20 tools, and large cached input). OmniRoute currently uses a fixed `STREAM_READINESS_TIMEOUT_MS` default of 30 seconds for the first useful SSE event. That fixed threshold is too short for some large Codex requests, even when the upstream later completes successfully.

Recent local evidence showed:

- Small/medium Codex requests confirm readiness in roughly 0.8-2.5 seconds.
- Large Codex requests can run 60+ seconds and still complete successfully.
- A fixed 30 second readiness timeout can therefore create false failures: `Stream produced no useful content within 30000ms`.

The solution should avoid a blanket manual timeout increase, because that would slow fallback for genuinely dead streams.

## Goals

- Keep small requests fast to fail when the upstream stream is dead.
- Give large/tool-heavy Codex Responses requests more time to produce first useful content.
- Make timeout decisions visible in logs for future debugging.
- Preserve the existing default behavior unless the request shape justifies extra budget.
- Keep a hard upper bound so zombie streams cannot hang indefinitely.

## Non-Goals

- Do not change provider fallback ordering in this spec.
- Do not alter account health/rate-limit policy.
- Do not change post-readiness stream idle behavior.
- Do not implement compression or summarization in this change.

## Design

Add a small policy helper that computes the readiness timeout from request shape:

`open-sse/utils/streamReadinessPolicy.ts`

The helper accepts:

- `baseTimeoutMs`
- `provider`
- `model`
- `body`

It returns:

- `timeoutMs`
- `reasons`

The initial heuristic is intentionally conservative:

- Start with the configured base timeout, usually 30 seconds.
- Add budget for large input arrays or message arrays.
- Add budget for tool-heavy requests.
- Add budget for Codex GPT-5.5 Responses requests, because local evidence shows these can take longer on large sessions.
- Cap the result at 120 seconds by default.

This is adaptive, not purely provider-based: Codex only receives the extra budget when the payload is large/tool-heavy enough to justify it.

## Integration

In `open-sse/handlers/chatCore.ts`, replace the direct use of `STREAM_READINESS_TIMEOUT_MS` in `ensureStreamReadiness` with the policy result.

Log the chosen timeout and reasons when it differs from the base timeout, for example:

```text
[sse] stream readiness timeout=90000ms base=30000ms reason=codex,gpt-5.5,large_input,tool_heavy
```

## Failure Behavior

If no useful stream content appears before the adaptive timeout, OmniRoute should continue using the existing failure path and return `STREAM_READINESS_TIMEOUT`. This change only changes the budget, not the fallback/error semantics.

## Testing

Add unit tests for the policy helper:

- Small request keeps the base timeout.
- Large message array increases timeout.
- Tool-heavy request increases timeout.
- Codex GPT-5.5 large request receives a larger timeout.
- Timeout is capped at the maximum.
- Zero/disabled base timeout remains zero so readiness checks can still be disabled by config.

Add or update a handler-level test only if needed after unit coverage.

## Acceptance Criteria

- Large Codex continue sessions get an adaptive readiness timeout above 30 seconds.
- Small requests still use 30 seconds by default.
- The max adaptive timeout cannot exceed 120 seconds unless explicitly changed in code later.
- Unit tests cover the policy and pass.
- Existing pre-commit checks pass.
