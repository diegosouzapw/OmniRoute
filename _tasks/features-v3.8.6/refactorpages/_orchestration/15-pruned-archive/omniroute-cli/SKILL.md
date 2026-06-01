---
name: omniroute-cli
description: Entry point for the OmniRoute CLI (omniroute binary) — install, global flags, output formats, environment variables, and index of CLI capability skills. Use when the user wants to control OmniRoute from the terminal, automate workflows, or integrate with CI/CD.
---

# OmniRoute — CLI (Entry Point)

The `omniroute` binary ships with the OmniRoute server. It is both the server launcher and a full management CLI with 250+ commands across 39 groups.

## Install

```bash
npm install -g omniroute          # npm registry
# or: use the binary bundled with the desktop app
```

Requires Node.js ≥20.20.2, ≥22.22.2, or ≥24.

Verify:

```bash
omniroute --version   # prints installed version
omniroute --help      # full command tree
```

## Connection

Every CLI command that talks to the server reads two values:

| Source   | Variable / Flag                      |
| -------- | ------------------------------------ |
| Base URL | `OMNIROUTE_BASE_URL` or `--base-url` |
| API key  | `OMNIROUTE_API_KEY` or `--api-key`   |

Default base URL: `http://localhost:20128`

```bash
export OMNIROUTE_BASE_URL="http://localhost:20128"
export OMNIROUTE_API_KEY="sk-..."          # from Dashboard → API Manager
```

For a remote server:

```bash
export OMNIROUTE_BASE_URL="https://your-server.com"
```

## Global flags

| Flag                | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `--base-url <url>`  | Override server URL for this invocation                  |
| `--api-key <key>`   | Override API key for this invocation                     |
| `--output <format>` | Output format: `table` (default), `json`, `jsonl`, `csv` |
| `--json`            | Shorthand for `--output json`                            |
| `--non-interactive` | Disable prompts — for CI / shell scripts                 |
| `--no-open`         | Don't auto-open the browser on start                     |
| `--port <n>`        | Override default port 20128                              |
| `--help`, `-h`      | Show help for the current command                        |
| `--version`, `-v`   | Print the installed version                              |

## Output formats

All listing commands support `--output`:

```bash
omniroute combo list                      # human-readable table
omniroute combo list --output json        # JSON array
omniroute combo list --output jsonl       # one JSON object per line
omniroute combo list --output csv         # CSV with header row
```

## Quick start: one-shot server + provider setup

```bash
# 1. Start server
omniroute

# 2. (First run) interactive setup wizard
omniroute setup

# 3. Verify everything is healthy
omniroute doctor
```

## CLI capability skills

| Capability                           | Skill                                                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Server admin + backup                | https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli-admin/SKILL.md     |
| Provider & key management            | https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli-providers/SKILL.md |
| Cloud agents (Codex / Devin / Jules) | https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli-cloud/SKILL.md     |
| Evals & benchmarking                 | https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli-eval/SKILL.md      |

## API skills (REST)

For direct HTTP usage instead of the CLI, see the [OmniRoute entry-point skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md).

## Errors

- `Connection refused` → server not running; run `omniroute` or `omniroute serve`
- `401 Unauthorized` → wrong or missing API key
- `command not found: omniroute` → not in PATH; check `npm root -g` or re-install
- `doctor` reports SQLite incompatible → `npm rebuild better-sqlite3` in the app directory
