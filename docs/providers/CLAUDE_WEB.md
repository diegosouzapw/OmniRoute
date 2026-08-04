---
title: "Providers — Claude Web"
version: 3.8.49
lastUpdated: 2026-07-14
---

# Providers — Claude Web

## `claude-web`

`claude-web` sends OpenAI-format chat requests through an authenticated `claude.ai`
browser session. The executor normalizes the supplied cookie, resolves one authenticated
organization, prepares conversation state, selects a direct or browser transport, and
strictly translates the upstream SSE response. The orchestration is in
`open-sse/executors/claude-web.ts:320`.

> **New to Web Cookie providers?**
>
> Read **`docs/getting-started/WEB-COOKIE-GUIDE.md`** for the general setup process, authentication guidance, limitations, and troubleshooting before following this provider-specific guide.

### Model catalog

The provider registry currently exposes exactly these seven static model IDs
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model ID                    | Display name            |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamic model discovery is not implemented for this provider. The list above is the
runtime catalog.

### Credentials and organization resolution

Supply either the full `claude.ai` Cookie header or a bare session value. Bare values are
normalized to `sessionKey`; other cookies are preserved if supplied. The executor accepts the
cookie through `cookie` or `apiKey` and
reads optional `deviceId` and `orgId` values from the connection data
(`open-sse/executors/claude-web.ts:72`).

If `orgId` is absent, the executor calls `GET https://claude.ai/api/organizations` and uses the first
organization returned by the authenticated Claude Web session
(`open-sse/executors/claude-web.ts:141`). It fails closed when no valid organization is
returned, reports rejected session authorization as 401, and distinguishes a Cloudflare
challenge from an authentication failure.

### Conversation operations

The optional top-level `claude_web` object is strict. Unknown fields are rejected. Its
accepted fields are defined in `open-sse/executors/claude-web/session.ts:50`:

| Field                 | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| `operation`           | `completion` by default; use `retry` for a retry turn     |
| `conversation_id`     | Explicit UUID for an existing conversation                |
| `parent_message_uuid` | Explicit UUID for the parent assistant message            |
| `timezone`            | Valid IANA time-zone name                                 |
| `locale`              | Structurally valid locale                                 |
| `tool_states`         | Optional account tool-state array, limited to 128 entries |

Prepared requests use one of two upstream endpoints
(`open-sse/executors/claude-web.ts:203`):

- A new or follow-up turn posts to
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- A retry posts to
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

A new turn includes `create_conversation_params`. A cached or explicitly linked follow-up
includes `parent_message_uuid` and omits `create_conversation_params`. Retry requires both
conversation and parent-message state and sends no prompt
(`open-sse/executors/claude-web/session.ts:254`). New conversations open the authenticated
UI at `/new`; cached or explicitly linked follow-ups open the exact conversation page
(`open-sse/executors/claude-web/session.ts:324`).

Conversation state is an in-memory cache keyed by a SHA-256 account scope and the canonical
caller transcript. Entries expire after 30 minutes and the cache is capped at 5,000 entries
(`open-sse/executors/claude-web/session.ts:12`). State is committed only after the strict
stream parser observes `message_stop`; process restarts discard it. On a cache miss, a
multi-message request is serialized into one recovery prompt instead of silently dropping
earlier messages.

Locale and time zone use this precedence: request `claude_web` value, connection value,
runtime value, then `en-US` for locale or `UTC` for time zone
(`open-sse/executors/claude-web/session.ts:218`).

### Tools and request payloads

Direct requests transform only structurally valid OpenAI function tools supplied by the
caller. There is no fabricated static default tool list
(`open-sse/executors/claude-web/payload.ts:102`).

Browser requests instead capture the authenticated UI request and retain its account tools,
tool states, and personalized styles. Prepared conversation, model, reasoning, prompt, and
message UUID fields still override the captured request
(`open-sse/executors/claude-web/browserTransport.ts:175`). Browser templates are scoped by a
hash of account, organization, cookie, locale, and time zone and expire after 30 minutes
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). When a direct request has no caller
tools, it can reuse that scoped template; explicit caller tools take precedence
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transport selection

The default path is `sendClaudeWebDirect()`, which calls `tlsFetchClaude()` with the configured
Chrome 146 profile and the supplied cookie (`open-sse/services/claudeTlsClient.ts:23`). It does
not launch a solver or manufacture a replacement cookie.

Set `WEB_COOKIE_USE_BROWSER` to `1`, `true`, or `on` to make the account-scoped browser
adapter the primary transport. Set `OMNIROUTE_BROWSER_POOL` to one of the same values to
allow a recognized Cloudflare 403 challenge to fall back from direct transport to the
browser adapter (`open-sse/executors/claude-web.ts:195`). Other HTTP failures do not trigger
that fallback.

The browser adapter keeps cookies inside the same pooled Playwright context, uses the scoped
hashed key described above, and sends the completion from that context
(`open-sse/executors/claude-web/browserTransport.ts:444`). It never exports a browser-solved
cookie into the direct TLS client. Browser retries require a non-expired UI template bound to
the same actual Playwright context (`open-sse/executors/claude-web/browserTransport.ts:467`).
Browser response reads run incrementally in the authenticated page, honor request cancellation,
and cancel the upstream body as soon as it exceeds 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

The executor returns a redacted audit projection to the shared request logger: organization,
conversation and message UUIDs, prompt text, tool definitions, cookies, and device identifiers
are excluded (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transport exceptions also return a generic connection
error rather than the thrown message.

### SSE behavior

`createClaudeWebResponse()` handles LF or CRLF framing and multiline `data:` fields. It maps
text deltas to `content`, thinking deltas to `reasoning_content`, and known metadata events
to the `claude_web` response extension. Each metadata event is projected through its own field
allowlist (`open-sse/executors/claude-web/stream.ts:37`). The
conversation, parent-message, assistant-message, and operation metadata are also returned in
`X-OmniRoute-Claude-Web-*` headers (`open-sse/executors/claude-web/stream.ts:364`).

The parser fails closed on malformed JSON, upstream `error` events, unknown event types,
invalid ordering, content-block mismatches, or EOF before `message_stop`. Streaming output
emits one finish chunk and one `[DONE]`; buffered output uses the same parser. The parser treats
`message_stop` as terminal immediately, cancels trailing upstream data, and propagates
downstream cancellation to the upstream reader (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Unterminated SSE lines and accumulated events
are capped at 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Files

| File                                                     | Purpose                         |
| -------------------------------------------------------- | ------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Static provider model registry  |
| `open-sse/executors/claude-web.ts`                       | Executor orchestration          |
| `open-sse/executors/claude-web/payload.ts`               | Payload and tool transformation |
| `open-sse/executors/claude-web/session.ts`               | Turn state and transcript cache |
| `open-sse/executors/claude-web/transport.ts`             | Direct transport adapter        |
| `open-sse/executors/claude-web/browserTransport.ts`      | Account-scoped browser adapter  |
| `open-sse/executors/claude-web/stream.ts`                | Strict SSE translation          |
| `open-sse/services/claudeTlsClient.ts`                   | Native TLS transport            |
| `open-sse/services/browserPool.ts`                       | Pooled Playwright contexts      |

### Testing

Run the deterministic Claude Web suite without real credentials:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

The Playwright-dependent cases in `tests/unit/claude-web-auto-refresh.test.ts` are explicitly
skipped. This repository does not currently define a credentialed Claude Web live-test
script, so those skipped cases are not runtime proof.

### Setup

1. Start OmniRoute with `npm run dev` or a built installation.
2. Open Dashboard → Providers → Add Provider.
3. Select the Web Cookie category and Claude Web.
4. Paste the full Cookie header copied from an authenticated `claude.ai` request.
