---
name: loop
description: Start autonomous loop - interval in minutes (e.g. /loop 10m)
---

# Autonomous Loop Command

Execute this task repeatedly on a schedule. The operator can steer via control files.

## Operator Instructions

- **Start loop**: `:loop 10m` (creates cron job, executes immediately)
- **Stop loop**: `:loop stop`
- **Steer**: Edit `~/.forge/loop/steer.txt` before next cycle
- **Status**: Check `~/.forge/loop/status.json`

## Loop Logic

### 1. Check for Steering
Read `~/.forge/loop/steer.txt` if exists. If content present:
- Parse instructions
- Execute steering directive
- Clear the file
- Set `steered=true` in status

### 2. Core Loop Body
Use subagents heavily for all of the following:

**Audit Phase** (spawn `sage` agents):
- Trace current project DAG/state
- Find incomplete edges or nodes
- Identify TODOs, FIXMEs, missing tests, docs gaps
- Check for technical debt

**Extend Phase** (spawn `forge` agents):
- Implement atomic improvements in parallel
- Add tests for new/changed code
- Update documentation
- Extend coverage incrementally

**Plan Phase** (spawn `muse` agents):
- Prioritize findings
- Break complex work into delegable units

### 3. Report
Output:
```
[Loop Cycle N]
- Completed: <list>
- Next up: <list>
- Steered: yes/no
```

### 4. Signal Ready
Update `~/.forge/loop/status.json`:
```json
{
  "last_run": "<ISO timestamp>",
  "cycle": N,
  "continue_from": "<checkpoint>",
  "steered": false
}
```

## Control Files

| File | Purpose |
|------|---------|
| `steer.txt` | Operator steering instructions |
| `status.json` | Loop state and checkpoints |
| `stop` | If exists, loop exits gracefully |
