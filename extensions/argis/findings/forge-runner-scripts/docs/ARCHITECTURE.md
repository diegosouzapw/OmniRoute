# Architecture — forge-runner-scripts

## Overview

A two-layer orchestration system for the forge Agent SDK (`forge3`):

```
+--------------------------------------------------------------+
|                    User (interactive)                        |
+--------------------------------------------------------------+
                          | forge3 call/info/tools/list
                          v
+--------------------------------------------------------------+
|  Layer 1: Subagent Orchestration (subagents-orchestration/) |
|                                                              |
|  - launch_all_subagents.sh    mass launch from manifest     |
|  - resume_all_subagents.sh    mass resume from checkpoint    |
|  - dag_orchestrator.py        python DAG executor           |
|  - dag_dispatcher.py          task-to-subagent router       |
|  - open_*.sh                  terminal-window multiplexer   |
+--------------------------------------------------------------+
                          |
                          v
+--------------------------------------------------------------+
|  Layer 2: Autoqueue Pipeline (autoqueue/)                    |
|                                                              |
|  - autoqueue.sh          main pipeline runner                |
|  - corpus-builder.sh     build agent corpus from manifest   |
|  - queue-manager.sh      queue CRUD                         |
|  - launcher*.sh          launch one task                     |
|  - monitor.sh            live queue tail                    |
|  - synthesizer.sh        aggregate results                  |
+--------------------------------------------------------------+
                          |
                          v
+--------------------------------------------------------------+
|                    forge3 (Rust binary)                       |
|                  (local agent-sdk daemon)                    |
+--------------------------------------------------------------+
```

## Interaction model

**Layer 1 (subagent orchestration)** handles *interactive, multi-window* workflows:
- The user is at a terminal, has multiple parallel sessions open, and needs to:
  - Launch N new subagents in parallel
  - Resume M subagents that crashed
  - See all of them in N Ghostty terminal windows
- Use case: W5 batch, kilo cloud-agent PR review, any multi-pronged task

**Layer 2 (autoqueue)** handles *headless, queued-batch* workflows:
- A YAML/JSON manifest describes a corpus of tasks
- The pipeline launches them serially or in parallel
- The monitor shows live progress
- The synthesizer aggregates results
- Use case: nightly runs, regression tests, fleet-wide audits

## Subagent protocol (v0.5 roadmap)

The Python orchestrator (`dag_orchestrator.py`) is the prototype for a future
`phenodag` v0.5 subagent protocol:

1. **Manifest format**: YAML or JSON describing N tasks, each with:
   - `id`, `repo`, `branch`, `worktree`, `prompt`
2. **Checkpoint format**: a `checkpoint-<timestamp>.json` capturing
   `task_id → status, worktree_path, log_tail, error`
3. **Resume semantics**: if a task is in `pending` or `failed` state,
   the dispatcher re-launches it from the checkpoint
4. **Terminal multiplexing**: each subagent gets its own Ghostty window
   (one per `worktree_path`)

## Why two layers, not one?

`launch_all_subagents.sh` and `autoqueue.sh` solve different problems:

| | Layer 1 (subagent orchestration) | Layer 2 (autoqueue) |
|---|---|---|
| User model | interactive | headless |
| Output model | human-readable (terminals) | machine-readable (JSON) |
| Failure model | visible (per-terminal) | recoverable (checkpoints) |
| Concurrency | N parallel (per terminal) | M parallel (per queue slot) |
| Aggregator | the human | the synthesizer |

Both layers call into the same `forge3` daemon. The layers differ only in
*who or what* is the consumer of the output.

## Provenance

Every script in this repo originated in `~/.forge/` (a single-machine local
config directory). The `PROVENANCE.md` document maps each script back to its
origin path so future maintainers can verify the content.
