---
issue: 1845
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 17
  labels: ["kilo-triaged", "kilo-duplicate"]
  state: open
  classified_at: 2026-05-01T10:53:06Z
---

# Feature: [Feature] First-class Hermes Agent support — auto-configured tool card with YAML provider integration

> GitHub Issue: #1845 — opened by @apoapostolov on 2026-05-01T10:23:54Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## What

Proper first-class Hermes Agent support in the CLI Tools section — with an auto-configured tool card (like Claude Code, OpenClaw, Codex) instead of the current generic guide-based entry.

## Why

Hermes Agent (https://github.com/NousResearch/hermes-agent) is a terminal-native AI agent framework by Nous Research, same category as Claude Code, Codex, and OpenClaw. It's approaching feature parity with OpenClaw and in some areas (skills system, credential pooling, multi-platform gateway, profile isolation) it's already ahead.

Right now Hermes shows up as a **guided** tool card with a generic JSON snippet:

```json
{
  "provider": {
    "type": "openai",
    "baseURL": "{{baseUrl}}",
    "apiKey": "***",
    "model": "{{model}}"
  }
}
```

This doesn't match Hermes Agent's actual config format at all. Hermes uses YAML (`~/.hermes/config.yaml`), not JSON, and has a much richer provider model with several configuration surfaces that OmniRoute could manage automatically:

### What Hermes Agent actually needs

Hermes has **three distinct model slots** that OmniRoute could populate:

**1. Core model** (the main conversation model):
```yaml
model:
  default: omniroute/claude-sonnet-4-6
  provider: omniroute
  base_url: http://localhost:20128/v1
  api_key: sk-...
```

**2. Delegation model** (for subagents):
```yaml
delegation:
  model: omniroute/claude-sonnet-4-6
  provider: omniroute
  base_url: http://localhost:20128/v1
  api_key: sk-...
```

**3. Auxiliary models** (for vision, compression, web extraction, etc.):
```yaml
auxiliary:
  vision:
    provider: omniroute
    model: omniroute/gemini-3-flash
    base_url: http://localhost:20128/v1
    api_key: sk-...
  compression:
    provider: omniroute
    model: omniroute/kimi-k2.5
    base_url: http://localhost:20128/v1
    api_key: sk-...
```

The current guide entry only covers case #1, and even that with the wrong format. An auto-configured card could handle all three, letting users pick which models OmniRoute serves for each slot.

### Hermes Agent is a real integration target

- **YAML config** at `~/.hermes/config.yaml` (readable/writable, well-structured)
- **Secrets in `.env`** at `~/.hermes/.env` (API keys stored separately, like OpenClaw)
- **Config path** can be discovered via `hermes config path`
- **Runtime detection** works — the existing `cliRuntime.ts` already has a `hermes` entry pointing at `CLI_HERMES_BIN` and `.config/hermes/config.json` (though the path is wrong — it should be `.hermes/config.yaml`)
- **Install detection** via `hermes --version`
- **Provider-agnostic by design** — adding a custom OpenAI-compatible provider is a first-class config operation

### Config path discrepancy

The current `cliRuntime.ts` entry has:
```ts
hermes: {
  paths: { config: ".config/hermes/config.json" }
}
```

The actual config lives at `~/.hermes/config.yaml`. This should be corrected.

## Proposed approach

An auto-configured `HermesToolCard` component, similar to how `OpenClawToolCard` works:

1. **Detect installed Hermes** — run `hermes --version` (already supported by cliRuntime)
2. **Read current config** — parse `~/.hermes/config.yaml` to check if an `omniroute` provider is already configured
3. **Offer three configuration modes:**
   - **Core model** — set `model.default`, `model.provider`, `model.base_url`, `model.api_key` (or the key in `.env`)
   - **Delegation model** — set `delegation.*` fields (for subagent tasks)
   - **Auxiliary models** — per-slot (vision, compression, web_extract) with individual model selection
4. **Write config** — update the YAML file and/or `.env` with the OmniRoute endpoint and API key
5. **Model selection** — show OmniRoute's available models so users pick which models serve each slot
6. **Config status** — show whether Hermes is already pointed at OmniRoute (similar to OpenClaw's `getConfigStatus()`)

The `.env` file would get:
```
OMNIROUTE_API_KEY=sk-...
OMNIROUTE_BASE_URL=http://localhost:20128/v1
```

And `config.yaml` would get the provider reference:
```yaml
providers:
  omniroute:
    type: openai
    base_url: ${OMNIROUTE_BASE_URL}
    api_key: ${OMNIROUTE_API_KEY}
    models:
      - claude-sonnet-4-6
      - gemini-3-flash
      - kimi-k2.5

model:
  default: omniroute/claude-sonnet-4-6
  provider: omniroute

delegation:
  model: omniroute/claude-sonnet-4-6
  provider: omniroute
```

## Additional context

- Hermes Agent docs: https://hermes-agent.nousresearch.com/docs/user-guide/configuration
- Provider config reference: https://hermes-agent.nousresearch.com/docs/integrations/providers
- The existing guide-based card has i18n entries in 30+ languages ("Hermes AI Terminal Assistant") which could be reused
- Hermes Agent users actively use OmniRoute — there are already community guides and a WUPHF integration for it
- Hermes supports credential pooling and multi-provider routing natively, so an OmniRoute provider fits naturally into its architecture


## 💬 Community Discussion

**@kilo-code-bot** (2026-05-01T10:23:59Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/1475.

> **Feature request: add Hermes quick-configuration support to tools** (#1475)

Similarity score: 91%

*This comment was generated by Kilo Auto-Triage.*
---
**@apoapostolov** (2026-05-01T10:28:20Z):
The similarity confusion comes from the fact there is a Hermes, and a Hermes-agent tools, two different cli tools for AI.
---


### Participants

- @apoapostolov
- @kilo-code-bot

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
