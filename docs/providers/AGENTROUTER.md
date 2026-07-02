# AgentRouter Setup Guide

[AgentRouter](https://agentrouter.org) is an Anthropic-compatible relay that resells
Claude and other models, often at lower prices than the direct Anthropic API. It is
designed as a drop-in `ANTHROPIC_BASE_URL` replacement for the official Claude Code
client, so it only accepts traffic that matches the Claude Code wire image (specific
User-Agent, `anthropic-beta` flags, Stainless SDK headers, etc.).

## Quick start — use the native `agentrouter` provider (recommended)

For most users, **no special setup is required**. OmniRoute ships a built-in
`agentrouter` provider with the full Claude Code wire image already baked in (see
`open-sse/config/providerRegistry.ts` → `agentrouter`). To use it:

1. Open **Dashboard → Providers → Add Provider**.
2. Select **AgentRouter** from the list.
3. Paste your `sk-...` API key and save.

That's it — no environment variables, no custom provider type. Built-in models
include `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, and
`deepseek-v3.2`.

The rest of this guide covers the **advanced path**: using the
`anthropic-compatible-cc-*` provider type. Use that when you need more control
over the wire image — for example, when connecting to other AgentRouter-style
relays that are not yet in the native provider registry, or when overriding the
base URL, chat path, or header set.

---

## Advanced: connecting via the Claude Code compatible provider type

OmniRoute also supports AgentRouter (and similar relays) through the **Claude Code
compatible** provider type (`anthropic-compatible-cc-*`), which speaks the
Anthropic Messages API with the correct wire image. A generic
`openai-compatible-chat` provider pointing at `https://agentrouter.org` will
**not** work — the upstream WAF rejects requests that do not look like Claude
Code.

---

## Prerequisites

- An AgentRouter account and API key. New signups get free credits via the affiliate
  link in the project [README](../README.md).
- OmniRoute running with the `ENABLE_CC_COMPATIBLE_PROVIDER` feature flag enabled
  (see below).

## 1. Enable the CC-compatible provider type

The Claude Code compatible provider type is gated behind a feature flag because it
sends traffic that closely mirrors the official Claude Code client. Enable it by
setting an environment variable before starting OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker example:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

After restarting, the dashboard exposes an **Add Claude Code Compatible** option in
addition to the existing OpenAI-compatible and Anthropic-compatible flows.

## 2. Create the provider in the dashboard

1. Open **Dashboard → Providers → Add Provider**.
2. Choose **Add Claude Code Compatible** (only visible when the flag above is set).
3. Fill in the fields:

| Field     | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Name      | `AgentRouter` (or any label)                                   |
| Prefix    | `agentrouter` (friendly alias shown in logs and the dashboard) |
| Base URL  | `https://agentrouter.org`                                      |
| Chat path | `/v1/messages?beta=true` (default — leave as-is)               |

> The canonical model identifier still uses the full provider node ID
> (`anthropic-compatible-cc-{uuid}/{model}`). The **Prefix** is just a display
> alias resolved by `src/lib/usage/callLogs.ts` for friendlier log output.

4. (Optional) Paste your API key in the **Validate** field and click **Check** to
   confirm connectivity before saving.
5. Click **Add**.

Once created, open the provider and add a **Connection** with your AgentRouter API
key (`sk-...`). The connection's `test_status` should turn `active`.

## 3. Use it through a combo or directly

Reference the model using your provider's prefix as the namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

The canonical model ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` also works
and is what shows up in the database and combo configuration.

Or add it to a combo for routing, fallback, and quota management like any other
provider.

---

## Wire image details

For reference, the cc-compatible bridge sends the following on each upstream
request (see `open-sse/services/claudeCodeCompatible.ts`):

| Header                                      | Value                                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                  |
| `User-Agent`                                | `claude-cli/2.1.158 (external, sdk-cli)`                                                            |
| `anthropic-version`                         | `2023-06-01`                                                                                        |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                            |
| Per-connection redact-thinking beta toggle  | Adds `redact-thinking-2026-02-12` for upstreams that specifically require redacted thinking streams |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                              |
| `x-app`                                     | `cli`                                                                                               |
| `X-Stainless-*`                             | Various Stainless SDK headers (lang, package version, OS, arch, etc.)                               |

This is what allows requests to pass the upstream WAF / client whitelist.

---

## Troubleshooting

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Your request did
not match the Claude Code wire image. This happens when the provider is configured
as `openai-compatible-chat` instead of `anthropic-compatible-cc`, or when the
`ENABLE_CC_COMPATIBLE_PROVIDER=true` flag was not set at startup.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Invalid token". The wire image is correct but the API key is rejected. Generate a
new key in the AgentRouter dashboard and update the connection.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter's moderation hook rejected the request content, or the
key's plan does not permit the requested model. Try a different prompt or model;
contact AgentRouter support if a benign prompt is consistently blocked.

**`[400]: content-blocked` only on specific models** — Most AgentRouter plans only
allow a subset of models (e.g. `claude-opus-4-6`). Other model IDs return
`unauthorized_client_error` even though the key is valid. Check which models your
plan covers in the AgentRouter dashboard.

**`Invalid JSON response from provider (reset after Ns)` from the omniroute logs** —
The upstream returned a non-JSON body (typically an HTML error page from the WAF).
This usually means the request never reached the AgentRouter backend — recheck that
the provider ID starts with `anthropic-compatible-cc-` (note the trailing dash —
see `CLAUDE_CODE_COMPATIBLE_PREFIX` in `open-sse/services/claudeCodeCompatible.ts`)
and the feature flag is enabled.

---

## See also

- [`docs/PROVIDERS.md`](../PROVIDERS.md) — Other provider integration notes
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Free-tier provider
  catalog
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image implementation
