# Install

This repo follows the **dotfile-install pattern** (à la `holman/dotfiles`): the source-of-truth lives here, and `install.sh` copies scripts into standard dotfile locations (`~/bin/`).

## Quick install

```bash
git clone https://github.com/KooshaPari/forge-runner-scripts ~/repos/forge-runner-scripts
cd ~/repos/forge-runner-scripts
./install.sh
```

## What `install.sh` does

| Source | Destination | Why |
|---|---|---|
| `bin/subagents-orchestration/*.sh` | `~/bin/` (per-script, name preserved) | direct CLI access; launcher scripts in PATH |
| `bin/subagents-orchestration/*.py` | `~/bin/` (per-script, name preserved) | direct CLI access; Python orchestrators in PATH |
| `bin/autoqueue/*.sh` | `~/bin/` (per-script, name preserved) | direct CLI access |
| `commands/*.md` | `~/.forge/commands/` | forge3 CLI slash-command surface |
| `specs/*.md` | `~/.forge/specs/` | forge3 spec/feature-request registry |

Nothing outside `~/bin/`, `~/.forge/commands/`, and `~/.forge/specs/` is touched.

## Custom install

```bash
# Install only subagent orchestration
./install.sh --only subagents

# Install only autoqueue
./install.sh --only autoqueue

# Install commands + specs without touching ~/bin/
./install.sh --only commands --only specs

# Show what would happen
./install.sh --dry-run
```

## Uninstall

```bash
./install.sh --uninstall
```

Removes exactly the symlinks/files created by `install.sh` (tracked in `~/.forge-runner-scripts.installed`).

## Dependencies

- **`bash` 4+`** for the launcher scripts
- **`python3` 3.10+** for `dag_orchestrator.py` and `dag_dispatcher.py`
- **`jq`** for `autoqueue/*.sh` (JSON parsing)
- **`tmux`** (optional) for the multi-pane ghostty window scripts
- **`ghostty`** (macOS only) for `open_ghostty_windows.sh`

Verify dependencies:

```bash
for cmd in bash python3 jq tmux; do
  command -v "$cmd" >/dev/null && echo "OK: $cmd" || echo "MISSING: $cmd"
done
```
