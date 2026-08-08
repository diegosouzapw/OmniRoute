---
name: serpent-agentic-os
description: Operate SerpentOS as an autonomous Agentic Operating System with modular system prompts, mandatory subbot triad bootstrap, pre-commit duplicate guards, and BigQuery telemetry.
---

# Serpent Agentic OS Workflow & Architecture

Use this skill when managing or extending SerpentOS agentic infrastructure, system instructions, or subbot loops.

## Core Operational Components

### 1. Mandatory Subbot Triad Bootstrap
Before executing coding or orchestration tasks, verify that the default subbot triad is active:
```bash
./scripts/subbot-triad-bootstrap.sh
```
- **Context Cache Loader**: Preloads active context into proactive Gemini cache (`gemini-2.0-flash-lite`).
- **Anti-Hallucination Guard**: Validates agent outputs against code and documentation (`packages/auto-router/src/hallucination_bot.py`).
- **Debugger / Reviewer / Linter**: Pre-commit linting and automated sanity checks.

### 2. Modular System Instructions (`system/parts/`)
When updating system prompts or instructions:
1. Modify specific markdown parts inside `system/parts/` (`00_role.md` to `09_nvidia_alibaba.md`).
2. Generate a versioned system prompt bundle with MD5 hash:
```bash
python3 scripts/generate_system_instructions.py --bump patch
```
3. The generator archives the prompt in `system/versions/`, updates `system/CURRENT_SYSTEM_PROMPT.md`, and logs changes to `system/CHANGELOG.md`.

### 3. Pre-commit Duplicate Guard
To ensure no duplicate scripts or prompts are committed:
```bash
./scripts/pre-commit-hook.sh
```
Installs to `.git/hooks/pre-commit` to check exact MD5 hashes and fuzzy filenames.

### 4. BigQuery Structured Telemetry
Log every agent session action to BigQuery Free Tier using `bq load`:
```bash
./scripts/log-to-bq.sh <agent_id> <model> <latency_ms> <cost_tokens> <task> <status>
```
Example:
```bash
./scripts/log-to-bq.sh ralph-agent gemini-2.5-flash 250 1200 "verify-plan" SUCCESS
```
