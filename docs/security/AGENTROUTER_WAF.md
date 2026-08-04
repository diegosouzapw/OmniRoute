---
title: "agentrouter.org WAF (Web Application Firewall)"
version: 3.8.50
lastUpdated: 2026-08-03
---

# agentrouter.org WAF (Web Application Firewall)

The `agentrouter` upstream gateway runs a keyword-based content filter on
`messages[].content`. The filter is partially deterministic (always blocks
certain phrases) and partially probabilistic (burst-sensitive — becomes
more aggressive after rapid requests, recovers after a cooldown).

When the WAF blocks a request it returns:

```
HTTP/1.1 400 Bad Request
{"error":{"code":"content-blocked","message":"content-blocked (request id: ...)","param":"","type":"agent_router_api_error"}}
```

## Scope of the filter

The WAF inspects `messages[].content` only. It does **not** inspect:

- The `system` prompt
- Structured content blocks (`tool_result`, `tool_use`, `thinking`, `image`)
- Tool `description` and `input_schema` fields
- Request metadata, headers, or model id

## Always-blocked patterns (case-insensitive)

| Pattern                       | Notes                                  |
|-------------------------------|----------------------------------------|
| Any `Lorem ipsum` variant     | Full Latin lorem vocabulary is blocked |
| `language model` (alone)      | "the language model" and "large language model" pass |
| `virtual assistant`           | "AI assistant" passes                   |
| `I'm here to help`            | "here to help" alone also blocks        |
| `Claude, made by Anthropic`   | Full phrase only                        |

## Almost-always-blocked patterns

| Pattern           | Notes                                                   |
|-------------------|---------------------------------------------------------|
| `placeholder`     | When it stands alone (not as a parameter name, etc.)  |
| `dummy data`      | Common seed phrase for fixtures                        |
| `foo bar baz`     | Canonical placeholder phrase                           |
| Repeated short tokens (`AAA BBB CCC`, `test test test`) | Detector for keyword stuffing |

## Behavior under load

After ~5 rapid requests in a short window, the WAF begins blocking content
that would normally pass. The bucket relaxes after ~5–10 seconds of idle
time. This is the same IP-and-key-bound rate limiter that causes
intermittent `400 content-blocked` errors when Claude Code or Codex CLI
makes multiple tool-use / message-send calls in quick succession.

## Mitigations already applied in OmniRoute

1. **`open-sse/services/wafRateLimit.ts`** — burst guard that enforces a
   500 ms minimum gap between outbound requests to any `agentrouter:*`
   URL. The gap is well below human perception of latency and prevents
   the WAF from activating on normal traffic.

2. **`BaseExecutor.WAF_RETRY_CONFIG`** — when an upstream returns
   `400 content-blocked`, the executor retries the same URL with
   exponential backoff (1.5 s, 3.0 s, max 2 attempts). After the backoff
   the WAF usually relaxes and the retry succeeds.

3. **`tests/unit/compression/harness.test.ts`** — the test fixture
   `longInput` was changed from `"lorem ipsum dolor sit amet ".repeat(40)`
   to `"example content for testing purposes ".repeat(40)` so that when
   Claude Code reads this file via the `Read` tool, the file contents
   do not flow back through a `tool_result` block and trip the WAF.

## Guidance for prompts and tool output

If a Claude Code or Codex CLI session repeatedly hits
`400 content-blocked`, check the most recent user message and the most
recent tool result for any of the patterns above and rephrase. Common
workarounds:

- Replace `Lorem ipsum …` with `example text …` or the actual content
  the test or fixture is trying to model.
- Replace `placeholder` (when standing alone) with `example value`,
  `sample value`, or the real value.
- Replace `language model` with `large language model` or `the model`.
- Replace `dummy data` with `sample data` or realistic seed values.
- Replace `I'm here to help` / `here to help` with a more specific
  opener (e.g. "I'll review the file you mentioned").

## Reporting the false positives upstream

The current filter is overly aggressive — it blocks "Lorem ipsum" in
`tool_result` blocks even though the operator clearly did not intend to
inject a prompt. Operators who want this fixed at the source should
contact `agentrouter.org` to report the false positives. The blocklist
above is the empirical result of probing the upstream as of 2026-08-03.
