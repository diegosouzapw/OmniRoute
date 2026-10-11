---
title: "Valid Empty Assistant Turns"
---

# Valid empty assistant turns

An assistant turn can finish normally without visible text. OmniRoute preserves
such a turn when the selected execution used a supported native endpoint and the
original upstream response supplied the protocol's normal terminal. An empty
response without that evidence retains the existing empty-content guard.

The execution boundary records this policy internally on the response identity.
Client headers, a provider name, a planned connection, and a terminal synthesized
by translation cannot grant the exception. The context survives response wrappers,
JSON-to-SSE conversion, and non-streaming deduplication. It contains protocol and
terminal flags, not credentials or a URL exposed to clients.

## Supported execution endpoints

| Execution                                        | Endpoint contract                                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| OpenAI Chat                                      | The registered `https://api.openai.com/v1/chat/completions` endpoint                                                |
| Anthropic Messages, including Claude connections | The registered `https://api.anthropic.com/v1/messages` endpoint                                                     |
| Codex Responses                                  | The registered `https://chatgpt.com/backend-api/codex/responses` endpoint                                           |
| OpenRouter Chat                                  | The registered `https://openrouter.ai/api/v1/chat/completions` endpoint                                             |
| Azure OpenAI / Foundry Responses                 | HTTPS resource hosts ending exactly in `.openai.azure.com` or `.services.ai.azure.com`, with `/openai/v1/responses` |
| Azure Foundry Anthropic                          | HTTPS resource hosts ending exactly in `.services.ai.azure.com`, with `/anthropic/v1/messages`                      |

The Azure paths follow Microsoft's [endpoint documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/model-inference/concepts/endpoints?tabs=python),
[Responses REST API](https://learn.microsoft.com/en-us/rest/api/aifoundry/azureopenai/responses),
and [Anthropic SDK guidance](https://learn.microsoft.com/en-us/azure/foundry/how-to/develop/sdk-overview).
Nonstandard Azure ports, URL credentials, lookalike hostname suffixes, and other
custom endpoints do not inherit this policy.

## Terminal and error handling

- OpenAI Chat requires a native `finish_reason: "stop"`.
- Claude requires `end_turn` or `stop_sequence` and a completed message lifecycle.
  A lifecycle that opened a block but produced no useful output remains guarded.
- Responses requires a native completed response. An initial `response.created`
  followed by EOF cannot use the translator's synthetic stop as proof.
- Native errors take priority over normal terminals. Existing quota errors,
  missing-terminal handling, token-limit exemptions, reasoning output, and tool
  output retain their separate classification.

For a valid empty turn, direct requests return the completion, and combos stop
without generating a response from a sibling target. Deduplicated callers share
the policy of the execution they joined. The empty-turn exception does not write
connection cooldown or model lockout state.

A native terminal describes protocol completion; it cannot establish whether the
model intended silence or a backend malfunctioned. Origin checks use the actual
response URL when available and otherwise the effective request URL returned by
the executor. An executor that rebuilds its response before this boundary can
hide the final destination of an HTTP redirect; this is not a redirect attestation
mechanism.

## Regression evidence

[The HTTP regression suite](../../tests/unit/valid-empty-stop-dispatch-16072.test.ts)
uses the real API routes, stored synthetic connections, provider executors,
translation, and combos. It intercepts outbound transport and counts generation
requests. It covers official endpoint shapes, native JSON and SSE, unknown origins,
errors, deduplication, and the optional empty-turn retry. These tests do not contact
real provider accounts or reproduce the reporter's deployment or token totals.

```sh
node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --test --test-force-exit tests/unit/valid-empty-stop-dispatch-16072.test.ts
```

The policy implementation is in
[`emptyTurnPolicy.ts`](../../open-sse/utils/emptyTurnPolicy.ts); combo validation
reads the execution's native terminal after consuming the response.
