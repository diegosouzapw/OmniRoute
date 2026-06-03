---
name: omniroute-cli-cloud
description: Control OmniRoute cloud agents (OpenAI Codex, Devin, Jules) from the CLI — create tasks, track status, approve plans, send messages, and manage sources. Use when the user wants to automate cloud coding agent workflows via the terminal.
---

# OmniRoute — CLI Cloud Agents

Requires the `omniroute` CLI. See [CLI entry-point skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli/SKILL.md) for install + global flags.

## Supported agents

| Agent          | ID      | Auth required  |
| -------------- | ------- | -------------- |
| OpenAI Codex   | `codex` | OpenAI API key |
| Devin          | `devin` | Devin API key  |
| Jules (Google) | `jules` | Google OAuth   |

## Authenticate an agent

```bash
omniroute cloud codex auth             # Set / refresh Codex API key
omniroute cloud devin auth             # Set / refresh Devin API key
omniroute cloud jules auth             # OAuth login for Jules (opens browser)
```

## List all agents

```bash
omniroute cloud agents                 # Show all configured cloud agents + status
omniroute cloud agents --json
```

## Create a task

```bash
omniroute cloud codex task create \
  --title "Add OAuth to the auth module" \
  --prompt "Implement Google OAuth 2.0 login in src/auth/oauth.ts"

omniroute cloud codex task create \
  --title "Fix test failures" \
  --prompt-file ./task-description.md   # Read prompt from a file
```

Same syntax for `devin` and `jules`:

```bash
omniroute cloud devin task create --title "..." --prompt "..."
omniroute cloud jules task create --title "..." --prompt "..."
```

## List tasks

```bash
omniroute cloud codex task list        # All Codex tasks (table)
omniroute cloud codex task list --json # JSON output
```

## Get task details

```bash
omniroute cloud codex task get <taskId>       # Full task record
omniroute cloud codex task status <taskId>    # Status + progress only
```

Task status values: `running`, `completed`, `failed`, `cancelled`.

## Approve a plan

Devin and Jules may pause for plan approval before writing code:

```bash
omniroute cloud devin task approve <taskId>   # Approve the proposed plan
omniroute cloud jules task approve <taskId>
```

## Send a message to a running task

```bash
omniroute cloud codex task message <taskId> "Focus on the backend only, skip the UI"
```

## List task sources (files touched)

```bash
omniroute cloud codex task sources <taskId>   # Files changed / created by the task
```

## Cancel a task

```bash
omniroute cloud codex task cancel <taskId>
omniroute cloud devin task cancel <taskId>
```

## Typical workflow

```bash
# 1. Authenticate
omniroute cloud codex auth

# 2. Create a task
TASK_ID=$(omniroute cloud codex task create \
  --title "Refactor auth module" \
  --prompt "Extract JWT logic to src/auth/jwt.ts" \
  --output json | jq -r '.id')

# 3. Poll status
omniroute cloud codex task status $TASK_ID

# 4. View touched files when complete
omniroute cloud codex task sources $TASK_ID
```

## Errors

- `auth required` → run `omniroute cloud <agent> auth` before any task commands
- `task create` fails with 402 → agent billing limit reached; check your Codex/Devin/Jules account
- `task approve` fails with 404 → task does not have a pending plan; check status first
- `jules auth` browser flow fails → ensure Google account has Jules access; try `omniroute cloud jules auth` again
