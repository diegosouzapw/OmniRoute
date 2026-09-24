---
title: "Getting Started — Web Cookie Providers"
version: 3.8.40
lastUpdated: 2026-07-20
---

# Web Cookie Providers

Web Cookie providers let OmniRoute use an AI service through your existing browser session instead of an API key. They are useful when you already have access to a service through its website and want OmniRoute to use the same authenticated session.

Unlike API-key providers, Web Cookie providers authenticate using the credentials that your browser sends to the website.

---

# Before You Begin

> **Important:** Always copy credentials from a **live network request**, **not** from your browser's cookie storage.

Many authentication issues are caused by copying cookies from the wrong place.

## Do NOT copy from Cookie Storage

Most browsers expose stored cookies through:

```
DevTools
→ Application (or Storage)
→ Cookies
```

Although these cookies look correct, they may be:

- stale
- incomplete
- missing cookies only sent on authenticated requests

Using these values may cause authentication failures even if they appear valid.

## Copy from a Live Request

Instead, use the cookies from a successful request:

```
DevTools
→ Network
→ Refresh the page
→ Open a chat or conversation request
→ Request Headers
→ Cookie
```

The `Cookie` request header contains the exact authentication information that your browser successfully used.

For most Web Cookie providers, this is the value that should be pasted into OmniRoute.

---

# General Setup

The setup process is the same for most Web Cookie providers.

1. Sign in to the provider's website.
2. Open the browser's Developer Tools.
3. Open the **Network** tab.
4. Refresh the page.
5. Open an authenticated chat or conversation request.
6. Copy the required authentication credentials.
7. Open OmniRoute.
8. Go to **Providers → Add Provider**.
9. Select your Web Cookie provider.
10. Paste the credentials.
11. Click **Test Connection**.
12. Save the provider.

The exact credentials required depend on the provider.

---

# Provider Credential Formats

Different websites store authentication differently. Some require only cookies, while others may require additional headers or tokens.

| Provider                        | Credential Format             | Provider Guide                   |
| ------------------------------- | ----------------------------- | -------------------------------- |
| Claude Web                      | Full Cookie request header    | `docs/providers/CLAUDE_WEB.md`   |
| ChatGPT Web (Codex)             | Full Cookie header            | `docs/providers/CHATGPT_WEB.md`  |
| Gemini Web                      | _(verify)_                    |                                  |
| Copilot Web                     | _(verify)_                    | `docs/providers/COPILOT-M365.md` |
| Microsoft 365 Copilot (BizChat) | WS access_token + chathubPath | `docs/providers/COPILOT-M365.md` |
| Grok Web                        | _(verify)_                    |                                  |
| ...                             | ...                           | ...                              |

> Update this table as new Web Cookie providers are added or existing providers change their authentication requirements.

## NoTrack (notrack-web)

NoTrack ([notrack.ai](https://notrack.ai)) is a free consumer chat platform with no signup required — the session is created anonymously on first visit and persists via three cookies: `uid`, `si_usr_id`, and `si_ses_id`. OmniRoute proxies the same `/api/dispatch` endpoint through a single model id (`notrack-c`, alias `ntw`).

### Steps to connect

1. Open [notrack.ai](https://notrack.ai) in your browser and let the anonymous session cookie be set.
2. Open **DevTools → Network**, refresh the page, and click any `/api` request.
3. In **Request Headers**, copy the full `Cookie` header value.
4. In OmniRoute, go to **Providers → Add Provider → NoTrack Web (Free)**.
5. Paste the cookie string into the `apiKey` field and **Save**.

OmniRoute extracts `uid`, `si_usr_id`, and `si_ses_id` from the pasted string and rebuilds a clean `Cookie` header with only those pairs — plus `nt_session` (the `ntk_…` token set for logged-in accounts) when present. If any of the three is missing, the raw pasted string is forwarded unchanged so operators can experiment with alternative shapes.

### Model ids

| Model id    | Display name | Notes                                               |
| ----------- | ------------ | --------------------------------------------------- |
| `notrack-c` | NoTrack C    | Default — the upstream dispatch model `C`.          |
| `C`         | NoTrack C    | Alias for `notrack-c` (raw upstream dispatch code). |
| `notrack`   | NoTrack C    | Alias for `notrack-c`.                              |
| `ntw`       | NoTrack C    | Short alias for `notrack-c`.                        |

All four model ids map to the same upstream dispatch model (`C`).

### Request options

The executor accepts these optional fields on the request body:

| Body field            | Default | Purpose                                                           |
| --------------------- | ------- | ----------------------------------------------------------------- |
| `notrack_mode`        | `usual` | Dispatch mode (free-form string; the upstream accepts `usual`, …) |
| `notrack_max_turns`   | `6`     | Number of internal turns the upstream may take before answering.  |
| `notrack_chat_id`     | `null`  | Resume an existing upstream chat (omit for a fresh chat).         |
| `notrack_attachments` | `[]`    | Pass-through array of upstream attachment descriptors.            |
| `notrack_regenerate`  | `false` | Set `true` to request a regenerated answer for the previous turn. |

### Capabilities

- **Streaming and non-streaming** chat completions.
- **Tool calling** — set `tools: [...]` on the request; the executor serialises them into a tool-call envelope contract and parses the model's responses back into OpenAI `tool_calls`.
- **`response_format`** — `json_object` and `json_schema` are supported. The executor extracts the first JSON object from the model's reply and stringifies it before returning.
- **Reasoning hint** — the executor emits a `reasoning` delta when the upstream sends a `thinking` event.

### Limitations

- The upstream enforces anonymous usage quotas — when tripped, the executor surfaces a 429 with a friendly message.
- All model ids resolve to the same upstream dispatch model; there is no per-model switch.
- The executor does not call the upstream's `/api/chats` endpoint, so chat history / sessions are not auto-managed. Use `notrack_chat_id` to resume an existing upstream chat.

---

# What Web Cookie Providers Can and Cannot Do

Web Cookie providers reuse a website's chat interface. They do **not** provide the same capabilities as official APIs.

## Supported

- Authenticate using your existing browser session
- Access models available through your account
- Stream chat responses
- No API key required

## Not Supported

- Function calling
- Tool calling
- Automatic file editing
- Agentic IDE workflows
- API-only features

This is expected behaviour and is **not** a bug.

If you need tool execution, automatic file editing, or other agent workflows, use an **API-key provider** instead of a Web Cookie provider.

---

# Validation Caveat

A successful **Test Connection** or cookie validation only verifies that the supplied credentials appear to be in the expected format.

Until Issue #7857 is resolved, a successful validation **does not guarantee** that the provider will authenticate successfully.

If authentication still fails, verify that you copied the credentials from a live network request rather than browser cookie storage.

---

# Troubleshooting

## Authentication Fails

Verify that the credentials were copied from:

```
Network
→ Request Headers
→ Cookie
```

and **not** from:

```
Application
→ Cookies
```

---

## Cookie Works in Browser but Not in OmniRoute

Some providers include cookies that are only sent during authenticated requests.

Recopy the credentials from a fresh network request after successfully opening a conversation.

---

## Session Expired

Web Cookie providers use your existing browser session.

If your browser session expires or you sign out, you must copy a new set of credentials.

---

## Test Connection Passes but Requests Fail

Until Issue #7857 is resolved, passing validation does not guarantee that the authentication request will succeed.

Recopy your credentials from a fresh authenticated request before troubleshooting further.

---

# Provider Example

For a complete provider-specific walkthrough, see:

- **Claude Web** — `docs/providers/CLAUDE_WEB.md`

The Claude Web guide demonstrates the complete setup process for a Web Cookie provider and serves as the reference implementation.

---

# Best Practices

- Copy credentials from a fresh authenticated request.
- Avoid reusing old cookies.
- Keep your browser session active while using Web Cookie providers.
- Treat copied cookies as sensitive credentials.
- Use API-key providers when you need function calling or agent workflows.
