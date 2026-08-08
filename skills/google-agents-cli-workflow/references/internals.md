# Underlying Commands Reference

`agents-cli` wraps lower-level tools. When you need flags or behavior not exposed
by the CLI — for debugging, customization, or edge cases — use these directly.

## Dev & Testing

| `agents-cli` command                            | Underlying command                                                                                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agents-cli playground`                         | `uv run adk web .`                                                                                                                                                   |
| `agents-cli run "prompt"`                       | Starts a local server, queries it, then shuts it down (unless using --start-server)                                                                                  |
| `agents-cli run --url URL --mode MODE "prompt"` | HTTP requests to URL (`/run_sse` for adk, A2A protocol for a2a)                                                                                                      |
| `agents-cli playground --port PORT`             | `uv run adk web . --port PORT`                                                                                                                                       |
| `agents-cli lint`                               | `uv run ruff check .` + `ruff format . --check` + `ty check .` + codespell (skip via `--skip-ty` / `--skip-codespell`)                                               |
| `agents-cli lint --fix`                         | `uv run ruff check . --fix && uv run ruff format .`                                                                                                                  |
| `agents-cli lint --mypy`                        | the default checks plus `uv run mypy .`                                                                                                                              |
| `agents-cli infra single-project`               | `terraform init + apply in deployment/terraform/single-project/`                                                                                                     |
| `agents-cli deploy`                             | Dispatches by target: `gcloud run deploy` (Cloud Run), `terraform` + `docker build` + `kubectl apply` (GKE), `vertexai` Agent Engines SDK in-process (Agent Runtime) |

## Rollback

Use the native rollback tooling for your deployment target — e.g.,
`gcloud run services update-traffic` for Cloud Run, `kubectl rollout undo`
for GKE, or the Agent Runtime console for Agent Runtime.
