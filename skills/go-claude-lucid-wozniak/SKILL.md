---
name: go-claude-lucid-wozniak
description: Launch or resume the Claude Code session / worktree lucid-wozniak-060296 with minimal MCP loading (only github, gcloud, supabase, supermemory) and zero-idle GCP rules.
---

# Go Claude / Lucid Wozniak (060296) Execution Skill

## Overview
This skill initializes, bootstraps, and launches the `claude` session / workflow `lucid-wozniak-060296` in `huivrotiki/serpentos` while strictly adhering to the **Minimal MCP Policy** and **Zero-Idle GCP architecture**.

## Minimal MCP Policy (.mcp.json)
Before launching Claude Code, verify that `.mcp.json` only contains:
1. `github` (`@modelcontextprotocol/server-github`)
2. `gcloud` (`@anthropic/gcloud-mcp-server`)
3. `supabase` (`@modelcontextprotocol/server-supabase`)
4. `supermemory` (`@supermemory/mcp-server` configured for `alex.barsuk@icloud.com` / container tag `serpentos`)

> [!IMPORTANT]
> **Do not attach unnecessary MCP servers at startup.** Any heavy or specialized MCPs (e.g. DaVinci Resolve MCP, local Chrome DevTools MCP, or heavy database connectors) should only be attached on-demand when the specific task requires them.

## Execution Workflow

### 1. Verify Bootstrap & Subbot Triad
Run the subbot triad bootstrap to ensure context caching, anti-hallucination guard, and pre-commit linting are active:
```bash
./scripts/subbot-triad-bootstrap.sh
```

### 2. Verify Minimal MCP Configuration
Ensure `.mcp.json` is clean:
```bash
cat .mcp.json | grep -E '"github"|"gcloud"|"supabase"|"supermemory"'
```

### 3. Launch / Switch to Lucid Wozniak Workflow
If operating inside a worktree or session named `lucid-wozniak-060296`:
```bash
# Ensure TokenSaver proxy is running on :4000
export ANTHROPIC_BASE_URL=http://localhost:4000
export CLAUDE_CODE_USE_VERTEX=1
export ANTHROPIC_VERTEX_PROJECT_ID=project-f91a723f-af1b-4dd2-ba3

# Start or resume Claude Code session
claude --resume lucid-wozniak-060296 2>/dev/null || claude
```

## Definition of Done
- Only the 4 essential MCP servers (`github`, `gcloud`, `supabase`, `supermemory`) are loaded.
- Subbot Triad bootstrap is executed.
- Zero-Idle rules (`--min-instances=0`) are enforced for all GCP deployments.
