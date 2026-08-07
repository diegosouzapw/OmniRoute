- **feat(plugins):** add onStreamComplete built-in event exposing streaming usage and timing (#9571)

  Adds a new `onStreamComplete` plugin event that fires after an SSE stream is fully
  consumed, carrying usage token counts and timing metrics (latency, TTFT). Built-in
  events now include `onStreamComplete` as a fire-and-forget lifecycle hook.

  Payload: `status`, `usage` (prompt_tokens, completion_tokens, reasoning_tokens,
  cache_read_input_tokens, cache_creation_input_tokens), `timing` (latencyMs, ttft),
  `model`, `provider`, `errorCode`.

  Non-breaking — existing `onResponse` hooks with `{ streamed: true }` remain unchanged.
