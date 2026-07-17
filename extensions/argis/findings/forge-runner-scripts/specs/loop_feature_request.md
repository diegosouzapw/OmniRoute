# Feature Request: Native `$loop` Command

## Desired Behavior (Claude Code Reference)

```bash
$loop 5m "continue work on feature X"
```

This should:
1. Start a background loop that runs every N minutes
2. Continue the same conversation/session
3. Show loop status in terminal (like `$help` shows commands)
4. Be controllable via `$loop stop`, `$loop status`
5. Allow steering mid-loop

## Current Workaround

ForgeCode uses cron + `--conversation-id` as an external workaround.

## Required Implementation

ForgeCode needs native loop support built into the agent runtime:

1. **Built-in `$loop` command** - not external cron
2. **Background execution** - doesn't block terminal
3. **Session continuation** - same conversation context
4. **Status display** - shows when loop is running
5. **Steering API** - `~/.forge/loop/steer.txt` or similar

## Priority

High - essential for autonomous agent workflows.

## References

- Claude Code: `$loop` command
- See also: `/loop` slash command implementation in `~/.forge/commands/loop.md`
