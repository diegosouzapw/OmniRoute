# Feature Spec: Native Loop & Monitor Commands

## Overview

Implement native `$loop` and `$monitor` commands in ForgeCode, mirroring Claude Code behavior.

## Commands

### 1. `$loop` - Periodic Execution

```bash
$loop <interval> "<prompt>"
$loop 5m "continue working on feature X"
$loop 1h "check CI status and report"
```

**Behavior:**
- Start background loop executing prompt at interval
- Continue same conversation context
- Show status in terminal when active
- Controllable via `$loop stop`, `$loop status`

**States:**
- Running: Shows interval, next run time
- Stopped: Clean exit

### 2. `$monitor` - Conditional/Event-Driven Execution

```bash
$monitor <condition> "<prompt>"
```

**Condition Types:**

| Type | Syntax | Example |
|------|--------|---------|
| Time-based | `at HH:MM` | `$monitor at 09:00 "standup"` |
| Interval | `every N minutes` | `$monitor every 15m "check PRs"` |
| File change | `when file <path>` | `$monitor when file src/main.rs "run tests"` |
| Git event | `when git push` | `$monitor when git push "notify team"` |
| External trigger | `when <action>` | `$monitor when "slack #alerts" "handle alert"` |

**Composite Conditions:**
```bash
$monitor at 09:00 OR when file .env "deploy morning build"
$monitor every 30m AND when git push "run integration tests"
```

**Control:**
```bash
$monitor status      # List active monitors
$monitor stop <id>   # Stop specific monitor
$monitor pause <id>  # Pause without removing
$monitor resume <id> # Resume paused monitor
```

## Implementation Architecture

### Crate Structure (New)

```
crates/
  └── forge_loop/
      ├── src/
      │   ├── lib.rs           # Public API
      │   ├── loop.rs          # Loop command logic
      │   ├── monitor.rs       # Monitor command logic
      │   ├── scheduler.rs     # Time/schedule management
      │   ├── condition.rs     # Condition parsing & matching
      │   ├── executor.rs      # Prompt execution engine
      │   ├── state.rs         # Loop/monitor state persistence
      │   └── shell_integration.rs  # $loop, $monitor shell commands
      └── Cargo.toml
```

### State Management

```rust
// ~/.forge/loop/state.json
{
  "loops": [
    {
      "id": "uuid",
      "conversation_id": "conv-uuid",
      "interval_minutes": 5,
      "prompt": "continue work...",
      "created_at": "ISO8601",
      "last_run": "ISO8601",
      "next_run": "ISO8601",
      "status": "running"
    }
  ],
  "monitors": [
    {
      "id": "uuid",
      "conversation_id": "conv-uuid",
      "condition": {
        "type": "time" | "file_change" | "git_event" | "composite",
        "expression": "..."
      },
      "prompt": "check CI...",
      "status": "running" | "paused",
      "last_triggered": "ISO8601"
    }
  ]
}
```

### Shell Integration

```rust
// In forge_shell or shell-plugin
$loop 5m "continue"           // Start loop
$loop stop                    // Stop all loops
$loop stop <id>              // Stop specific loop
$loop status                 // Show active loops

$monitor at 09:00 "standup"  // Time-based monitor
$monitor when file X "test"  // File change monitor
$monitor status              // Show monitors
$monitor stop <id>           // Stop monitor
```

### Conversation Integration

- Uses existing `--conversation-id` mechanism
- Maintains context across executions
- Writes results to conversation history

## UX Flow

### Starting a Loop
```
$loop 5m "continue working"
✓ Loop started (ID: abc123)
  • Every 5 minutes
  • Next run: 12:05 PM
  • Conversation: current

$loop 5m "continue working" --detach
✓ Loop started in background (ID: abc123)
```

### Loop Running
```
[12:05 PM] Loop triggered: "continue working"
⟳ Working...

[12:06 PM] ✓ Completed in 45s
[12:10 PM] Loop triggered: "continue working"
⟳ Working...
```

### Monitor Example
```
$monitor at 09:00 "send standup summary"
✓ Monitor started (ID: xyz789)
  • Trigger: Daily at 09:00 AM
  • Conversation: current

$monitor when file src/deploy.sh "run deployment checks"
✓ Monitor started (ID: xyz790)
  • Trigger: src/deploy.sh changes
  • Conversation: current
```

## Backward Compatibility

- Current `forge-loop` script continues working
- New native implementation supersedes it
- Migration path: import existing loops to new system

## Priority

1. **P0**: `$loop` - Basic periodic execution
2. **P1**: `$monitor` time-based
3. **P2**: `$monitor` file/git events
4. **P3**: Composite conditions

## References

- Claude Code: `$loop` command
- Similar to: CI/CD schedulers, cron, systemd timers
- Upstream: `github.com/tailcallhq/forgecode`
