---
title: "Self-Hosted OpenAI-Compatible Entry"
---

# Self-hosted unified OpenAI-compatible entry

When enabled, OmniRoute's existing `/v1/chat/completions` (and the OpenAI-compatible
contract it serves) becomes a **self-hosted gateway**: one OpenAI-compatible request
in, auto-routed to the provider of your choice through the provider adapters, with a
standard OpenAI error shape out. Client code does not change.

This is the D4 (接入即用) differentiator from the RIC-697 design: the same `/v1` path
the OpenAI SDK already targets, backed by your own providers instead of a single
vendored catalog.

## Enable

Set either env var (see `.env.example` for both):

- `OMNIROUTE_SELF_HOSTED_PROVIDERS` — inline YAML document (runtime-only, not logged).
- `OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE` — path to a YAML file.

```yaml
# providers.yaml
providers:
  - id: local
    kind: openai # openai | anthropic | local
    baseUrl: http://127.0.0.1:11434/v1
    model: llama3
    # apiKey: sk-...       # optional, runtime-only
  - id: claude
    kind: anthropic
    baseUrl: http://127.0.0.1:8080
    model: claude-sonnet
```

When **either** var is set, the unified entry is active for every request to
`/v1/chat/completions`. Config present but unparseable returns `500` (it never
silently falls through to cloud routing). When neither is set, the route behaves
exactly as before.

## Provider auto-route

Precedence (deterministic, no predictive model):

1. `x-omniroute-provider: <id>` header — exact provider id.
2. `model` prefix: `provider/model` (slash) or `provider::model` (double colon).
3. First configured provider.

The routing prefix is stripped before forwarding — upstream receives the bare model
(`claude-sonnet`, not `claude/claude-sonnet`).

```bash
# via header
curl http://localhost:20128/v1/chat/completions \
  -H "x-omniroute-provider: claude" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet","messages":[{"role":"user","content":"hi"}]}'

# or via model prefix
curl ... -d '{"model":"claude/claude-sonnet","messages":[...]}'
```

## Auth scaffold (D5 reserved)

Optional `OMNIROUTE_SELF_HOSTED_API_KEY`. When set, requests must carry
`Authorization: Bearer <key>`. Unset = open route (loopback / trusted network),
mirroring how OmniRoute's existing local providers work. The D5 quota/quota-自治
key system is expected to take over this header.

## Failure contract

- Upstream non-2xx body is normalized through `parseUpstreamError` + `buildErrorBody`
  into the standard OpenAI `error` shape (Hard Rule #12 — never raw upstream text).
- Network-level failures (connection refused / DNS / TLS) return a normalized `502`
  with `error.message: "Upstream provider unreachable: …"`.
- Credential / session headers echoed upstream are stripped from every response.

## Tests

`tests/unit/self-hosted-entry.test.ts` covers provider selection, model-prefix
forwarding, header hygiene, auth, upstream-error normalization, SSE streaming
passthrough, and the fall-through / misconfig paths — all over real HTTP against a
local upstream.

## Notes

- Self-hosted models bypass the cloud-only retirement / alias machinery by design:
  the divert happens before those cloud checks, so ids like `local/llama3` never
  trip cloud-peer 410s or alias rewrites.
- Deterministic routing strategies (fallback / cooldown / cost / latency / blacklist)
  are M2's scope (`RIC-740`) and inject into the gateway layer here. Configure them
  with a `strategy:` block — see [DETERMINISTIC_ROUTING.md](./DETERMINISTIC_ROUTING.md).
