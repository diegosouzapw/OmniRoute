# Command Flag Reference

## `agents-cli scaffold create` Flags

| Flag                             | Short  | Default         | Description                                                                                                                                           |
| -------------------------------- | ------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--agent`                        | `-a`   | `adk`           | Agent template — local name (e.g. `adk`), local path (`local@/path`), adk-samples shortcut (`adk@data-science`), or remote Git URL                    |
| `--deployment-target`            | `-d`   | `agent_runtime` | Deployment target (`agent_runtime`, `cloud_run`, `gke`, `none`)                                                                                       |
| `--region`                       |        | `us-east1`      | GCP region                                                                                                                                            |
| `--prototype`                    | `-p`   | off             | Skip CI/CD and Terraform (recommended for first pass)                                                                                                 |
| `--datastore`                    | `-ds`  | —               | RAG datastore type (`agent_platform_search`, `agent_platform_vector_search`). Use with `--agent agentic_rag`.                                         |
| `--session-type`                 |        | —               | Session storage (`in_memory`, `cloud_sql`, `agent_platform_sessions`). Use with `cloud_run` or `gke` targets (Agent Runtime manages sessions itself). |
| `--cicd-runner`                  |        | —               | CI/CD runner (`github_actions`, `google_cloud_build`, `skip`)                                                                                         |
| `--agent-directory`              | `-dir` | `app/`          | Custom agent code directory inside the project                                                                                                        |
| `--agent-guidance-filename`      |        | `GEMINI.md`     | Coding agent guidance file (`GEMINI.md`, `CLAUDE.md`, or `AGENTS.md`)                                                                                 |
| `--output-dir`                   | `-o`   | `.`             | Output directory for the project                                                                                                                      |
| `--bq-analytics`                 |        | off             | Enable BigQuery Agent Analytics plugin (supported on `agent_runtime`, `cloud_run`, and `gke`)                                                         |
| `--google-api-key` / `--api-key` | `-k`   | —               | Use Google AI Studio API key instead of Agent Platform                                                                                                |
| `--skip-checks`                  | `-s`   | off             | Skip verification checks for GCP and Agent Platform                                                                                                   |
| `--adk`                          |        | off             | Quickstart mode: adk + agent_runtime + prototype, skips prompts                                                                                       |
| `--auto-approve` / `--yes`       | `-y`   | off             | Non-interactive: skip prompts, use defaults for missing params                                                                                        |
| `--interactive`                  | `-i`   | off             | Interactive mode: show menus and prompts (for use in terminals)                                                                                       |

For all available flags, run `agents-cli scaffold create --help`.

## `agents-cli scaffold enhance` Flags

| Flag                             | Short  | Default     | Description                                                                  |
| -------------------------------- | ------ | ----------- | ---------------------------------------------------------------------------- |
| `--deployment-target`            | `-d`   | —           | Add deployment target (`agent_runtime`, `cloud_run`, `gke`, `none`)          |
| `--cicd-runner`                  |        | —           | Add CI/CD runner (`github_actions`, `google_cloud_build`, `skip`)            |
| `--agent-directory`              | `-dir` | `app/`      | Agent code directory. Pass if not using the default.                         |
| `--datastore`                    | `-ds`  | —           | RAG datastore type (`agent_platform_search`, `agent_platform_vector_search`) |
| `--session-type`                 |        | —           | Session storage (`in_memory`, `cloud_sql`, `agent_platform_sessions`)        |
| `--region`                       |        | `us-east1`  | GCP region                                                                   |
| `--dry-run`                      |        | off         | Preview changes without applying them (requires saved metadata)              |
| `--force`                        |        | off         | Force overwrite all files (skip smart-merge comparison)                      |
| `--prefer-new`                   |        | off         | Resolve conflicts in favor of the new template version                       |
| `--agent-guidance-filename`      |        | `GEMINI.md` | Coding agent guidance file (e.g. `CLAUDE.md` for Claude Code)                |
| `--bq-analytics`                 |        | off         | Add BigQuery Agent Analytics plugin                                          |
| `--google-api-key` / `--api-key` | `-k`   | —           | Use Google AI Studio API key instead of Agent Platform                       |
| `--skip-checks`                  | `-s`   | off         | Skip verification checks for GCP and Agent Platform                          |
| `--prototype`                    | `-p`   | off         | Prototype mode (skips CI/CD runner prompt)                                   |
| `--auto-approve` / `--yes`       | `-y`   | off         | Non-interactive: skip prompts, use defaults for missing params               |
| `--interactive`                  | `-i`   | off         | Interactive mode: show menus and prompts (for use in terminals)              |

For all available flags, run `agents-cli scaffold enhance --help`.
