---
name: google-agents-cli-adk-code
description: >
  This skill should be used when the user wants to "write agent code",
  "build an agent with ADK", "add a tool", "create a callback", "define an agent",
  "use state management", or needs ADK (Agent Development Kit) Python API patterns
  and code examples. Part of the Google ADK skills suite.
  It provides a quick reference for agent types, tool definitions, orchestration
  patterns, callbacks, and state management.
  Do NOT use for creating new projects (use google-agents-cli-scaffold) or deployment
  (use google-agents-cli-deploy).
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# ADK Code Reference

> **Before using this skill**, activate `/google-agents-cli-workflow` first — it contains the required development phases and scaffolding steps.

## Prerequisites

1. Run `agents-cli info` — if it shows project config, skip to the reference below
2. If no project exists: run `agents-cli scaffold create <name>`
3. If user has existing code: run `agents-cli scaffold enhance .`

Do NOT write agent code until a project is scaffolded.

> **Python only for now.** This reference currently covers the Python ADK SDK.
> Support for other languages is coming soon.

## Quick Reference — Most Common Patterns

```python
from google.adk.agents import Agent

def get_weather(city: str) -> dict:
    """Get current weather for a city."""
    return {"city": city, "temp": "22°C", "condition": "sunny"}

root_agent = Agent(
    name="my_agent",
    model="gemini-flash-latest",
    instruction="You are a helpful assistant that ...",
    tools=[get_weather],
)
```

---

## References

The first two are cheatsheets for common patterns; for broad or deep knowledge, go to the source (docs index or installed package).

| Reference | When to read |
|------|-------------|
| `references/adk-python.md` | Core ADK API: `Agent`, tools, callbacks, plugins, state, artifacts, multi-agent systems, `SequentialAgent` / `ParallelAgent` / `LoopAgent`, custom `BaseAgent`, A2A protocol, A2UI. Default for most agents. |
| `references/adk-workflows.md` | Graph-based Workflow API (ADK 2.0): nodes, edges, fan-out/fan-in, HITL, parallel processing. Use when you need explicit graph topology. |
| `curl https://adk.dev/llms.txt` | Docs index (every page title + URL). Fetch it, then `WebFetch` the specific page for anything beyond the cheatsheets. |
| Installed ADK package | Exact signatures and symbols — inspect the source (see "Inspecting ADK Source Code" in `references/adk-python.md`). |

## Related Skills

- `/google-agents-cli-workflow` — Development workflow, coding guidelines, and operational rules
- `/google-agents-cli-scaffold` — Project creation and enhancement with `agents-cli scaffold create` / `scaffold enhance`
- `/google-agents-cli-eval` — Evaluation methodology, dataset schema, and the eval-fix loop
- `/google-agents-cli-deploy` — Deployment targets, CI/CD pipelines, and production workflows
