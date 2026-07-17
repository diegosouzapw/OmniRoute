# Research

Repo language signals:
- `go.mod` exists at the repository root, so Go is the primary language for the repo.
- Additional `pyproject.toml` files exist in subdirectories, but the Taskfile now keys off root
  manifests so the primary repo language wins.

Tooling signals:
- `AGENTS.md` and `AGENTS` guidance already use `task` and `golangci-lint`.
- `Taskfile.yml` already existed in the clone and already had the requested `build`, `test`, `lint`,
  and `clean` tasks, so the change is a refinement rather than a from-scratch add.
