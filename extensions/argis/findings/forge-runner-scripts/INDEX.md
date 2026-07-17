# INDEX — forge-runner-scripts

One-liner per script. Use this to find what you need quickly.

## `bin/subagents-orchestration/`

Subagent lifecycle orchestration: launch, resume, monitor, terminal-window multiplexing.

| Script | Type | One-liner |
|---|---|---|
| `launch_all_subagents.sh` | bash | Mass-launch all subagents from a manifest; opens tmux windows |
| `resume_all_subagents.sh` | bash | Mass-resume subagents from a checkpoint manifest |
| `dag_launch_2026_06_13.sh` | bash | 100-task DAG-specific launcher (2026-06-13 wave) |
| `dag_orchestrator.py` | python | Python DAG executor (proto for `phenodag` v0.5+) |
| `dag_dispatcher.py` | python | Python DAG dispatcher; routes tasks to subagents |
| `open_subagents.sh` | bash | Open N subagent terminal windows in Ghostty |
| `open_parent_windows.sh` | bash | Open parent/control terminal windows |
| `open_extra_parents.sh` | bash | Open additional parent contexts |
| `open_ghostty_windows.sh` | bash | Open Ghostty terminal windows (macOS-specific) |

## `bin/autoqueue/`

The autoqueue pipeline: build a corpus of agent tasks, run them in queue, monitor, aggregate.

| Script | Type | One-liner |
|---|---|---|
| `autoqueue.sh` | bash | Main autoqueue pipeline runner (the entry point) |
| `corpus-builder.sh` | bash | Build the agent corpus from a manifest |
| `launcher.sh` | bash | Launch one task from the queue |
| `launcher_py.sh` | bash | Python-launcher variant (uses Python task wrapper) |
| `monitor.sh` | bash | Watch queue depth / status (live tail) |
| `queue-manager.sh` | bash | Queue CRUD operations (add/remove/list tasks) |
| `synthesizer.sh` | bash | Aggregate results across N tasks |

## `commands/`

CLI command reference (the canonical interface surface).

| File | One-liner |
|---|---|
| (TBD) | Reference inventory of every CLI command this collection exposes |

## `docs/`

| File | One-liner |
|---|---|
| `ARCHITECTURE.md` | Orchestration architecture (subagents + autoqueue interaction) |
| `PROVENANCE.md` | Source mapping (each script → `~/.forge/` origin) |
| `INSTALL.md` | Install + uninstall + per-machine setup |

## `specs/`

| File | One-liner |
|---|---|
| `orchestration-roadmap.md` | v0.5 roadmap: subagent protocol, checkpoint format |
