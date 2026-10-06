---
title: "VS Code Copilot Chat — OmniCopilot extension"
version: 3.8.50
lastUpdated: 2026-08-18
---

# VS Code Copilot Chat — OmniCopilot extension

**OmniCopilot** puts every model your OmniRoute serves into the _native_ GitHub Copilot Chat
model picker. No second sidebar, no separate chat UI — Copilot's agent mode, tool calling,
MCP servers and custom instructions all keep working, just running on the model you pick.

|                       |                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Install (VS Code)** | [Marketplace → `diegosouzapw.omnicopilot`](https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot)                        |
| **Install (forks)**   | [Open VSX](https://open-vsx.org/extension/diegosouzapw/omnicopilot) — Cursor, Windsurf, VSCodium, Theia, code-server, Gitpod, Antigravity, Kiro |
| **Source / issues**   | [github.com/diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot) (MIT)                                                        |
| **Requires**          | VS Code 1.104+                                                                                                                                  |

> **No Copilot subscription needed.** Since VS Code 1.122 a language-model provider works
> without a GitHub sign-in and without any Copilot plan. Inline completions and
> embeddings-based features stay outside the provider API and still require Copilot.

---

## Setup

1. **Run OmniRoute** — `npm install -g omniroute && omniroute` (dashboard on `http://localhost:20128`).
2. **Install the extension** — search "OmniRoute" in the Extensions view.
3. **Pick a model** — Copilot Chat → model picker → **Manage Models…** → **OmniRoute**, then tick
   what you want.

Nothing to configure when OmniRoute runs on the default port. For a remote instance, open the
**OmniRoute icon in the Activity Bar** (or run `OmniRoute: Manage Connection`) and set:

- **Server URL** — the server root, e.g. `http://192.168.0.15:20128`. The `/v1` suffix is
  appended by the extension; do not include it.
- **API key** — only when the server sets `REQUIRE_API_KEY`. Stored in the OS keychain via VS
  Code SecretStorage, never in `settings.json`.

---

## What the picker will show

The extension does not show the raw `GET /v1/models` payload — it shapes it, and the count you
see is lower than the catalog size for two deliberate reasons.

### It asks for one id per model

`MODELS_CATALOG_PREFIX_MODE` defaults to **`dual`**, which advertises every model twice — once
under the short alias prefix and once under the canonical provider prefix — so older client
configs keep resolving either form:

```
cc/claude-sonnet-4-6        ← alias prefix
claude/claude-sonnet-4-6    ← canonical prefix, same model
```

The extension requests **`GET /v1/models?prefix=alias`** so one id arrives per model, without
changing the server-wide setting for your other clients. On a reference instance this collapsed
**2345 entries to 1396 — 949 duplicates, zero models lost.**

If you would rather fix it server-wide for _every_ client, set the
`MODELS_CATALOG_PREFIX_MODE` feature flag to `alias` in the dashboard. See
[API_REFERENCE → prefix](../reference/API_REFERENCE.md#model-id-prefixes-prefix) for the
query parameter and the per-mode table.

### It hides models that cannot chat

The catalog also lists image, video, audio, rerank, embedding and moderation models. Those are
rejected on a chat request anyway:

```
HTTP 400 — Model '<id>' is an image-generation model and cannot be used on
/v1/chat/completions. Use POST /v1/images/generations instead.
```

so they are filtered out by their `type` field before reaching the picker. **Responses-API
models are kept** — every Codex / GPT-5.x entry advertises `supported_endpoints: ["responses"]`,
and OmniRoute translates those for `/v1/chat/completions`, so they are perfectly usable.

### Providers you never configured

The catalog lists models from providers with an **active connection** _plus_ every **noAuth**
provider — the keyless ones that make up much of the free tier. That is intentional. To hide
them, add them to `blockedProviders` in the dashboard settings; nothing changes in the
extension.

---

## Dashboard inside a VS Code tab

`omnicopilot.dashboardOpen: "editor"` renders the OmniRoute dashboard in an editor tab via the
Simple Browser instead of an external browser. Embedding is **opt-in on the server** through
`DASHBOARD_ALLOW_EMBED=vscode`, which serves the HTML pages with
`frame-ancestors 'self' vscode-webview:` instead of the default `frame-ancestors 'none'` +
`X-Frame-Options: DENY`. The API surface (`/api`, `/v1`, `/v1beta`, `/a2a`, `/healthz`) keeps the
strict headers either way.

> ⚠️ **It is a build-time flag, not a runtime one.** Next.js compiles `headers()` into the route
> manifest, so `next.config.mjs` reads the variable while the bundle is built
> (`next.config.mjs` → `resolveDashboardEmbedMode`, `scripts/build/dashboardEmbed.mjs`).
> Exporting it in front of an already-built server changes nothing — the headers are baked.

```bash
# the variable has to be present on the BUILD command
DASHBOARD_ALLOW_EMBED=vscode npm run build        # or npm run build:release
npm start
```

| How you installed          | Can you enable embedding?                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| From source                | ✅ set the variable on the build command, as above                                                                                      |
| `npm install -g omniroute` | ❌ the published package ships a prebuilt bundle — build from source instead                                                            |
| Docker image               | ✅ `docker build --build-arg DASHBOARD_ALLOW_EMBED=vscode -t omniroute:embed .` — the prebuilt image on Docker Hub is not embed-enabled |

Without an embed-enabled build the page refuses to frame, the extension detects that from the
response headers and falls back to the external browser — nothing breaks, and it says so once.
See [`ENVIRONMENT.md`](../reference/ENVIRONMENT.md) and issue
[#10273](https://github.com/diegosouzapw/OmniRoute/issues/10273).

---

## Configuring your other tools from inside VS Code

**`OmniRoute: Configure Coding CLI`** drives the `omniroute` CLI to write ready-to-use profiles
for Codex CLI, Claude Code, Cline, Continue, Cursor, Aider, OpenCode, Goose, Crush, Qwen Code,
Kilo and Roo — the same configs described in
[`CLI-INTEGRATIONS.md`](CLI-INTEGRATIONS.md). The API key is handed to the CLI through the
`OMNIROUTE_API_KEY` environment variable, never on the command line.

---

## Troubleshooting

| Symptom                                              | Cause / fix                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No OmniRoute models in the picker                    | Server unreachable. The status-bar dot goes grey; run `OmniRoute: Check Connection`. Discovery is silent by design and contributes no models rather than prompting.                                                                                      |
| Every model appears twice                            | You are on an OmniCopilot older than 1.0.1 — update. The extension now requests `?prefix=alias`.                                                                                                                                                         |
| An image/audio model used to be listed and is gone   | Intentional since 1.0.1 — it could never answer a chat request.                                                                                                                                                                                          |
| Panel missing from the Activity Bar                  | VS Code moves extra view containers into the **"…"** overflow at the bottom of the Activity Bar, and a container hidden via right-click stays hidden. Right-click the Activity Bar → tick **OmniRoute**, or open it with `OmniRoute: Manage Connection`. |
| Dashboard opens in the browser despite `editor` mode | The server was not **built** with `DASHBOARD_ALLOW_EMBED=vscode` (see above) — setting it at startup on a prebuilt install does nothing. The fallback is deliberate.                                                                                     |
| Models list is stale after changing providers        | `OmniRoute: Refresh Models`, or the ↻ link in the panel.                                                                                                                                                                                                 |

---

## See also

- [`CLI-INTEGRATIONS.md`](CLI-INTEGRATIONS.md) — every other coding tool
- [`REMOTE-MODE.md`](REMOTE-MODE.md) — driving a remote OmniRoute
- [`../reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) — the `/v1/models` contract
- [`docs/CATALOG.md`](https://github.com/diegosouzapw/OmniCopilot/blob/main/docs/CATALOG.md) — the extension's own catalog notes
