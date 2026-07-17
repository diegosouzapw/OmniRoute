# forge-runner-scripts

> **Status**: collection (2026-06-18). Curated from `~/.forge/` for cross-machine reproducibility.

Reusable shell and Python scripts for orchestrating subagent runs, terminal-window multiplexing, and the autoqueue pipeline. Source-of-truth lives in this repo; the dotfile layout places the executables at `~/bin/forge-runner-*/`.

## Why

These scripts have been developed and battle-tested across multiple 100-task agent waves. The `~/.forge/` directory on the dev machine is the canonical source, but a clean reference (with provenance and docstrings) is needed for:

1. **Cross-machine reproducibility** — fresh dev machines get the same launcher/resume scripts via `git clone && install.sh`.
2. **Onboarding** — new agent operators can read the scripts to understand how the subagent pipeline works.
3. **Auditability** — versioned history of the orchestration logic.

## Layout

```
forge-runner-scripts/
├── README.md                              this file
├── INDEX.md                               navigable surface (every script with one-liner)
├── install.sh                             one-liner: copies bin/* to ~/bin/forge-runner-*
├── LICENSE-MIT                            (TBD)
├── bin/
│   ├── subagents-orchestration/           9 scripts (~290 KB)
│   │   ├── launch_all_subagents.sh        mass-launch 100+ subagent tmux windows
│   │   ├── resume_all_subagents.sh        mass-resume from a checkpoint manifest
│   │   ├── dag_launch_2026_06_13.sh       100-task DAG-specific launcher
│   │   ├── dag_orchestrator.py            Python DAG executor (Phoenode proto)
│   │   ├── dag_dispatcher.py              Python DAG dispatcher
│   │   ├── open_subagents.sh              open N subagent terminal windows
│   │   ├── open_parent_windows.sh         open parent/control terminal windows
│   │   ├── open_extra_parents.sh          open additional parent contexts
│   │   └── open_ghostty_windows.sh        open Ghostty terminal windows (macOS)
│   └── autoqueue/                         7 scripts (~30 KB)
│       ├── autoqueue.sh                   main autoqueue pipeline runner
│       ├── corpus-builder.sh              build the agent corpus from a manifest
│       ├── launcher.sh                    launch one task
│       ├── launcher_py.sh                 Python-launcher variant
│       ├── monitor.sh                     watch queue depth / status
│       ├── queue-manager.sh               queue CRUD operations
│       └── synthesizer.sh                 aggregate results across N tasks
├── commands/                              reference docs (CLI command inventory)
├── docs/
│   ├── ARCHITECTURE.md                    orchestration architecture (subagents + autoqueue)
│   ├── PROVENANCE.md                      source mapping (each script → ~/.forge/ origin)
│   └── INSTALL.md                         install + uninstall + per-machine setup
└── specs/
    └── orchestration-roadmap.md           v0.5 roadmap (subagent protocol, checkpoint format)
```

## Install

```bash
git clone https://github.com/KooshaPari/forge-runner-scripts.git ~/CodeProjects/Phenotype/repos/forge-runner-scripts
cd forge-runner-scripts
./install.sh          # copies bin/* to ~/bin/forge-runner-*/
```

## Source provenance

Every script in `bin/` was copied from a specific `~/.forge/` file. See `docs/PROVENANCE.md` for the full mapping.

The source `~/.forge/` directory is **operational state** — it grows during waves, contains 30+ days of run history, runtime caches, and per-machine state. Only the **reusable bits** (the scripts themselves, not their outputs) belong in this repo.

## Excluded (operational state — not reusable)

The following are intentionally NOT in this repo:

- `inventory_2026_06_13.json` (37 MB) — full agent inventory snapshot
- `dag_plan_2026_06_13.json` (1.1 MB) — 100-task DAG plan
- `dispatch_manifest.json` — runtime dispatch state
- `forge_resume_runs/state/` — per-run state files
- `autoqueue/cache/`, `autoqueue/output/` — autoqueue runtime
- `*.log`, `*.pid`, `*.lock` — runtime artifacts
- `commands/*.md` (per-machine notes) — only the reference inventory belongs

## License

MIT (TBD — see LICENSE-MIT).

## Related

- `KooshaPari/PhenoMCPServers` — MCP servers + skills (orthogonal: this is CLI orchestration, not MCP)
- `KooshaPari/phenotype-tooling` — `Tools/` and `Tools-Enhancement/` (Svelte UI builders, different scope)
- `KooshaPari/phenodag` — canonical DAG (the `dag_*.py` scripts in this repo are the operational shim around phenodag)
