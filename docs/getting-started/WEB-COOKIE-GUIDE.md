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

##  Do NOT copy from Cookie Storage

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

##  Copy from a Live Request

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

| Provider | Credential Format | Provider Guide |
|----------|-------------------|----------------|
| Claude Web | Full Cookie request header | `docs/providers/CLAUDE_WEB.md` |
| ChatGPT Web | _(verify)_ | |
| Gemini Web | _(verify)_ | |
| Copilot Web | _(verify)_ | |
| Grok Web | _(verify)_ | |
| ... | ... | ... |

> Update this table as new Web Cookie providers are added or existing providers change their authentication requirements.

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
