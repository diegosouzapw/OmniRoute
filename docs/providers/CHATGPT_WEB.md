---
title: "Providers — ChatGPT Web (Codex)"
version: 3.8.51
lastUpdated: 2026-08-31
---

# Providers — ChatGPT Web (Codex)

`chatgpt-web-codex` (alias `cgpt-codex`) bridges Codex Responses turns through an
authenticated ChatGPT browser session. It is independent from the retired common
`chatgpt-web` provider and uses the MIT-noticed implementation under
`open-sse/vendor/codex-chatgpt-web/`, refreshed through upstream v4.0.7 commit
`b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494`.

## Common provider retirement

The former common provider IDs `chatgpt-web` and `cgpt-web` no longer ship because the
provenance of their pre-key/proof-of-work implementation could not be cleared. Explicit
requests to either ID, including slash-prefixed model IDs and persisted aliases, fail
closed with HTTP `410` and code **PROVIDER_RETIRED** before any upstream request.

Migration `168_retire_chatgpt_web.sql` tombstones matching provider connections and
invalidates their active session leases. It preserves connection history and API-key
allowlists; it does not add replacement access to an allowlist. The Codex provider and
its connections are not matched by this retirement.

## Prerequisites

- a full Cookie header from a signed-in ChatGPT session;
- Chrome or Chromium plus a graphical session or Xvfb display for npm, systemd, and PM2
  installs;
- with the Docker `web` profile, the internal Chromium service from
  `docker-compose.yml`;
- OpenAI `tunnel-client` v0.0.13 and a ChatGPT custom connector for local Codex tools.

The tunnel is only needed for tool turns. Every listed route, including `pro`, can use the
same turn-bound local tool capability when the tunnel and connector are configured.

## Dashboard setup

1. Open the **ChatGPT Web (Codex)** provider and add a connection.
2. Paste the full ChatGPT Cookie header, tunnel ID, runtime key, and custom connector
   name. New tool-capable setups must use a newly created connector named exactly
   `OmniRoute Codex v2`, with Authentication set to None and Permissions set to Allow all
   actions.
3. Run the connection check. OmniRoute opens a browser-backed Temporary Chat and detects
   whether Sol and Pro are available for the account.
4. Save the connection. OmniRoute replaces the pasted cookie with the verified
   Playwright storage state and stores it with the runtime key through the encrypted
   credential abstraction.

The raw cookie is not retained after a successful save. When the session expires, open
the connection, paste a fresh full Cookie header, and rerun the check. The doctor status
in the edit dialog reports browser, storage state, sign-in, Temporary Chat, tunnel,
connector, and tool round-trip separately.

> Never commit a real cookie, runtime key, storage state, or capability token. Test and
> documentation values must always be placeholders.

## Models and combos

The fixed model routes are:

- `chatgpt-web-codex/luna` — GPT-5.6 Luna, low effort
- `chatgpt-web-codex/think` — GPT-5.6 Luna, medium effort
- `chatgpt-web-codex/instant`
- `chatgpt-web-codex/medium`
- `chatgpt-web-codex/high`
- `chatgpt-web-codex/extra-high`
- `chatgpt-web-codex/pro`

Add one of them to a combo like any other model. The Codex app sends the combo name as
`model` to the regular Responses endpoint, `/v1/responses`; there is no separate Codex
endpoint or mode switch.

Free/Go accounts expose the Luna routes. Sol-capable accounts expose Instant through
High, and Pro-capable accounts additionally expose Extra High and Pro. Each route has a
fixed backend model and reasoning effort; a conflicting explicit Responses effort fails
closed instead of silently changing the selected browser mode.

Do not rename or reuse an older `Codex Native` or `OmniRoute Codex` connector. ChatGPT
caches the public MCP contract by connector identity, while the refreshed bridge uses a
new direct turn-token contract. The runtime rejects those legacy identities and requires
a new `OmniRoute Codex v2` connector.

## Security model

- The native path requires a Responses request, a recognized Codex client, and matching
  thread and turn identities.
- Workspace, sandbox, approval policy, and tool catalog come from the native Codex shell;
  free-form prompt text is not authority for them.
- ChatGPT receives only a short-lived capability per turn. The MCP broker accepts only
  tools Codex offered in that exact turn.
- Auto-confirming **Allow once** only returns the tool request to Codex. Codex alone
  decides on approval and execution.
- Before the first output, a combo may fall back to another compatible target. After
  output begins, provider, model, connection, and browser turn remain pinned until the
  turn completes.
- Cookies, runtime keys, storage state, and capability tokens do not appear in provider
  responses or request logs.

## Displayless VPS and Docker

For npm, systemd, and PM2 installs, OmniRoute detects common Chrome and Chromium paths.
Alternatively, set `CHATGPT_WEB_CODEX_CHROME_PATH`. Runtime turns deliberately use headed
Chrome because ChatGPT rejects the true-headless browser shape. A displayless host must therefore
run OmniRoute with a private Xvfb display; setting the Chrome path alone does not provide one.

The Docker `web` profile starts `chatgpt-web-codex-browser` on the internal Compose
network. The sidecar runs headed Chrome inside Xvfb, so no physical display is required. Its CDP
port is not published on the host. The protected browser profile volume is separate from the
OmniRoute data volume, and the browser receives enough shared memory. The internal CDP proxy
listens only on port `9223` inside the Compose network; Chrome remains bound to loopback in the
sidecar.

A supervisor lease under `DATA_DIR` prevents multiple OmniRoute processes from owning
the same tunnel and broker state. A conflict is reported by the doctor.

## Interactive recovery

The automated Docker path has no host-visible window, but Chrome itself is headed inside the
private Xvfb display. When ChatGPT requires an interactive sign-in or challenge, the existing VNC
browser infrastructure can be used for recovery. Browser UI and CDP must remain reachable only
over loopback, an authenticated management connection, or an SSH tunnel; noVNC stays disabled
during normal operation.

## WebSocket fallback

When a combo contains ChatGPT Web (Codex), the Responses WebSocket bridge requests the
HTTP/SSE fallback before connecting upstream. The transfer then goes through
`/v1/responses`.

## Verification

Run the provider controls without invoking the retired provider:

```bash
node --import tsx/esm --test \\
  tests/unit/chatgpt-web-codex.test.ts \\
  tests/unit/chatgpt-web-codex-turn-pin.test.ts \\
  tests/unit/chatgpt-web-environment-double-unescape.test.ts
```

Retirement regression guards live in:

- `tests/unit/chatgpt-web-retirement.test.ts`
- `tests/unit/chatgpt-web-runtime-block.test.ts`
- `tests/unit/chatgpt-web-image-handler-retirement.test.ts`
- `tests/unit/chatgpt-web-source-retirement.test.ts`
- `tests/unit/migration-168-retire-chatgpt-web.test.ts`
