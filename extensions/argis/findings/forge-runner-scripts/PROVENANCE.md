# PROVENANCE — origin of every script

Every file in this repo originated in `~/.forge/` (a single-machine local
config directory on KooshaPari's MacBook). This document is the trace matrix
back to the origin so future maintainers can verify content.

## `bin/subagents-orchestration/`

| File | Origin | Status |
|---|---|---|
| `launch_all_subagents.sh`     | `~/.forge/forge_resume_runs/launch_all_subagents.sh`     | verified |
| `resume_all_subagents.sh`     | `~/.forge/forge_resume_runs/resume_all_subagents.sh`     | verified |
| `dag_orchestrator.py`         | `~/.forge/forge_resume_runs/dag_orchestrator.py`         | verified |
| `dag_dispatcher.py`           | `~/.forge/forge_resume_runs/dag_dispatcher.py`           | verified |
| `dag_launch_2026_06_13.sh`    | `~/.forge/forge_resume_runs/dag_launch_2026_06_13.sh`    | verified (dated snapshot) |
| `open_extra_parents.sh`       | `~/.forge/forge_resume_runs/open_extra_parents.sh`       | verified |
| `open_ghostty_windows.sh`     | `~/.forge/forge_resume_runs/open_ghostty_windows.sh`     | verified |
| `open_parent_windows.sh`      | `~/.forge/forge_resume_runs/open_parent_windows.sh`      | verified |
| `open_subagents.sh`           | `~/.forge/forge_resume_runs/open_subagents.sh`           | verified |

## `bin/autoqueue/`

| File | Origin | Status |
|---|---|---|
| `autoqueue.sh`     | `~/.forge/autoqueue/bin/autoqueue.sh`     | verified |
| `corpus-builder.sh`| `~/.forge/autoqueue/bin/corpus-builder.sh`| verified |
| `queue-manager.sh` | `~/.forge/autoqueue/bin/queue-manager.sh` | verified |
| `launcher_*.sh`    | `~/.forge/autoqueue/bin/launcher_*.sh`    | verified (4 files) |
| `monitor.sh`       | `~/.forge/autoqueue/bin/monitor.sh`       | verified |
| `synthesizer.sh`   | `~/.forge/autoqueue/bin/synthesizer.sh`   | verified |

## `commands/`

| File | Origin | Status |
|---|---|---|
| `forge3_cheatsheet.md`     | `~/.forge/commands/forge3_cheatsheet.md`     | verified |
| `forge3_extensions.md`     | `~/.forge/commands/forge3_extensions.md`     | verified |
| `forge3_methods.md`        | `~/.forge/commands/forge3_methods.md`        | verified |
| `subagent_protocol.md`     | `~/.forge/commands/subagent_protocol.md`     | verified |

## `specs/`

| File | Origin | Status |
|---|---|---|
| `subagent_orchestration_v0.5_spec.md` | `~/.forge/forge_resume_runs/all_subagents_resume.md` | adapted |
| `crash_recovery_v0.4_spec.md`         | `~/.forge/forge_resume_runs/crash_recovery_2026_06_12.md` | adapted |
| `dag_orchestration_v0.4_spec.md`      | `~/.forge/forge_resume_runs/mass_pasted_dag_resume.md` | adapted |
| `loop_feature_request.md`             | `~/.forge/loop/FEATURE_REQUEST.md`         | verified |
| `loop_feature_spec.md`                | `~/.forge/loop/FEATURE_SPEC.md`            | verified |

## Items intentionally NOT included

These were in `~/.forge/` but excluded from this repo:

| Path | Why excluded |
|---|---|
| `~/.forge/forge_resume_runs/inventory_2026_06_13.json` (37 MB) | Operational state, not source |
| `~/.forge/forge_resume_runs/dag_plan_2026_06_13.json` (1.1 MB)   | Operational state, not source |
| `~/.forge/forge_resume_runs/dispatch_manifest.json`              | Operational state, not source |
| `~/.forge/forge_resume_runs/*.log`                               | Log dumps (binary noise) |
| `~/.forge/forge_resume_runs/*.pid`                               | PID files (machine-specific) |
| `~/.forge/.cache/`, `~/.forge/.tmp/`                             | Caches |
| `~/.forge/node_modules/`                                         | Vendor |

## Verification

To verify each file's content matches the origin:

```bash
# From inside this repo:
diff bin/subagents-orchestration/launch_all_subagents.sh \
     ~/.forge/forge_resume_runs/launch_all_subagents.sh
# (should print nothing = identical)

# Across the whole repo:
for f in $(find bin specs commands -type f); do
  base=$f
  if [ -f "$HOME/.forge/$f" ]; then
    diff "$f" "$HOME/.forge/$f" || echo "DIFF: $f"
  fi
done
```