#!/usr/bin/env bash
# auto-skill-packager.sh — Autonomous Skill & Sub-agent Generator for Serpent OS
# Usage:
#   bash scripts/auto-skill-packager.sh --name "skill-name" --desc "Description of the skill" --agent "agent-role" --body "Instructions..."
#
# Generates:
#   1. .agent/skills/<skill-name>/SKILL.md (with YAML frontmatter)
#   2. .gemini/config/skills/<skill-name>/SKILL.md (for Gemini/Antigravity global discovery)
#   3. .gemini/config/agents/<agent-role>.yaml (sub-agent template)

set -euo pipefail

NAME=""
DESC=""
AGENT=""
BODY=""
WORK_DIR="/Users/work/serpentos"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name) NAME="$2"; shift 2 ;;
    --desc) DESC="$2"; shift 2 ;;
    --agent) AGENT="$2"; shift 2 ;;
    --body) BODY="$2"; shift 2 ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
done

if [[ -z "$NAME" || -z "$DESC" ]]; then
  echo "❌ Error: --name and --desc are required." >&2
  echo "Usage: $0 --name <skill_name> --desc <description> [--agent <agent_role>] [--body <markdown_body>]" >&2
  exit 1
fi

if [[ -z "$BODY" ]]; then
  BODY="# $NAME\n\n## Purpose\n$DESC\n\n## Execution Steps\n1. Analyze input requirements.\n2. Execute core logic using standardized Serpent OS tools (pnpm, tsx, doppler).\n3. Verify output against DoD standards.\n4. Log results to OS-NOTES.md."
fi

echo "📦 [Auto-Skill] Packaging skill '$NAME'..."

# Create project skill directory
SKILL_DIR="$WORK_DIR/.agent/skills/$NAME"
mkdir -p "$SKILL_DIR"

cat <<EOF > "$SKILL_DIR/SKILL.md"
---
name: $NAME
description: $DESC
---

$BODY
EOF
echo "✅ Created project skill: $SKILL_DIR/SKILL.md"

# Create global Gemini skill directory
GLOBAL_SKILL_DIR="/Users/work/.gemini/config/skills/$NAME"
mkdir -p "$GLOBAL_SKILL_DIR"
cp "$SKILL_DIR/SKILL.md" "$GLOBAL_SKILL_DIR/SKILL.md"
echo "✅ Registered global skill: $GLOBAL_SKILL_DIR/SKILL.md"

# Create sub-agent template if agent role specified
if [[ -n "$AGENT" ]]; then
  AGENT_DIR="/Users/work/.gemini/config/agents"
  mkdir -p "$AGENT_DIR"
  AGENT_FILE="$AGENT_DIR/$AGENT.yaml"
  cat <<EOF > "$AGENT_FILE"
name: $AGENT
description: Specialized sub-agent equipped with the '$NAME' skill.
system_prompt: |
  You are the $AGENT autonomous sub-agent for Serpent OS.
  Your primary capability is defined by the '$NAME' skill: $DESC.
  Always adhere to AGENTS.md rules: use pnpm, verify facts, and report status to Telegram/Jarvis when complete.
tools:
  - run_command
  - read_file
  - write_file
  - replace_file_content
  - grep_search
EOF
  echo "🤖 Created sub-agent template: $AGENT_FILE"
fi

echo "🎉 Auto-skill and sub-agent generation complete for '$NAME'!"
