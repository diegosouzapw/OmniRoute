---
title: "What Is OmniRoute? A Plain-English Overview"
version: 3.8.52
lastUpdated: 2026-10-17
---

# What Is OmniRoute? A Plain-English Overview

> **In one sentence**: OmniRoute is a free, open-source (MIT) **AI gateway** that you run yourself.
> It gives your coding tools **one single endpoint** and routes every request to the AI provider
> that is healthy, available and cheapest, with automatic fallback when a provider fails or
> runs out of quota.

This page explains what the project does and how to use it with **Claude Code**. For the full
feature list, see the root [README.md](../../README.md).

---

## The problem it solves

Developers who use AI coding tools (Claude Code, Codex, Cursor, Cline, Copilot, and others) run
into the same issues:

- Each provider has its own API key, SDK, rate limits and dashboard.
- Quota runs out in the middle of a task and work stops.
- Prices differ a lot between providers and models, and spend is hard to see.
- Many providers offer free tiers, but stacking them by hand is painful.

OmniRoute sits between your tools and the providers and handles all of that in one place.

---

## How it works

```
Your tool (Claude Code, Codex, Cursor, Cline, ...)
        |
        |  one OpenAI-compatible / Anthropic-compatible endpoint
        v
  OmniRoute  (runs on your machine or server, default http://localhost:20128)
   - picks a target using a routing strategy ("combo")
   - falls back automatically if a provider fails or hits a limit
   - can compress prompts to save tokens
   - records usage, cost and latency
        |
        v
Many AI providers (subscriptions, API keys, cheap and free tiers)
```

Your tool only needs a **base URL** and an **OmniRoute API key**. The provider credentials stay
inside OmniRoute.

---

## Main features

| Feature                | What it means                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| One endpoint           | OpenAI-, Claude-, Gemini- and Responses-API compatible routes under one address.                                                      |
| Large provider catalog | The README lists 374 providers, including many with free tiers. Each provider sets its own limits and terms.                          |
| Combos and routing     | A combo is a chain of models. Strategies include priority, round-robin, cost-optimized, fusion and pipeline.                          |
| `auto` model           | Set the model to `auto` (or `auto/coding`, `auto/fast`, `auto/cheap`) and OmniRoute builds a combo from the providers you connected. |
| Automatic fallback     | If quota runs out or a provider fails, the request moves to the next eligible target.                                                 |
| Resilience layers      | Provider circuit breaker, per-connection cooldown and per-model lockout, so one bad key does not stop everything.                     |
| Token compression      | RTK and Caveman compression engines reduce tokens sent to the model.                                                                  |
| MCP and A2A            | Built-in MCP server and an agent-to-agent (JSON-RPC 2.0) server.                                                                      |
| Dashboard              | Providers, API keys, usage, cost, latency, health and routing in one web UI.                                                          |
| Runs anywhere          | npm, Docker, Electron desktop app, PWA, Termux, Fly.io and Nix.                                                                       |

---

## Install and run

```bash
npm install -g omniroute
omniroute
```

OmniRoute starts at `http://localhost:20128` and opens the dashboard. Then:

1. In **Dashboard → Providers**, connect a provider with your own account or API key.
2. In **Dashboard → API Keys**, create an OmniRoute key for your tools.
3. Point your tool at `http://localhost:20128/v1` with that key and the model `auto`.

Test it:

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

Full walkthrough: [QUICK-START.md](./QUICK-START.md).

---

## Use it with Claude Code

Claude Code uses the gateway **root** (do not append `/v1`). Either let OmniRoute write the
config for you:

```bash
omniroute setup-claude
```

or create `~/.claude/settings.json` by hand:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
```

Test it with `claude "say hello"`. You can also launch Claude Code through OmniRoute in one
command, without writing config files: `omniroute run claude --model <provider/model>`.
Details: [CLI-TOOLS.md](../reference/CLI-TOOLS.md).

---

## Agent skills for Claude Code

The [`skills/`](../../skills/README.md) folder contains drop-in `SKILL.md` files (API skills such
as `omni-auth` and `omni-combos-routing`, and CLI skills such as `cli-serve`) that teach an AI
agent how to operate OmniRoute. Entry points: `skills/omni-auth/SKILL.md` for the REST API and
`skills/cli-serve/SKILL.md` for the CLI.

To make them available to Claude Code, copy the skill folders you want into your skills
directory:

```bash
mkdir -p ~/.claude/skills
cp -r skills/omni-auth skills/cli-serve ~/.claude/skills/
```

---

## Things to be aware of

- **Free tiers are third-party.** The "free tokens" figures in the README are estimates across
  separate providers. You bring your own accounts, and each provider controls its limits,
  availability and terms.
- **Check provider terms.** Providers marked `tos: avoid` are excluded from automatic routing by
  default. Read the [Free Tiers Guide](./FREE-TIERS-GUIDE.md) before choosing providers.
- **Protect your keys.** OmniRoute stores provider credentials. Run it locally, or behind
  authentication if you expose it to a network.

---

## About this repository

This repository is a **fork** of [`diegosouzapw/OmniRoute`](https://github.com/diegosouzapw/OmniRoute),
the upstream project and its maintainer. Project documentation, releases and community links live
there and in the root [README.md](../../README.md).
